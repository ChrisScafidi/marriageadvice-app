import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, Send } from 'lucide-react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import QuickReplies from './QuickReplies';
import ChatFeedback from './ChatFeedback';
import PersonaSelector from './PersonaSelector';
import { useChat } from '../../hooks/useChat';
import { getPersonas, getPersona } from '../../services/personas';
import { Persona, DEFAULT_PERSONA_ID } from '../../types/persona';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';

export default function ChatContainer() {
  const { messages, isLoading, error, addMessage, clearError } = useChat();
  const [personas, setPersonas] = useState<Persona[]>([]);
  const [selectedPersonaId, setSelectedPersonaId] = useState(DEFAULT_PERSONA_ID);
  const [selectedPersona, setSelectedPersona] = useState<Persona | null>(null);
  const [loadingPersona, setLoadingPersona] = useState(false);
  const { currentUser } = useAuth();
  const [showPersonaSelector, setShowPersonaSelector] = useState(false);
  const { theme } = useTheme();
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const loadPersonas = async () => {
      try {
        setLoadingPersona(true);
        const fetchedPersonas = await getPersonas();
        setPersonas(fetchedPersonas);
        
        const persona = await getPersona(DEFAULT_PERSONA_ID);
        setSelectedPersona(persona);
        setSelectedPersonaId(persona.id);
      } catch (error) {
        console.error('Error loading personas:', error);
      } finally {
        setLoadingPersona(false);
      }
    };

    loadPersonas();
  }, []);

  const handlePersonaChange = async (personaId: string) => {
    try {
      setLoadingPersona(true);
      const persona = await getPersona(personaId);
      setSelectedPersona(persona);
      setSelectedPersonaId(personaId);
      setShowPersonaSelector(false);
    } catch (error) {
      console.error('Error changing persona:', error);
    } finally {
      setLoadingPersona(false);
    }
  };

  const handleSendMessage = async (content: string) => {
    await addMessage(content, selectedPersona?.basePrompt);
  };

  const handleFeedback = (isPositive: boolean) => {
    console.log('Feedback:', isPositive);
  };

  return (
    <div className={`h-screen flex flex-col ${
      theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'
    }`}>
      {/* Header */}
      <div className={`${
        theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      } border-b px-4 py-2 flex justify-between items-center`}>
        <button
          onClick={() => setShowPersonaSelector(!showPersonaSelector)}
          className={`text-sm ${
            theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-rose-600'
          } flex items-center`}
        >
          <MessageSquare className="h-4 w-4 mr-1" />
          {selectedPersona?.name || 'Select Advisor'}
        </button>
      </div>

      {/* Persona Selector */}
      {showPersonaSelector && (
        <div className={`${
          theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        } border-b`}>
          <PersonaSelector
            personas={personas}
            selectedPersonaId={selectedPersonaId}
            onSelectPersona={handlePersonaChange}
            disabled={loadingPersona || isLoading}
          />
        </div>
      )}

      {/* Messages Container */}
      <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4 chat-messages">
        {error && (
          <div className={`${
            theme === 'dark' 
              ? 'bg-red-900 text-red-200' 
              : 'bg-red-50 text-red-700'
          } p-3 rounded-md mb-4 flex justify-between`}>
            <span>{error}</span>
            <button onClick={clearError} className="text-red-500 hover:text-red-700">
              ✕
            </button>
          </div>
        )}

        {messages.map((message) => (
          <div key={message.id}>
            <ChatMessage message={message} />
            {message.sender === 'bot' && <ChatFeedback onFeedback={handleFeedback} />}
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center space-x-2 text-gray-500">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          </div>
        )}
      </div>

      {/* Chat Input */}
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
}