import React from 'react';
import { format } from 'date-fns';
import { ChatMessage } from '../../types/chat';

interface ChatHistoryProps {
  messages: ChatMessage[];
  onMessageClick: (message: ChatMessage) => void;
}

export default function ChatHistory({ messages, onMessageClick }: ChatHistoryProps) {
  // Group messages by date
  const groupedMessages = messages.reduce((groups: Record<string, ChatMessage[]>, message) => {
    const date = format(message.timestamp, 'yyyy-MM-dd');
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(message);
    return groups;
  }, {});

  return (
    <div className="space-y-6">
      {Object.entries(groupedMessages).map(([date, dateMessages]) => (
        <div key={date}>
          <h3 className="text-sm font-medium text-gray-500 sticky top-0 bg-white py-2">
            {format(new Date(date), 'MMMM d, yyyy')}
          </h3>
          <div className="space-y-2">
            {dateMessages.map((message) => (
              <button
                key={message.id}
                onClick={() => onMessageClick(message)}
                className="w-full text-left p-2 rounded hover:bg-gray-50 transition-colors"
              >
                <p className="text-sm font-medium text-gray-900 truncate">
                  {message.content}
                </p>
                <p className="text-xs text-gray-500">
                  {format(message.timestamp, 'h:mm a')}
                </p>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}