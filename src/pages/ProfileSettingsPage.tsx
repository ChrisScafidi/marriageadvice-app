import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import Tabs from '../components/ui/Tabs';
import ProfileSection from '../components/profile/ProfileSection';
import NotificationSection from '../components/profile/NotificationSection';
import SecuritySection from '../components/profile/SecuritySection';
import DeleteAccountSection from '../components/profile/DeleteAccountSection';
import { Settings, Bell, Lock, UserCircle, AlertTriangle } from 'lucide-react';

export default function ProfileSettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  const tabs = [
    { id: 'profile', label: 'Profile', icon: UserCircle },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'danger', label: 'Danger Zone', icon: AlertTriangle },
  ];

  useEffect(() => {
    const loadUserProfile = async () => {
      if (!currentUser) return;

      try {
        await getDoc(doc(db, 'userProfiles', currentUser.uid));
      } catch (err) {
        console.error('Error loading profile:', err);
      } finally {
        setLoading(false);
      }
    };

    loadUserProfile();
  }, [currentUser]);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileSection />;
      case 'notifications':
        return <NotificationSection />;
      case 'security':
        return <SecuritySection />;
      case 'danger':
        return <DeleteAccountSection />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-rose-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <Settings className="h-6 w-6 text-gray-400 mr-2" />
                <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
              </div>
            </div>

            <Tabs
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              tabs={tabs}
            />

            <div className="mt-6">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}