import React, { useState } from 'react';
import { MessageSquare, Bookmark, Heart, Calendar, Users, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { useSubscription } from '../../contexts/SubscriptionContext';
import UpgradeModal from '../subscription/UpgradeModal';

const actions = [
  {
    name: 'Start Chat',
    description: 'Begin a new conversation with your AI advisor',
    icon: MessageSquare,
    href: '/chat',
    color: 'bg-rose-500',
  },
  {
    name: 'Saved Resources',
    description: 'Access your bookmarked articles and tips',
    icon: Bookmark,
    href: '/resources',
    color: 'bg-purple-500',
  },
  {
    name: 'Daily Connection',
    description: 'Get today\'s relationship-building activity',
    icon: Heart,
    href: '/activities',
    color: 'bg-blue-500',
  },
  {
    name: 'Schedule Check-in',
    description: 'Plan your next relationship review',
    icon: Calendar,
    href: '/schedule',
    color: 'bg-green-500',
  },
  {
    name: 'Support Community',
    description: 'Connect with others on similar journeys',
    icon: Users,
    href: '/community',
    color: 'bg-indigo-500',
    requiresUpgrade: true,
  },
  {
    name: 'Progress Tracker',
    description: 'View your relationship growth and milestones',
    icon: TrendingUp,
    href: '/progress',
    color: 'bg-amber-500',
  },
];

export default function QuickActions() {
  const { theme } = useTheme();
  const { isSubscribed } = useSubscription();
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [selectedAction, setSelectedAction] = useState<string>('');

  const handleActionClick = (action: typeof actions[0], e: React.MouseEvent) => {
    if (action.requiresUpgrade && !isSubscribed) {
      e.preventDefault();
      setSelectedAction(action.name);
      setShowUpgradeModal(true);
    }
  };

  return (
    <>
      <div className={`${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      } rounded-lg shadow-sm p-6`}>
        <h2 className={`text-lg font-semibold ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        } mb-4`}>Quick Actions</h2>
        
        <div className="space-y-3">
          {actions.map((action) => (
            <Link
              key={action.name}
              to={action.href}
              onClick={(e) => handleActionClick(action, e)}
              className={`block group relative ${
                theme === 'dark'
                  ? 'bg-gray-700 hover:bg-gray-600 border-gray-600'
                  : 'bg-white hover:bg-gray-50 border-gray-200'
              } rounded-lg border p-4 transition-all duration-200`}
            >
              <div className="flex items-center">
                <div className={`${action.color} rounded-lg p-2 w-fit`}>
                  <action.icon className="h-4 w-4 text-white" />
                </div>
                <div className="ml-3">
                  <h3 className={`text-sm font-medium ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    {action.name}
                  </h3>
                  <p className={`text-xs ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    {action.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {showUpgradeModal && (
        <UpgradeModal 
          onClose={() => setShowUpgradeModal(false)}
          feature={selectedAction}
        />
      )}
    </>
  );
}