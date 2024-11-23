import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Bell, Calendar, MessageCircle, Heart, CheckCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';

interface NotificationSettings {
  emailFrequency: string;
  pushEnabled: boolean;
  notifications: {
    dailyActivities: boolean;
    checkInReminders: boolean;
    chatResponses: boolean;
    progressUpdates: boolean;
    resourceAlerts: boolean;
    weeklyDigest: boolean;
  };
  emailTypes: {
    relationshipTips: boolean;
    activityReminders: boolean;
    progressReports: boolean;
    newFeatures: boolean;
  };
}

export default function NotificationSection() {
  const { currentUser } = useAuth();
  const { register, handleSubmit, reset } = useForm<NotificationSettings>();
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSettings = async () => {
      if (!currentUser) return;

      try {
        const settingsDoc = await getDoc(doc(db, 'notificationSettings', currentUser.uid));
        if (settingsDoc.exists()) {
          reset(settingsDoc.data() as NotificationSettings);
        }
      } catch (error) {
        console.error('Error loading notification settings:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSettings();
  }, [currentUser, reset]);

  const onSubmit = async (data: NotificationSettings) => {
    if (!currentUser) return;

    try {
      await updateDoc(doc(db, 'notificationSettings', currentUser.uid), {
        ...data,
        updatedAt: new Date().toISOString()
      });

      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error('Error saving notification settings:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-rose-500"></div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Email Preferences */}
      <div>
        <h3 className="text-lg font-medium text-gray-900">Email Preferences</h3>
        <p className="mt-1 text-sm text-gray-500">Choose how often you'd like to receive email updates</p>
        
        <div className="mt-4">
          <select
            {...register('emailFrequency')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
          >
            <option value="daily">Daily digest</option>
            <option value="weekly">Weekly summary</option>
            <option value="monthly">Monthly overview</option>
            <option value="never">Never</option>
          </select>
        </div>
      </div>

      {/* Push Notifications */}
      <div>
        <h3 className="text-lg font-medium text-gray-900">Push Notifications</h3>
        <div className="mt-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              {...register('pushEnabled')}
              className="rounded border-gray-300 text-rose-600 shadow-sm focus:border-rose-500 focus:ring-rose-500"
            />
            <span className="ml-2 text-sm text-gray-600">
              Enable push notifications
            </span>
          </label>
        </div>
      </div>

      {/* Notification Types */}
      <div>
        <h3 className="text-lg font-medium text-gray-900">Notification Types</h3>
        <p className="mt-1 text-sm text-gray-500">Select which notifications you'd like to receive</p>

        <div className="mt-4 space-y-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              {...register('notifications.dailyActivities')}
              className="rounded border-gray-300 text-rose-600 shadow-sm focus:border-rose-500 focus:ring-rose-500"
            />
            <Heart className="ml-2 h-5 w-5 text-gray-400" />
            <span className="ml-2 text-sm text-gray-600">
              Daily connection activities
            </span>
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              {...register('notifications.checkInReminders')}
              className="rounded border-gray-300 text-rose-600 shadow-sm focus:border-rose-500 focus:ring-rose-500"
            />
            <Calendar className="ml-2 h-5 w-5 text-gray-400" />
            <span className="ml-2 text-sm text-gray-600">
              Check-in reminders
            </span>
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              {...register('notifications.chatResponses')}
              className="rounded border-gray-300 text-rose-600 shadow-sm focus:border-rose-500 focus:ring-rose-500"
            />
            <MessageCircle className="ml-2 h-5 w-5 text-gray-400" />
            <span className="ml-2 text-sm text-gray-600">
              Chat responses
            </span>
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              {...register('notifications.progressUpdates')}
              className="rounded border-gray-300 text-rose-600 shadow-sm focus:border-rose-500 focus:ring-rose-500"
            />
            <Bell className="ml-2 h-5 w-5 text-gray-400" />
            <span className="ml-2 text-sm text-gray-600">
              Progress updates
            </span>
          </label>
        </div>
      </div>

      {/* Email Content Types */}
      <div>
        <h3 className="text-lg font-medium text-gray-900">Email Content Preferences</h3>
        <p className="mt-1 text-sm text-gray-500">Choose the types of content you'd like to receive via email</p>

        <div className="mt-4 space-y-4">
          {[
            { id: 'relationshipTips', label: 'Relationship Tips & Advice' },
            { id: 'activityReminders', label: 'Activity Reminders' },
            { id: 'progressReports', label: 'Progress Reports' },
            { id: 'newFeatures', label: 'New Features & Updates' },
          ].map(({ id, label }) => (
            <label key={id} className="flex items-center">
              <input
                type="checkbox"
                {...register(`emailTypes.${id as keyof NotificationSettings['emailTypes']}`)}
                className="rounded border-gray-300 text-rose-600 shadow-sm focus:border-rose-500 focus:ring-rose-500"
              />
              <span className="ml-2 text-sm text-gray-600">{label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Save Button */}
      <div className="flex items-center justify-end space-x-4">
        {saveSuccess && (
          <div className="flex items-center text-green-600">
            <CheckCircle className="h-5 w-5 mr-2" />
            <span>Settings saved successfully</span>
          </div>
        )}
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
        >
          Save Preferences
        </button>
      </div>
    </form>
  );
}