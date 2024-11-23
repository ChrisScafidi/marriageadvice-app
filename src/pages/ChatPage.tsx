import React from 'react';
import ChatContainer from '../components/Chat/ChatContainer';
import { useTheme } from '../contexts/ThemeContext';

export default function ChatPage() {
  const { theme } = useTheme();
  
  return (
    <div className={`h-screen ${
      theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'
    }`}>
      <ChatContainer />
    </div>
  );
}