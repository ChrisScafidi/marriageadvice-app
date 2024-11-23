import React from 'react';
import { useForm } from 'react-hook-form';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface IntakeFormData {
  name: string;
  gender: string;
  relationshipStatus: string;
  primaryGoal: string;
  partnerCommitment: string;
  challengeAreas: string[];
  interactionStyle: string;
}

export default function IntakeForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<IntakeFormData>();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data: IntakeFormData) => {
    try {
      if (!currentUser) return;
      
      await setDoc(doc(db, 'userProfiles', currentUser.uid), {
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });

      navigate('/chat');
    } catch (error) {
      console.error('Error saving intake form:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Help Us Personalize Your Experience</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            {...register('name', { required: 'Name is required' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
          />
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
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
          {errors.gender && <p className="mt-1 text-sm text-red-600">{errors.gender.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Relationship Status</label>
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
          {errors.relationshipStatus && <p className="mt-1 text-sm text-red-600">{errors.relationshipStatus.message}</p>}
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
          {errors.primaryGoal && <p className="mt-1 text-sm text-red-600">{errors.primaryGoal.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Is your partner committed to improving the relationship?</label>
          <select
            {...register('partnerCommitment', { required: 'Please select your partner\'s commitment level' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
          >
            <option value="">Select answer...</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
            <option value="unsure">Unsure</option>
          </select>
          {errors.partnerCommitment && <p className="mt-1 text-sm text-red-600">{errors.partnerCommitment.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Preferred Interaction Style</label>
          <select
            {...register('interactionStyle', { required: 'Please select your preferred interaction style' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
          >
            <option value="">Select style...</option>
            <option value="direct">Direct advice</option>
            <option value="supportive">Supportive guidance</option>
            <option value="practical">Practical action steps</option>
          </select>
          {errors.interactionStyle && <p className="mt-1 text-sm text-red-600">{errors.interactionStyle.message}</p>}
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
        >
          Complete Profile
        </button>
      </form>
    </div>
  );
}