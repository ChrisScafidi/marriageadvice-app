import React, { useState } from 'react';
import { Plus, GripVertical, Trash } from 'lucide-react';

interface QuickReply {
  id: string;
  text: string;
  response: string;
  category: string;
}

export default function QuickReplyManager() {
  const [quickReplies, setQuickReplies] = useState<QuickReply[]>([]);
  const [newReply, setNewReply] = useState({ text: '', response: '', category: '' });

  const handleAdd = () => {
    if (newReply.text && newReply.response) {
      setQuickReplies([
        ...quickReplies,
        { ...newReply, id: Date.now().toString() }
      ]);
      setNewReply({ text: '', response: '', category: '' });
    }
  };

  const handleDelete = (id: string) => {
    setQuickReplies(quickReplies.filter(reply => reply.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">Quick Reply Manager</h2>
        <button
          onClick={handleAdd}
          className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-rose-600 hover:bg-rose-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Quick Reply
        </button>
      </div>

      {/* Add New Quick Reply Form */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">Button Text</label>
            <input
              type="text"
              value={newReply.text}
              onChange={(e) => setNewReply({ ...newReply, text: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <input
              type="text"
              value={newReply.category}
              onChange={(e) => setNewReply({ ...newReply, category: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
            />
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Response</label>
          <textarea
            value={newReply.response}
            onChange={(e) => setNewReply({ ...newReply, response: e.target.value })}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
          />
        </div>
      </div>

      {/* Quick Replies List */}
      <div className="space-y-4">
        {quickReplies.map((reply) => (
          <div
            key={reply.id}
            className="flex items-center space-x-4 p-4 bg-white rounded-lg border border-gray-200"
          >
            <button className="cursor-move">
              <GripVertical className="h-5 w-5 text-gray-400" />
            </button>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">{reply.text}</p>
                  <p className="text-sm text-gray-500">{reply.category}</p>
                </div>
                <button
                  onClick={() => handleDelete(reply.id)}
                  className="text-gray-400 hover:text-red-500"
                >
                  <Trash className="h-5 w-5" />
                </button>
              </div>
              <p className="mt-2 text-sm text-gray-600">{reply.response}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}