import React from 'react';
import { BarChart, LineChart, PieChart } from 'lucide-react';

export default function ChatbotAnalytics() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <BarChart className="h-6 w-6 text-rose-600" />
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-medium text-gray-900">Active Users</h3>
              <p className="text-3xl font-bold text-gray-900">1,234</p>
              <p className="text-sm text-green-600">+12% from last week</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <LineChart className="h-6 w-6 text-rose-600" />
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-medium text-gray-900">Total Conversations</h3>
              <p className="text-3xl font-bold text-gray-900">5,678</p>
              <p className="text-sm text-green-600">+8% from last week</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <PieChart className="h-6 w-6 text-rose-600" />
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-medium text-gray-900">Response Rate</h3>
              <p className="text-3xl font-bold text-gray-900">94%</p>
              <p className="text-sm text-green-600">+2% from last week</p>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Topics */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Popular Topics</h3>
        <div className="space-y-4">
          {['Communication', 'Trust Building', 'Conflict Resolution', 'Intimacy'].map((topic, index) => (
            <div key={index} className="flex items-center">
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900">{topic}</span>
                  <span className="text-sm text-gray-500">
                    {Math.floor(Math.random() * 1000)} conversations
                  </span>
                </div>
                <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-rose-600 h-2 rounded-full"
                    style={{ width: `${Math.floor(Math.random() * 100)}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* User Feedback */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">User Feedback</h3>
        <div className="space-y-4">
          {['Very Helpful', 'Somewhat Helpful', 'Not Helpful'].map((category, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-sm text-gray-600">{category}</span>
              <div className="flex items-center">
                <div className="w-48 h-2 bg-gray-200 rounded-full mr-2">
                  <div
                    className="bg-rose-600 h-2 rounded-full"
                    style={{ width: `${Math.floor(Math.random() * 100)}%` }}
                  />
                </div>
                <span className="text-sm text-gray-500">
                  {Math.floor(Math.random() * 100)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}