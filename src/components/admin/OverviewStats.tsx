import React from 'react';
import { Users, CreditCard, MessageSquare, TrendingUp } from 'lucide-react';

const stats = [
  {
    name: 'Total Users',
    value: '8,647',
    change: '+12.5%',
    changeType: 'increase',
    icon: Users,
  },
  {
    name: 'Active Subscriptions',
    value: '2,346',
    change: '+15.2%',
    changeType: 'increase',
    icon: CreditCard,
  },
  {
    name: 'Chat Sessions',
    value: '24,589',
    change: '+25.7%',
    changeType: 'increase',
    icon: MessageSquare,
  },
  {
    name: 'Monthly Revenue',
    value: '$45,678',
    change: '+8.3%',
    changeType: 'increase',
    icon: TrendingUp,
  },
];

export default function OverviewStats() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.name}
          className="relative overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:px-6 sm:py-6"
        >
          <dt>
            <div className="absolute rounded-md bg-rose-500 p-3">
              <stat.icon className="h-6 w-6 text-white" aria-hidden="true" />
            </div>
            <p className="ml-16 truncate text-sm font-medium text-gray-500">
              {stat.name}
            </p>
          </dt>
          <dd className="ml-16 flex items-baseline">
            <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
            <p
              className={`ml-2 flex items-baseline text-sm font-semibold ${
                stat.changeType === 'increase'
                  ? 'text-green-600'
                  : 'text-red-600'
              }`}
            >
              {stat.change}
            </p>
          </dd>
        </div>
      ))}
    </div>
  );
}