import React from 'react';
import { ArrowRight } from 'lucide-react';

const recommendations = [
  {
    title: 'Communication Exercise',
    description: 'Practice active listening with your partner using the HEAR technique',
    type: 'Exercise',
    duration: '15 mins',
  },
  {
    title: 'Trust Building',
    description: 'Read our guide on rebuilding trust through small daily actions',
    type: 'Article',
    duration: '10 mins',
  },
  {
    title: 'Weekly Check-in',
    description: 'Schedule your weekly relationship temperature check',
    type: 'Activity',
    duration: '20 mins',
  },
];

export default function RecommendedActions() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Recommended for You</h2>
      
      <div className="space-y-4">
        {recommendations.map((item, index) => (
          <div 
            key={index}
            className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:border-rose-200 hover:bg-rose-50 transition-colors cursor-pointer"
          >
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-medium text-gray-900">{item.title}</h3>
                <span className="px-2 py-1 text-xs font-medium text-rose-600 bg-rose-100 rounded-full">
                  {item.type}
                </span>
              </div>
              <p className="mt-1 text-sm text-gray-500">{item.description}</p>
              <p className="mt-1 text-xs text-gray-400">{item.duration}</p>
            </div>
            <ArrowRight className="h-5 w-5 text-gray-400" />
          </div>
        ))}
      </div>
    </div>
  );
}