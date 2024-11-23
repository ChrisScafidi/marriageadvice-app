import React from 'react';
import { X, Sparkles, Crown, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';

interface UpgradeModalProps {
  onClose: () => void;
  feature: string;
}

export default function UpgradeModal({ onClose, feature }: UpgradeModalProps) {
  const { theme } = useTheme();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className={`relative ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      } rounded-lg shadow-xl max-w-md w-full mx-auto p-1 bg-gradient-to-r from-rose-500 to-purple-600`}>
        <div className={`${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        } rounded-lg p-6`}>
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <Crown className="h-6 w-6 text-rose-500 mr-2" />
              <h3 className={`text-xl font-bold ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Unlock Premium Features
              </h3>
            </div>
            <button
              onClick={onClose}
              className={`${
                theme === 'dark' ? 'text-gray-400 hover:text-gray-300' : 'text-gray-400 hover:text-gray-500'
              }`}
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="text-center mb-8">
            <Sparkles className="h-12 w-12 text-rose-500 mx-auto mb-4" />
            <p className={`text-lg font-medium mb-2 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Ready to Transform Your Relationship?
            </p>
            <p className={`${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Upgrade to unlock {feature} and all premium features
            </p>
          </div>

          <div className={`${
            theme === 'dark' ? 'bg-gray-700' : 'bg-rose-50'
          } rounded-lg p-4 mb-6`}>
            <ul className="space-y-4">
              <li className="flex items-center">
                <Heart className="h-5 w-5 text-rose-500 mr-3 flex-shrink-0" />
                <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                  Connect with a supportive community of couples
                </span>
              </li>
              <li className="flex items-center">
                <Heart className="h-5 w-5 text-rose-500 mr-3 flex-shrink-0" />
                <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                  Unlimited AI conversations with personalized advice
                </span>
              </li>
              <li className="flex items-center">
                <Heart className="h-5 w-5 text-rose-500 mr-3 flex-shrink-0" />
                <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                  Advanced relationship tools and progress tracking
                </span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col space-y-3">
            <Link
              to="/pricing"
              className="w-full px-6 py-3 text-center text-white bg-gradient-to-r from-rose-500 to-purple-600 rounded-lg font-medium hover:from-rose-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200"
            >
              Upgrade Now
            </Link>
            <button
              onClick={onClose}
              className={`text-sm ${
                theme === 'dark'
                  ? 'text-gray-400 hover:text-gray-300'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Maybe Later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}