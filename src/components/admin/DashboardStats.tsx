import React from 'react';
import { Users, CreditCard, MessageCircle, TrendingUp } from 'lucide-react';
import { useAdminStats } from '../../hooks/useAdminStats';

export function DashboardStats() {
  const { stats, loading } = useAdminStats();

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow p-6 animate-pulse">
            <div className="h-6 w-6 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 w-24 bg-gray-200 rounded mb-2"></div>
            <div className="h-8 w-32 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount / 100);
  };

  const formatGrowth = (value: number) => {
    const formatted = value.toFixed(1);
    return value > 0 ? `+${formatted}%` : `${formatted}%`;
  };

  const statCards = [
    {
      title: 'Total Users',
      value: stats?.totalUsers.toLocaleString() || '0',
      icon: Users,
      trend: formatGrowth(stats?.userGrowth || 0),
      trendColor: stats?.userGrowth && stats.userGrowth > 0 ? 'text-green-500' : 'text-red-500',
    },
    {
      title: 'Active Subscriptions',
      value: stats?.activeSubscriptions.toLocaleString() || '0',
      icon: CreditCard,
      trend: formatGrowth(stats?.subscriptionGrowth || 0),
      trendColor: stats?.subscriptionGrowth && stats.subscriptionGrowth > 0 ? 'text-green-500' : 'text-red-500',
    },
    {
      title: 'Chat Sessions',
      value: stats?.chatSessions.toLocaleString() || '0',
      icon: MessageCircle,
      trend: formatGrowth(stats?.chatGrowth || 0),
      trendColor: stats?.chatGrowth && stats.chatGrowth > 0 ? 'text-green-500' : 'text-red-500',
    },
    {
      title: 'Monthly Revenue',
      value: formatCurrency(stats?.monthlyRevenue || 0),
      icon: TrendingUp,
      trend: formatGrowth(stats?.revenueGrowth || 0),
      trendColor: stats?.revenueGrowth && stats.revenueGrowth > 0 ? 'text-green-500' : 'text-red-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {statCards.map((stat, index) => (
        <div key={index} className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-gray-600">
              <stat.icon className="h-6 w-6" />
            </div>
            <span className={`text-sm font-semibold ${stat.trendColor}`}>
              {stat.trend}
            </span>
          </div>
          <h3 className="text-gray-600 text-sm mb-2">{stat.title}</h3>
          <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
        </div>
      ))}
    </div>
  );
}