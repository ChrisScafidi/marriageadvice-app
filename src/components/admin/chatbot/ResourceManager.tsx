import React, { useState } from 'react';
import { Link2, ExternalLink, Trash } from 'lucide-react';

interface Resource {
  id: string;
  title: string;
  url: string;
  description: string;
  category: string;
}

export default function ResourceManager() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [newResource, setNewResource] = useState({
    title: '',
    url: '',
    description: '',
    category: ''
  });

  const handleAdd = () => {
    if (newResource.title && newResource.url) {
      setResources([
        ...resources,
        { ...newResource, id: Date.now().toString() }
      ]);
      setNewResource({ title: '', url: '', description: '', category: '' });
    }
  };

  const handleDelete = (id: string) => {
    setResources(resources.filter(resource => resource.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">Resource Manager</h2>
      </div>

      {/* Add New Resource Form */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              value={newResource.title}
              onChange={(e) => setNewResource({ ...newResource, title: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">URL</label>
            <input
              type="url"
              value={newResource.url}
              onChange={(e) => setNewResource({ ...newResource, url: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
            />
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={newResource.description}
            onChange={(e) => setNewResource({ ...newResource, description: e.target.value })}
            rows={2}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
          />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <input
            type="text"
            value={newResource.category}
            onChange={(e) => setNewResource({ ...newResource, category: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
          />
        </div>
        <div className="mt-4">
          <button
            onClick={handleAdd}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-rose-600 hover:bg-rose-700"
          >
            <Link2 className="h-4 w-4 mr-2" />
            Add Resource
          </button>
        </div>
      </div>

      {/* Resources List */}
      <div className="space-y-4">
        {resources.map((resource) => (
          <div
            key={resource.id}
            className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200"
          >
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-900">{resource.title}</h3>
                <div className="flex items-center space-x-2">
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                  <button
                    onClick={() => handleDelete(resource.id)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <Trash className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <p className="mt-1 text-sm text-gray-500">{resource.description}</p>
              <span className="mt-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                {resource.category}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}