import React from 'react';
import { Check, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CurrentPlanProps {
  onUpgrade: () => void;
}

export default function CurrentPlan({ onUpgrade }: CurrentPlanProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Current Plan</h2>
        <span className="px-3 py-1 text-sm font-medium text-rose-700 bg-rose-100 rounded-full">
          Premium
        </span>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-baseline">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">$19/month</h3>
            <p className="mt-1 text-sm text-gray-500">Billed monthly</p>
          </div>
          <button
            onClick={onUpgrade}
            className="text-sm text-rose-600 hover:text-rose-500 flex items-center"
          >
            Compare Plans
            <ChevronRight className="h-4 w-4 ml-1" />
          </button>
        </div>

        <div className="pt-4">
          <h4 className="text-sm font-medium text-gray-900 mb-4">Your Premium Benefits:</h4>
          <ul className="space-y-3">
            {[
              'Unlimited AI conversations',
              'Priority support',
              'Personalized action plans',
              'Progress tracking',
              'Access to all resources',
              'Relationship milestone tracking'
            ].map((benefit, index) => (
              <li key={index} className="flex items-center text-sm text-gray-600">
                <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                {benefit}
              </li>
            ))}
          </ul>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Your next billing date is <span className="font-medium text-gray-900">March 15, 2024</span>
          </p>
          <div className="mt-4 flex space-x-4">
            <Link to="/subscription" className="text-sm text-gray-600 hover:text-gray-900">
              Cancel Subscription
            </Link>
            <Link to="/subscription" className="text-sm text-gray-600 hover:text-gray-900">
              Change Billing Cycle
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}