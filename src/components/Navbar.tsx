import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, Settings, MessageCircle, LayoutDashboard, Info, Shield, Sun, Moon, Users } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { useSubscription } from '../contexts/SubscriptionContext';
import UpgradeModal from './subscription/UpgradeModal';

export default function Navbar() {
  const { currentUser, isAdmin, adminRole, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { isSubscribed } = useSubscription();
  const navigate = useNavigate();
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/signin');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  const handleCommunityClick = (e: React.MouseEvent) => {
    if (!isSubscribed) {
      e.preventDefault();
      setShowUpgradeModal(true);
    }
  };

  return (
    <nav className={`${
      theme === 'dark' ? 'bg-gray-800 shadow-gray-900' : 'bg-white'
    } shadow-lg`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-rose-500 to-purple-600 rounded-full flex items-center justify-center">
                <svg 
                  viewBox="0 0 24 24" 
                  fill="white" 
                  className="w-5 h-5"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </div>
              <span className={`ml-2 text-xl font-bold ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                MarriageAdvice.AI
              </span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {currentUser ? (
              <>
                <Link 
                  to="/chat" 
                  className={`quick-action-card px-3 py-2 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}
                >
                  <MessageCircle className="h-5 w-5 mr-2 text-rose-500" />
                  <span>Chat</span>
                </Link>
                <Link 
                  to="/dashboard" 
                  className={`quick-action-card px-3 py-2 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}
                >
                  <LayoutDashboard className="h-5 w-5 mr-2 text-rose-500" />
                  <span>Dashboard</span>
                </Link>
                <Link 
                  to="/community"
                  onClick={handleCommunityClick}
                  className={`quick-action-card px-3 py-2 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}
                >
                  <Users className="h-5 w-5 mr-2 text-rose-500" />
                  <span>Community</span>
                </Link>
                <Link 
                  to="/how-it-works" 
                  className={`quick-action-card px-3 py-2 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}
                >
                  <Info className="h-5 w-5 mr-2 text-rose-500" />
                  <span>How It Works</span>
                </Link>
                {isAdmin && (
                  <Link 
                    to="/admin"
                    className={`quick-action-card px-3 py-2 ${
                      theme === 'dark' 
                        ? 'bg-rose-900 text-rose-200' 
                        : 'bg-rose-50 text-rose-600'
                    } hover:bg-rose-100`}
                  >
                    <Shield className="h-5 w-5 mr-2" />
                    <span>
                      {adminRole === 'super_admin' ? 'Super Admin' : 'Admin'}
                    </span>
                  </Link>
                )}
                <button
                  onClick={toggleTheme}
                  className={`p-2 rounded-full ${
                    theme === 'dark'
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {theme === 'dark' ? (
                    <Sun className="h-5 w-5" />
                  ) : (
                    <Moon className="h-5 w-5" />
                  )}
                </button>
                <div className="relative group">
                  <button className={`flex items-center ${
                    theme === 'dark'
                      ? 'text-gray-300 hover:text-white'
                      : 'text-gray-600 hover:text-rose-600'
                  } transition-colors`}>
                    <Settings className="h-5 w-5" />
                  </button>
                  <div className={`absolute right-0 w-48 mt-2 origin-top-right rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none hidden group-hover:block ${
                    theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                  }`}>
                    <div className="py-1">
                      <Link
                        to="/settings"
                        className={`block px-4 py-2 text-sm ${
                          theme === 'dark'
                            ? 'text-gray-300 hover:bg-gray-700'
                            : 'text-gray-700 hover:bg-rose-50'
                        } transition-colors`}
                      >
                        Settings
                      </Link>
                      <button
                        onClick={handleLogout}
                        className={`block w-full text-left px-4 py-2 text-sm ${
                          theme === 'dark'
                            ? 'text-gray-300 hover:bg-gray-700'
                            : 'text-gray-700 hover:bg-rose-50'
                        } transition-colors`}
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <button
                  onClick={toggleTheme}
                  className={`p-2 rounded-full ${
                    theme === 'dark'
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {theme === 'dark' ? (
                    <Sun className="h-5 w-5" />
                  ) : (
                    <Moon className="h-5 w-5" />
                  )}
                </button>
                <Link 
                  to="/signin"
                  className="btn-primary"
                >
                  Get Started Now — It's Free
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {showUpgradeModal && (
        <UpgradeModal
          onClose={() => setShowUpgradeModal(false)}
          feature="Support Community"
        />
      )}
    </nav>
  );
}