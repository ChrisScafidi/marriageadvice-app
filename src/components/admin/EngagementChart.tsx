import React from 'react';
import { LineChart, TrendingUp } from 'lucide-react';

export function EngagementChart() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <LineChart className="w-6 h-6 text-gray-600 mr-2" />
          <h2 className="text-lg font-semibold text-gray-800">User Engagement</h2>
        </div>
        <div className="flex items-center space-x-2">
          <span className="flex items-center text-green-500 text-sm">
            <TrendingUp className="w-4 h-4 mr-1" />
            +23% vs last week
          </span>
        </div>
      </div>
      <div className="h-64 flex items-center justify-center text-gray-500">
        Chart visualization would go here
      </div>
    </div>
  );
}