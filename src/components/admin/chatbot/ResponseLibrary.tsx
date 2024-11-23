import React, { useState } from 'react';
import { Search, Plus, Edit2, Trash } from 'lucide-react';

interface Response {
  id: string;
  topic: string;
  content: string;
  tags: string[];
}

export default function ResponseLibrary() {
  const [responses, setResponses] = useState<Response[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedResponse, setSelectedResponse] = useState<Response | null>(null);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    // Implement search logic
  };

  const handleEdit = (response: Response) => {
    setSelectedResponse(response);
  };

  const handleDelete = (id: string) => {
    setResponses(responses.filter(response => response.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">Response Library</h2>
        <button className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-rose-600 hover:bg-rose-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Response
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search responses..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-rose-500 focus:border-rose-500 sm:text-sm"
        />
      </div>

      {/* Responses List */}
      <div className="space-y-4">
        {responses.map((response) => (
          <div
            key={response.id}
            className="bg-white rounded-lg border border-gray-200 p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-900">{response.topic}</h3>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(response)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <Edit2 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(response.id)}
                  className="text-gray-400 hover:text-red-500"
                >
                  <Trash className="h-4 w-4" />
                </button>
              </div>
            </div>
            <p className="text-sm text-gray-600">{response.content}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {response.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}