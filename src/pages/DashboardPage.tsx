import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import WelcomeSection from '../components/dashboard/WelcomeSection';
import ProgressTracker from '../components/dashboard/ProgressTracker';
import QuickActions from '../components/dashboard/QuickActions';
import DailyCheckIn from '../components/dashboard/DailyCheckIn/DailyCheckIn';
import { useTheme } from '../contexts/ThemeContext';

export default function DashboardPage() {
  const { currentUser } = useAuth();
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1 space-y-8">
            <WelcomeSection />
            <DailyCheckIn />
            <ProgressTracker />
          </div>

          {/* Right Sidebar */}
          <div className="lg:w-80 space-y-6">
            <QuickActions />
          </div>
        </div>
      </div>
    </div>
  );
}