import React, { useState } from 'react';
import { Bookmark, Search, Trash2, ExternalLink, Filter } from 'lucide-react';

interface SavedResource {
  id: string;
  title: string;
  description: string;
  url: string;
  category: string;
  dateAdded: Date;
}

const SAMPLE_RESOURCES: SavedResource[] = [
  {
    id: '1',
    title: 'The Art of Active Listening',
    description: 'Learn effective techniques for better communication through active listening.',
    url: 'https://example.com/active-listening',
    category: 'Communication',
    dateAdded: new Date('2024-02-15'),
  },
  {
    id: '2',
    title: 'Building Trust After Conflict',
    description: 'Practical steps to rebuild and strengthen trust in your relationship.',
    url: 'https://example.com/trust-building',
    category: 'Trust',
    dateAdded: new Date('2024-02-14'),
  },
  {
    id: '3',
    title: 'Daily Mindfulness for Couples',
    description: 'Simple mindfulness exercises to practice together.',
    url: 'https://example.com/mindfulness',
    category: 'Wellness',
    dateAdded: new Date('2024-02-13'),
  },
];

const CATEGORIES = ['All', 'Communication', 'Trust', 'Wellness', 'Intimacy', 'Conflict Resolution'];

export default function SavedResourcesPage() {
  const [resources, setResources] = useState<SavedResource[]>(SAMPLE_RESOURCES);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const handleRemove = (id: string) => {
    setResources(resources.filter(resource => resource.id !== id));
  };

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || resource.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Saved Resources</h1>
            <p className="mt-1 text-sm text-gray-500">
              Access your bookmarked articles, tips, and guides
            </p>
          </div>
          <Bookmark className="h-8 w-8 text-rose-500" />
        </div>

        {/* Search and Filter */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-rose-500 focus:border-rose-500"
            />
          </div>
          <div className="sm:w-64">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter className="h-5 w-5 text-gray-400" />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-rose-500 focus:border-rose-500"
              >
                {CATEGORIES.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredResources.map((resource) => (
            <div
              key={resource.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-100 text-rose-800">
                    {resource.category}
                  </span>
                  <h3 className="mt-2 text-lg font-medium text-gray-900">
                    {resource.title}
                  </h3>
                </div>
                <div className="flex items-center space-x-2">
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <ExternalLink className="h-5 w-5" />
                  </a>
                  <button
                    onClick={() => handleRemove(resource.id)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <p className="mt-2 text-sm text-gray-500">
                {resource.description}
              </p>
              <div className="mt-4 text-xs text-gray-400">
                Saved on {resource.dateAdded.toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>

        {filteredResources.length === 0 && (
          <div className="text-center py-12">
            <Bookmark className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No saved resources</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm || selectedCategory !== 'All'
                ? 'Try adjusting your search or filter'
                : 'Start saving resources to access them here'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}