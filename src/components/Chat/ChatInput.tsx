import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, MicOff } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

export default function ChatInput({ onSendMessage }: ChatInputProps) {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  const { theme } = useTheme();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = 'en-US';

      recognitionInstance.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0].transcript)
          .join('');
        
        setMessage(transcript);
        if (inputRef.current) {
          inputRef.current.value = transcript;
        }
      };

      recognitionInstance.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsRecording(false);
      };

      recognitionInstance.onend = () => {
        setIsRecording(false);
      };

      setRecognition(recognitionInstance);
    }
  }, []);

  const toggleRecording = () => {
    if (!recognition) return;

    if (isRecording) {
      recognition.stop();
    } else {
      recognition.start();
    }
    setIsRecording(!isRecording);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
      if (inputRef.current) {
        inputRef.current.value = '';
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`flex items-center gap-2 p-3 border-t ${
      theme === 'dark' 
        ? 'bg-gray-800 border-gray-700' 
        : 'bg-white border-gray-200'
    }`}>
      <div className="flex-1 relative">
        <input
          ref={inputRef}
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className={`w-full px-4 py-2 pr-24 rounded-full focus:outline-none focus:ring-2 focus:ring-rose-500 ${
            theme === 'dark'
              ? 'bg-gray-700 text-white border-gray-600 placeholder-gray-400'
              : 'bg-white text-gray-900 border-gray-200 placeholder-gray-500'
          }`}
        />
        <div className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center gap-1">
          {recognition && (
            <button
              type="button"
              onClick={toggleRecording}
              className={`p-2 rounded-full transition-colors ${
                isRecording
                  ? 'bg-rose-100 text-rose-600'
                  : theme === 'dark'
                  ? 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                  : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
              }`}
            >
              {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            </button>
          )}
          <button
            type="submit"
            className={`p-2 rounded-full transition-colors ${
              message.trim()
                ? 'bg-rose-500 text-white hover:bg-rose-600'
                : theme === 'dark'
                ? 'bg-gray-700 text-gray-500'
                : 'bg-gray-100 text-gray-400'
            }`}
            disabled={!message.trim()}
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </form>
  );
}