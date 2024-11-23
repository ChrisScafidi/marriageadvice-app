import React from 'react';
import { Link } from 'react-router-dom';
import { 
  MessageCircle, 
  Shield, 
  Clock, 
  ChevronRight, 
  Lock, 
  Sparkles,
  Brain,
  Heart,
  Users,
  Zap
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-rose-50 to-purple-50 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32 pt-20">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 lg:mt-16">
              <div className="text-center">
                <h1 className="section-title animate-fade-in">
                  <span className="block">Struggling in Your Marriage?</span>
                  <span className="block bg-gradient-to-r from-rose-500 to-purple-600 bg-clip-text text-transparent">
                    We're Here to Help You Reconnect.
                  </span>
                </h1>
                <p className="mt-3 max-w-md mx-auto text-base text-gray-600 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl animate-slide-up">
                  Rediscover love, rebuild trust, and create a stronger bond with personalized advice tailored just for you. 
                  Let our AI guide you to a healthier, happier relationship.
                </p>
                <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
                  <div className="rounded-md shadow">
                    <Link
                      to="/signin"
                      className="btn-primary w-full flex items-center justify-center"
                    >
                      Get Started Now — It's Free
                    </Link>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <Link
                      to="/how-it-works"
                      className="btn-secondary w-full flex items-center justify-center"
                    >
                      See How It Works
                    </Link>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-16 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-50 to-transparent opacity-50"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
              Meet Your 24/7 Relationship Guide
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powered by advanced AI, we provide personalized support exactly when you need it
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
            <div className="card transform hover:scale-105 transition-all duration-300">
              <div className="h-12 w-12 rounded-lg bg-gradient-to-r from-rose-500 to-purple-600 text-white flex items-center justify-center mb-6">
                <Brain className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                AI-Powered Insights
              </h3>
              <p className="text-gray-600">
                Our advanced AI understands your unique situation and provides personalized guidance based on proven relationship psychology.
              </p>
            </div>

            <div className="card transform hover:scale-105 transition-all duration-300">
              <div className="h-12 w-12 rounded-lg bg-gradient-to-r from-rose-500 to-purple-600 text-white flex items-center justify-center mb-6">
                <Lock className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                100% Private & Secure
              </h3>
              <p className="text-gray-600">
                Your conversations are completely private and encrypted. Share freely without worry about judgment or privacy concerns.
              </p>
            </div>

            <div className="card transform hover:scale-105 transition-all duration-300">
              <div className="h-12 w-12 rounded-lg bg-gradient-to-r from-rose-500 to-purple-600 text-white flex items-center justify-center mb-6">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Instant Support 24/7
              </h3>
              <p className="text-gray-600">
                Get immediate guidance whenever you need it. No waiting for appointments or scheduling hassles.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
              Why Couples Choose MarriageAdvice.AI
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the future of relationship support
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-8 transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-rose-500 to-purple-600 text-white flex items-center justify-center">
                  <Heart className="h-5 w-5" />
                </div>
                <h3 className="ml-4 text-xl font-semibold text-gray-900">Personalized Guidance</h3>
              </div>
              <p className="text-gray-600">
                Get advice tailored to your unique situation and relationship dynamics. Our AI learns and adapts to provide increasingly relevant support.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-rose-500 to-purple-600 text-white flex items-center justify-center">
                  <Users className="h-5 w-5" />
                </div>
                <h3 className="ml-4 text-xl font-semibold text-gray-900">Supportive Community</h3>
              </div>
              <p className="text-gray-600">
                Connect with others on similar journeys while maintaining privacy. Share experiences and find strength in community support.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-rose-500 to-purple-600 text-white flex items-center justify-center">
                  <Sparkles className="h-5 w-5" />
                </div>
                <h3 className="ml-4 text-xl font-semibold text-gray-900">Proven Techniques</h3>
              </div>
              <p className="text-gray-600">
                Access research-backed strategies and exercises that have helped thousands of couples rebuild stronger relationships.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-rose-500 to-purple-600 text-white flex items-center justify-center">
                  <Shield className="h-5 w-5" />
                </div>
                <h3 className="ml-4 text-xl font-semibold text-gray-900">Affordable Support</h3>
              </div>
              <p className="text-gray-600">
                Professional-quality relationship guidance at a fraction of traditional therapy costs. Start free and upgrade when you're ready.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-rose-500 to-purple-600">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to transform your relationship?</span>
            <span className="block text-rose-200">Start your journey today - it's free.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link
                to="/signin"
                className="btn-secondary bg-white hover:bg-rose-50"
              >
                Get Started Now
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}