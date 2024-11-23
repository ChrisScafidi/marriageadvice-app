import React, { useState } from 'react';
import { format } from 'date-fns';
import { Bot, User, Volume2, VolumeX, Settings2 } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import VoiceSettings from './VoiceSettings';

interface ChatMessageProps {
  message: {
    id: string;
    content: string;
    sender: 'bot' | 'user';
    timestamp: Date;
    resources?: Array<{ title: string; url: string }>;
  };
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showVoiceSettings, setShowVoiceSettings] = useState(false);
  const [voiceSettings, setVoiceSettings] = useState({
    rate: 0.9,
    pitch: 1.1,
    volume: 1.0,
    style: 'empathetic' as const,
    gender: 'female' as const
  });
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
  const { theme } = useTheme();
  const synth = window.speechSynthesis;

  const handleSpeak = () => {
    if (isSpeaking) {
      synth.cancel();
      setIsSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(message.content);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    
    utterance.rate = voiceSettings.rate;
    utterance.pitch = voiceSettings.pitch;
    utterance.volume = voiceSettings.volume;
    
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    synth.speak(utterance);
    setIsSpeaking(true);
  };

  const handleVoiceSettingsChange = (settings: typeof voiceSettings) => {
    setVoiceSettings(settings);
  };

  const handleVoiceChange = (voice: SpeechSynthesisVoice) => {
    setSelectedVoice(voice);
  };

  const isBot = message.sender === 'bot';

  return (
    <div className={`flex w-full ${isBot ? 'justify-start' : 'justify-end'} mb-4`}>
      <div className={`flex max-w-[80%] ${isBot ? 'flex-row' : 'flex-row-reverse'}`}>
        <div className={`flex-shrink-0 ${isBot ? 'mr-3' : 'ml-3'}`}>
          {isBot ? (
            <div className={`h-8 w-8 rounded-full ${
              theme === 'dark' ? 'bg-rose-900' : 'bg-rose-100'
            } flex items-center justify-center`}>
              <Bot className={`h-5 w-5 ${
                theme === 'dark' ? 'text-rose-300' : 'text-rose-600'
              }`} />
            </div>
          ) : (
            <div className={`h-8 w-8 rounded-full ${
              theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
            } flex items-center justify-center`}>
              <User className={`h-5 w-5 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`} />
            </div>
          )}
        </div>
        <div className="flex flex-col">
          <div className={`px-4 py-3 rounded-lg ${
            isBot 
              ? theme === 'dark'
                ? 'bg-gray-800 text-white border border-gray-700'
                : 'bg-white text-gray-900 border border-gray-100'
              : 'bg-rose-600 text-white'
          }`}>
            <div className="flex justify-between items-start gap-2">
              <p className="text-base whitespace-pre-wrap break-words leading-relaxed">
                {message.content}
              </p>
              {isBot && (
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => setShowVoiceSettings(true)}
                    className={`p-1 rounded-full transition-colors ${
                      theme === 'dark'
                        ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-700'
                        : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                    }`}
                    title="Voice settings"
                  >
                    <Settings2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={handleSpeak}
                    className={`p-1 rounded-full transition-colors ${
                      isSpeaking
                        ? 'text-rose-500'
                        : theme === 'dark'
                        ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-700'
                        : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                    }`}
                    title={isSpeaking ? 'Stop speaking' : 'Listen to message'}
                  >
                    {isSpeaking ? (
                      <VolumeX className="h-4 w-4" />
                    ) : (
                      <Volume2 className="h-4 w-4" />
                    )}
                  </button>
                </div>
              )}
            </div>
            {message.resources && message.resources.length > 0 && (
              <div className={`mt-3 pt-3 border-t ${
                theme === 'dark' ? 'border-gray-700' : 'border-gray-100'
              }`}>
                <p className={`text-xs font-medium ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  Helpful Resources:
                </p>
                <div className="mt-1 space-y-1">
                  {message.resources.map((resource, index) => (
                    <a
                      key={index}
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`block text-xs ${
                        theme === 'dark'
                          ? 'text-rose-400 hover:text-rose-300'
                          : 'text-rose-500 hover:text-rose-600'
                      } hover:underline`}
                    >
                      {resource.title}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
          <span className={`text-xs ${
            theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
          } mt-1 ${isBot ? 'text-left' : 'text-right'}`}>
            {format(message.timestamp, 'HH:mm')}
          </span>
        </div>
      </div>

      {showVoiceSettings && (
        <VoiceSettings
          settings={voiceSettings}
          selectedVoice={selectedVoice}
          onSettingsChange={handleVoiceSettingsChange}
          onVoiceChange={handleVoiceChange}
          onClose={() => setShowVoiceSettings(false)}
        />
      )}
    </div>
  );
}