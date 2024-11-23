import React from 'react';

export default function ThinkingDots() {
  return (
    <div className="flex space-x-1 px-3 py-2">
      <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"></div>
    </div>
  );
}