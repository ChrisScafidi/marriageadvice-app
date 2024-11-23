import React from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';

interface ChatFeedbackProps {
  onFeedback: (isPositive: boolean) => void;
}

export default function ChatFeedback({ onFeedback }: ChatFeedbackProps) {
  return (
    <div className="flex items-center gap-2 ml-12 mt-1">
      <button
        onClick={() => onFeedback(true)}
        className="p-1 text-gray-400 hover:text-green-500 transition-colors"
        title="Helpful"
      >
        <ThumbsUp className="h-4 w-4" />
      </button>
      <button
        onClick={() => onFeedback(false)}
        className="p-1 text-gray-400 hover:text-red-500 transition-colors"
        title="Not helpful"
      >
        <ThumbsDown className="h-4 w-4" />
      </button>
    </div>
  );
}