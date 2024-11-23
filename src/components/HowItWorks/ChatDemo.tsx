import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, Send } from 'lucide-react';
import PersonaAvatar from './PersonaAvatar';
import { generateAIResponse } from '../../services/ai';
import { useTheme } from '../../contexts/ThemeContext';

interface Message {
  id: string;
  content: string;
  sender: 'bot' | 'user';
}

const MAX_QUESTIONS = 10;

export default function ChatDemo() {
  const [messages, setMessages] = useState<Message[]>([{
    id: '1',
    content: "Hi! I'm your AI relationship advisor. Feel free to ask me any questions about relationships. You have 10 free questions to try out the service.",
    sender: 'bot'
  }]);
  const [input, setInput] = useState('');
  const [selectedPersona, setSelectedPersona] = useState<'empathetic' | 'tough' | 'wise'>('empathetic');
  const [isLoading, setIsLoading] = useState(false);
  const [questionsLeft, setQuestionsLeft] = useState(MAX_QUESTIONS);
  const { theme } = useTheme();
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || questionsLeft <= 0 || isLoading) return;

    try {
      const userMessage = {
        id: Date.now().toString(),
        content: input.trim(),
        sender: 'user' as const
      };
      setMessages(prev => [...prev, userMessage]);
      setInput('');
      setIsLoading(true);
      setQuestionsLeft(prev => prev - 1);

      const aiResponse = await generateAIResponse([...messages, userMessage]);
      
      const botMessage = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        sender: 'bot' as const
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        content: "I apologize, but I'm having trouble responding right now. Please try again later.",
        sender: 'bot'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`${
      theme === 'dark' ? 'bg-gray-800' : 'bg-white'
    } rounded-lg shadow-lg border ${
      theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
    } max-w-2xl mx-auto`}>
      <div className={`border-b ${
        theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
      } p-4`}>
        <div className="flex items-center justify-between">
          <h3 className={`text-lg font-semibold ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>Try Different Personas</h3>
          <div className="flex space-x-2">
            <button
              onClick={() => setSelectedPersona('empathetic')}
              className={`p-2 rounded-lg ${
                selectedPersona === 'empathetic' 
                  ? 'bg-rose-100 text-rose-600 dark:bg-rose-900 dark:text-rose-300' 
                  : 'text-gray-400'
              }`}
            >
              <PersonaAvatar type="empathetic" size="sm" />
            </button>
            <button
              onClick={() => setSelectedPersona('tough')}
              className={`p-2 rounded-lg ${
                selectedPersona === 'tough' 
                  ? 'bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300' 
                  : 'text-gray-400'
              }`}
            >
              <PersonaAvatar type="tough" size="sm" />
            </button>
            <button
              onClick={() => setSelectedPersona('wise')}
              className={`p-2 rounded-lg ${
                selectedPersona === 'wise' 
                  ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300' 
                  : 'text-gray-400'
              }`}
            >
              <PersonaAvatar type="wise" size="sm" />
            </button>
          </div>
        </div>
      </div>

      <div ref={chatContainerRef} className="h-96 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'bot' ? 'justify-start' : 'justify-end'}`}
          >
            <div className={`max-w-[80%] rounded-lg px-4 py-2 ${
              message.sender === 'bot'
                ? theme === 'dark'
                  ? 'bg-gray-700 text-white'
                  : 'bg-gray-100 text-gray-900'
                : 'bg-rose-600 text-white'
            }`}>
              {message.content}
            </div>
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

      <div className={`border-t ${
        theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
      } p-4`}>
        <div className="flex flex-col space-y-2">
          <div className="flex space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={questionsLeft > 0 ? "Type your message..." : "Trial limit reached. Sign up to continue!"}
              disabled={questionsLeft <= 0 || isLoading}
              className={`flex-1 rounded-lg border px-4 py-2 ${
                theme === 'dark'
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              } focus:outline-none focus:ring-2 focus:ring-rose-500`}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || questionsLeft <= 0 || isLoading}
              className={`px-4 py-2 ${
                input.trim() && questionsLeft > 0 && !isLoading
                  ? 'bg-rose-600 text-white hover:bg-rose-700'
                  : theme === 'dark'
                  ? 'bg-gray-700 text-gray-400'
                  : 'bg-gray-100 text-gray-400'
              } rounded-lg transition-colors`}
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
          <p className={`text-xs ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
          }`}>
            {questionsLeft} questions remaining in trial
          </p>
        </div>
      </div>
    </div>
  );
}