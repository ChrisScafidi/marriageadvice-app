import React from 'react';

interface QuickReplyOption {
  id: string;
  text: string;
}

interface QuickRepliesProps {
  options: QuickReplyOption[];
  onSelect: (text: string) => void;
}

export default function QuickReplies({ options, onSelect }: QuickRepliesProps) {
  return (
    <div className="flex flex-wrap gap-2 my-4 px-2">
      {options.map((option) => (
        <button
          key={option.id}
          onClick={() => onSelect(option.text)}
          className="px-4 py-2 text-sm bg-rose-100 text-rose-700 rounded-full hover:bg-rose-200 transition-colors whitespace-nowrap touch-manipulation"
        >
          {option.text}
        </button>
      ))}
    </div>
  );
}