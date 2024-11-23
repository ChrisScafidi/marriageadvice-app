import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../contexts/AuthContext';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { AlertCircle, CheckCircle } from 'lucide-react';

interface ProfileFormData {
  name: string;
  gender: string;
  relationshipStatus: string;
  primaryGoal: string;
  challengeAreas: string[];
}

export default function ProfileSection() {
  const { currentUser } = useAuth();
  const { register, handleSubmit, reset, formState: { errors, isDirty } } = useForm<ProfileFormData>();
  const [loading, setLoading] = useState(true);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      if (!currentUser) return;

      try {
        const profileDoc = await getDoc(doc(db, 'userProfiles', currentUser.uid));
        if (profileDoc.exists()) {
          reset(profileDoc.data() as ProfileFormData);
        }
      } catch (error) {
        console.error('Error loading profile:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [currentUser, reset]);

  const onSubmit = async (data: ProfileFormData) => {
    if (!currentUser) return;
    
    try {
      const profileRef = doc(db, 'userProfiles', currentUser.uid);
      const profileDoc = await getDoc(profileRef);

      if (profileDoc.exists()) {
        await updateDoc(profileRef, {
          ...data,
          updatedAt: new Date().toISOString()
        });
      } else {
        await setDoc(profileRef, {
          ...data,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        });
      }

      setSubmitStatus({
        type: 'success',
        message: 'Profile updated successfully!'
      });

      // Clear success message after 3 seconds
      setTimeout(() => setSubmitStatus(null), 3000);
    } catch (error) {
      console.error('Error updating profile:', error);
      setSubmitStatus({
        type: 'error',
        message: 'Failed to update profile. Please try again.'
      });
    }
  };

  if (loading) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="h-10 bg-gray-200 rounded"></div>
        <div className="h-10 bg-gray-200 rounded"></div>
        <div className="h-10 bg-gray-200 rounded"></div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {submitStatus && (
        <div className={`p-4 rounded-lg ${
          submitStatus.type === 'success' ? 'bg-green-50' : 'bg-red-50'
        }`}>
          <div className="flex">
            {submitStatus.type === 'success' ? (
              <CheckCircle className="h-5 w-5 text-green-400" />
            ) : (
              <AlertCircle className="h-5 w-5 text-red-400" />
            )}
            <div className="ml-3">
              <p className={`text-sm font-medium ${
                submitStatus.type === 'success' ? 'text-green-800' : 'text-red-800'
              }`}>
                {submitStatus.message}
              </p>
            </div>
          </div>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          {...register('name', { required: 'Name is required' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Gender</label>
        <select
          {...register('gender', { required: 'Please select your gender' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
        >
          <option value="">Select gender...</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
          <option value="prefer-not-to-say">Prefer not to say</option>
        </select>
        {errors.gender && (
          <p className="mt-1 text-sm text-red-600">{errors.gender.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Relationship Status
        </label>
        <select
          {...register('relationshipStatus', { required: 'Please select your relationship status' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
        >
          <option value="">Select status...</option>
          <option value="single">Single</option>
          <option value="dating">Dating</option>
          <option value="married">Married</option>
          <option value="separated">Separated</option>
          <option value="divorced">Divorced</option>
        </select>
        {errors.relationshipStatus && (
          <p className="mt-1 text-sm text-red-600">{errors.relationshipStatus.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Primary Goal</label>
        <select
          {...register('primaryGoal', { required: 'Please select your primary goal' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
        >
          <option value="">Select goal...</option>
          <option value="improve-communication">Improve communication</option>
          <option value="rebuild-trust">Rebuild trust</option>
          <option value="enhance-intimacy">Enhance intimacy</option>
          <option value="navigate-separation">Navigate separation/divorce</option>
          <option value="self-improvement">General self-improvement</option>
        </select>
        {errors.primaryGoal && (
          <p className="mt-1 text-sm text-red-600">{errors.primaryGoal.message}</p>
        )}
      </div>

      <div className="pt-5">
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={!isDirty || loading}
            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </form>
  );
}