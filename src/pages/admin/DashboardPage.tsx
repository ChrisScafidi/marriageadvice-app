import React from 'react';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import { MessageCircle, Users, CreditCard, Settings } from 'lucide-react';
import { DashboardStats } from '../../components/admin/DashboardStats';
import { EngagementChart } from '../../components/admin/EngagementChart';
import { RecentUsers } from '../../components/admin/RecentUsers';
import ChatbotSettingsPage from './ChatbotSettingsPage';
import UserManagementPage from './UserManagementPage';
import SubscriptionsPage from './SubscriptionsPage';
import AdminSettingsPage from './AdminSettingsPage';

export default function DashboardPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100">
      <Routes>
        <Route path="/" element={
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="mt-1 text-sm text-gray-500">
                Overview of your MarriageAdvice.AI platform
              </p>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <Link
                to="/admin/chatbot"
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center">
                  <MessageCircle className="h-8 w-8 text-rose-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900">Chatbot Settings</p>
                    <p className="text-xs text-gray-500">Manage AI responses and behavior</p>
                  </div>
                </div>
              </Link>

              <Link
                to="/admin/users"
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center">
                  <Users className="h-8 w-8 text-rose-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900">User Management</p>
                    <p className="text-xs text-gray-500">View and manage user accounts</p>
                  </div>
                </div>
              </Link>

              <Link
                to="/admin/subscriptions"
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center">
                  <CreditCard className="h-8 w-8 text-rose-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900">Subscriptions</p>
                    <p className="text-xs text-gray-500">Manage subscription plans</p>
                  </div>
                </div>
              </Link>

              <Link
                to="/admin/settings"
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center">
                  <Settings className="h-8 w-8 text-rose-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900">Settings</p>
                    <p className="text-xs text-gray-500">Configure system settings</p>
                  </div>
                </div>
              </Link>
            </div>

            <DashboardStats />

            {/* Charts and Tables */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <EngagementChart />
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">User Growth</h2>
                <div className="h-64 flex items-center justify-center text-gray-500">
                  User growth chart would go here
                </div>
              </div>
            </div>

            {/* Recent Users Table */}
            <RecentUsers />
          </div>
        } />
        <Route path="/chatbot/*" element={<ChatbotSettingsPage />} />
        <Route path="/users" element={<UserManagementPage />} />
        <Route path="/subscriptions" element={<SubscriptionsPage />} />
        <Route path="/settings" element={<AdminSettingsPage />} />
      </Routes>
    </div>
  );
}