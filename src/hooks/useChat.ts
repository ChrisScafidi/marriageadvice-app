import { useState, useCallback, useEffect } from 'react';
import { generateAIResponse } from '../services/ai';
import { saveChatHistory, getChatHistory, deleteChatHistory } from '../services/chatHistory';
import { ChatMessage } from '../types/chat';
import { useAuth } from '../contexts/AuthContext';

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { currentUser } = useAuth();

  // Load chat history when component mounts
  useEffect(() => {
    const loadChatHistory = async () => {
      if (!currentUser) return;

      try {
        const history = await getChatHistory(currentUser.uid);
        setMessages(history);
      } catch (err) {
        console.error('Error loading chat history:', err);
        setError('Failed to load chat history');
      }
    };

    loadChatHistory();
  }, [currentUser]);

  // Save chat history whenever messages change
  useEffect(() => {
    const saveHistory = async () => {
      if (!currentUser || messages.length === 0) return;

      try {
        await saveChatHistory(currentUser.uid, messages);
      } catch (err) {
        console.error('Error saving chat history:', err);
      }
    };

    saveHistory();
  }, [messages, currentUser]);

  const addMessage = useCallback(async (content: string, basePrompt?: string) => {
    if (!content.trim() || !currentUser) {
      return;
    }

    try {
      // Add user message
      const userMessage: ChatMessage = {
        id: Date.now().toString(),
        content: content.trim(),
        sender: 'user',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, userMessage]);
      setIsLoading(true);
      setError(null);

      // Get AI response with optional base prompt
      const aiResponse = await generateAIResponse([...messages, userMessage], basePrompt);
      
      // Add bot message
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to send message';
      console.error('Chat error:', errorMessage);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [messages, currentUser]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const clearMessages = useCallback(async () => {
    if (!currentUser) return;

    try {
      await deleteChatHistory(currentUser.uid);
      setMessages([]);
      setError(null);
    } catch (err) {
      console.error('Error clearing chat history:', err);
      setError('Failed to clear chat history');
    }
  }, [currentUser]);

  return {
    messages,
    isLoading,
    error,
    addMessage,
    clearError,
    clearMessages,
  };
}