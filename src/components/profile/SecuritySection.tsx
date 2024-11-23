import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Shield, Smartphone, LogOut } from 'lucide-react';

export default function SecuritySection() {
  const { currentUser, logout } = useAuth();
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    // Implement password change logic
    alert('Password updated successfully!');
  };

  const handleLogoutAllDevices = async () => {
    try {
      // Implement logout from all devices
      await logout();
      alert('Logged out from all devices');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Password Change Section */}
      <div className="bg-white rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Shield className="h-5 w-5 text-gray-400" />
            <h3 className="ml-2 text-lg font-medium text-gray-900">Password</h3>
          </div>
          <button
            onClick={() => setShowPasswordForm(!showPasswordForm)}
            className="text-sm text-rose-600 hover:text-rose-500"
          >
            {showPasswordForm ? 'Cancel' : 'Change password'}
          </button>
        </div>

        {showPasswordForm && (
          <form onSubmit={handlePasswordChange} className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Confirm New Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
                required
              />
            </div>
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
            >
              Update Password
            </button>
          </form>
        )}
      </div>

      {/* Two-Factor Authentication */}
      <div className="border-t border-gray-200 pt-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Smartphone className="h-5 w-5 text-gray-400" />
            <h3 className="ml-2 text-lg font-medium text-gray-900">
              Two-Factor Authentication
            </h3>
          </div>
          <button className="text-sm text-rose-600 hover:text-rose-500">
            Enable
          </button>
        </div>
        <p className="mt-1 text-sm text-gray-500">
          Add an extra layer of security to your account
        </p>
      </div>

      {/* Active Sessions */}
      <div className="border-t border-gray-200 pt-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <LogOut className="h-5 w-5 text-gray-400" />
            <h3 className="ml-2 text-lg font-medium text-gray-900">
              Active Sessions
            </h3>
          </div>
          <button
            onClick={handleLogoutAllDevices}
            className="text-sm text-rose-600 hover:text-rose-500"
          >
            Log out all devices
          </button>
        </div>
        <p className="mt-1 text-sm text-gray-500">
          Manage your active sessions across different devices
        </p>
      </div>

      {/* Connected Accounts */}
      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-lg font-medium text-gray-900">Connected Accounts</h3>
        <div className="mt-4">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center">
              <img
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                alt="Google"
                className="h-6 w-6"
              />
              <span className="ml-2 text-sm text-gray-700">Google Account</span>
            </div>
            <button className="text-sm text-gray-600 hover:text-gray-500">
              {currentUser?.providerData.some(
                (provider) => provider.providerId === 'google.com'
              )
                ? 'Disconnect'
                : 'Connect'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}