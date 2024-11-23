import React from 'react';

export default function SubscriptionStats() {
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow">
      <div className="p-6">
        <h3 className="text-base font-semibold leading-6 text-gray-900">
          Subscription Overview
        </h3>
        <div className="mt-2 h-48 rounded-lg bg-gray-50 p-4">
          <div className="flex h-full items-center justify-center">
            <p className="text-sm text-gray-500">Subscription data will be displayed here</p>
          </div>
        </div>
      </div>
    </div>
  );
}