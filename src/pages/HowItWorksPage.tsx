import React from 'react';
import { Link } from 'react-router-dom';
import {
  MessageCircle,
  ArrowRight,
  LayoutDashboard,
  Calendar,
  TrendingUp,
  CheckCircle,
  Heart,
  Target,
  Lightbulb
} from 'lucide-react';
import PersonaAvatar from '../components/HowItWorks/PersonaAvatar';
import ChatDemo from '../components/HowItWorks/ChatDemo';

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            Your Personal AI Relationship Guide
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Experience personalized relationship guidance powered by advanced AI, available 24/7 to help you build stronger connections.
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <Link
              to="/signup"
              className="btn-primary"
            >
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>

        {/* AI Personas Section */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Meet Your AI Advisors
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
              <div className="flex justify-center mb-4">
                <PersonaAvatar type="empathetic" size="lg" />
              </div>
              <h3 className="text-xl font-semibold text-center mb-2">Empathetic Listener</h3>
              <p className="text-gray-600 text-center">
                Offers gentle, compassionate guidance with a focus on emotional support and understanding.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
              <div className="flex justify-center mb-4">
                <PersonaAvatar type="tough" size="lg" />
              </div>
              <h3 className="text-xl font-semibold text-center mb-2">Tough Love Coach</h3>
              <p className="text-gray-600 text-center">
                Provides direct, action-oriented advice to help you make real progress in your relationship.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
              <div className="flex justify-center mb-4">
                <PersonaAvatar type="wise" size="lg" />
              </div>
              <h3 className="text-xl font-semibold text-center mb-2">Wise Mentor</h3>
              <p className="text-gray-600 text-center">
                Shares thoughtful insights and wisdom to help you gain deeper understanding of your relationship.
              </p>
            </div>
          </div>
        </div>

        {/* Interactive Chat Demo */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
            Try It Yourself
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Experience how different AI personas can help with your unique situation
          </p>
          <ChatDemo />
        </div>

        {/* Features Section */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Comprehensive Relationship Support
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
              <div className="flex items-center mb-4">
                <LayoutDashboard className="h-6 w-6 text-rose-500" />
                <h3 className="text-xl font-semibold ml-2">Personalized Dashboard</h3>
              </div>
              <p className="text-gray-600">
                Track your relationship progress, set goals, and access personalized recommendations all in one place.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
              <div className="flex items-center mb-4">
                <Calendar className="h-6 w-6 text-rose-500" />
                <h3 className="text-xl font-semibold ml-2">Daily Check-ins</h3>
              </div>
              <p className="text-gray-600">
                Regular emotional check-ins and guided reflections to help you stay connected with your feelings and goals.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
              <div className="flex items-center mb-4">
                <TrendingUp className="h-6 w-6 text-rose-500" />
                <h3 className="text-xl font-semibold ml-2">Progress Tracking</h3>
              </div>
              <p className="text-gray-600">
                Visualize your relationship growth over time with detailed progress metrics and insights.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
              <div className="flex items-center mb-4">
                <MessageCircle className="h-6 w-6 text-rose-500" />
                <h3 className="text-xl font-semibold ml-2">24/7 AI Support</h3>
              </div>
              <p className="text-gray-600">
                Get instant guidance and support whenever you need it, with our always-available AI advisors.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-24">
          <div className="bg-gradient-to-r from-rose-500 to-purple-600 rounded-xl p-8 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Relationship?</h2>
            <p className="text-xl mb-8">Join thousands of couples already benefiting from AI-powered relationship guidance.</p>
            <Link
              to="/signup"
              className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-rose-600 bg-white hover:bg-rose-50 md:py-4 md:text-lg md:px-10"
            >
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}