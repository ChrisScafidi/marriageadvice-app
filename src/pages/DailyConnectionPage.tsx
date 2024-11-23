import React, { useState } from 'react';
import { Heart, Calendar, Mail, CheckCircle, ArrowRight } from 'lucide-react';

interface Activity {
  id: string;
  title: string;
  description: string;
  steps: string[];
  duration: string;
  category: string;
}

const SAMPLE_ACTIVITY: Activity = {
  id: '1',
  title: 'Gratitude Exchange',
  description: "Share three specific things you appreciate about each other, focusing on recent actions or qualities you've noticed.",
  steps: [
    'Find a quiet moment together without distractions',
    'Take turns sharing one thing you appreciate about each other',
    'Be specific and mention recent examples',
    'Discuss how these actions or qualities impact your relationship',
    'End with a hug or physical connection'
  ],
  duration: '15 minutes',
  category: 'Emotional Connection'
};

export default function DailyConnectionPage() {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [email, setEmail] = useState('');
  const [showSubscriptionSuccess, setShowSubscriptionSuccess] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubscribed(true);
    setShowSubscriptionSuccess(true);
    setTimeout(() => setShowSubscriptionSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Daily Connection</h1>
            <p className="mt-1 text-sm text-gray-500">
              Strengthen your relationship with daily activities
            </p>
          </div>
          <Heart className="h-8 w-8 text-rose-500" />
        </div>

        {/* Today's Activity */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 text-rose-500 mr-2" />
              <h2 className="text-lg font-medium text-gray-900">Today's Activity</h2>
            </div>
            <span className="px-3 py-1 bg-rose-100 text-rose-800 text-sm font-medium rounded-full">
              {SAMPLE_ACTIVITY.duration}
            </span>
          </div>

          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {SAMPLE_ACTIVITY.title}
          </h3>
          <p className="text-gray-600 mb-6">
            {SAMPLE_ACTIVITY.description}
          </p>

          <div className="space-y-4">
            <h4 className="text-sm font-medium text-gray-900">How to do this activity:</h4>
            <ol className="space-y-3">
              {SAMPLE_ACTIVITY.steps.map((step, index) => (
                <li key={index} className="flex items-start">
                  <span className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-rose-100 text-rose-600 text-sm font-medium mr-3">
                    {index + 1}
                  </span>
                  <span className="text-gray-600">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="bg-gradient-to-r from-rose-500 to-purple-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center mb-4">
            <Mail className="h-6 w-6 mr-2" />
            <h2 className="text-lg font-semibold">Daily Connection Newsletter</h2>
          </div>
          <p className="mb-6">
            Get daily relationship-building activities delivered to your inbox every morning.
            Start your day with intention and keep your connection strong.
          </p>

          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-md border-2 border-white/20 bg-white/10 placeholder-white/60 text-white focus:outline-none focus:border-white"
              required
            />
            <button
              type="submit"
              disabled={isSubscribed}
              className="px-6 py-2 bg-white text-rose-600 rounded-md font-medium hover:bg-rose-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubscribed ? (
                <span className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Subscribed
                </span>
              ) : (
                <span className="flex items-center">
                  Subscribe
                  <ArrowRight className="h-4 w-4 ml-2" />
                </span>
              )}
            </button>
          </form>

          {showSubscriptionSuccess && (
            <div className="mt-4 p-4 bg-white/20 rounded-md">
              <p className="text-sm">
                Thank you for subscribing! Check your email to confirm your subscription.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}