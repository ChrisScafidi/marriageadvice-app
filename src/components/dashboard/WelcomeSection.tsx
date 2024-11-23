import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useUserProfile } from '../../contexts/UserProfileContext';
import { Heart } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

export default function WelcomeSection() {
  const { currentUser } = useAuth();
  const { profile, loading } = useUserProfile();
  const { theme } = useTheme();

  if (loading) {
    return (
      <div className={`${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      } rounded-lg shadow-sm p-6 animate-pulse`}>
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
      </div>
    );
  }

  return (
    <div className={`${
      theme === 'dark' ? 'bg-gray-800' : 'bg-white'
    } rounded-lg shadow-sm p-6`}>
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-2xl font-bold ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Welcome back, {profile?.name || currentUser?.displayName || 'Friend'}!
          </h1>
          <p className={`mt-1 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
          }`}>
            {profile?.primaryGoal
              ? `Working on: ${profile.primaryGoal}`
              : "Let's continue working on your relationship goals"}
          </p>
        </div>
        <Heart className="h-8 w-8 text-rose-500" />
      </div>
    </div>
  );
}