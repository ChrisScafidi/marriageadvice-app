import React from 'react';
import { Crown, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SubscriptionStatus() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Subscription</h2>
        <Crown className="h-5 w-5 text-yellow-500" />
      </div>

      <div className="bg-gradient-to-br from-rose-500 to-purple-600 rounded-lg p-4 text-white">
        <p className="text-sm font-medium">Free Plan</p>
        <p className="text-xs mt-1 opacity-80">5 AI conversations remaining this month</p>
        
        <Link
          to="/pricing"
          className="mt-4 flex items-center justify-between bg-white/20 rounded-lg px-3 py-2 text-sm hover:bg-white/30 transition-colors"
        >
          <span>Upgrade to Premium</span>
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-4">
        <h3 className="text-sm font-medium text-gray-900 mb-2">Premium Benefits</h3>
        <ul className="space-y-2">
          <li className="flex items-center text-sm text-gray-500">
            <span className="w-2 h-2 bg-rose-500 rounded-full mr-2"></span>
            Unlimited AI conversations
          </li>
          <li className="flex items-center text-sm text-gray-500">
            <span className="w-2 h-2 bg-rose-500 rounded-full mr-2"></span>
            Personalized action plans
          </li>
          <li className="flex items-center text-sm text-gray-500">
            <span className="w-2 h-2 bg-rose-500 rounded-full mr-2"></span>
            Priority support
          </li>
        </ul>
      </div>
    </div>
  );
}