import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';

export default function DeleteAccountSection() {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleDeleteAccount = async () => {
    if (!confirmDelete) {
      alert('Please confirm that you want to delete your account');
      return;
    }

    try {
      setLoading(true);
      // Implement account deletion logic here
      await currentUser?.delete();
      navigate('/');
    } catch (error) {
      console.error('Error deleting account:', error);
      alert('Failed to delete account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-red-50 rounded-lg p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <AlertTriangle className="h-5 w-5 text-red-400" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">
              Delete Account
            </h3>
            <div className="mt-2 text-sm text-red-700">
              <p>
                Once you delete your account, there is no going back. Please be
                certain.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h4 className="text-lg font-medium text-gray-900">
            What happens when you delete your account:
          </h4>
          <ul className="mt-4 list-disc list-inside text-sm text-gray-600 space-y-2">
            <li>Your profile and personal information will be permanently deleted</li>
            <li>All your conversation history will be erased</li>
            <li>Your subscription will be canceled</li>
            <li>This action cannot be undone</li>
          </ul>
        </div>

        <div className="pt-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={confirmDelete}
              onChange={(e) => setConfirmDelete(e.target.checked)}
              className="rounded border-gray-300 text-red-600 shadow-sm focus:border-red-500 focus:ring-red-500"
            />
            <span className="ml-2 text-sm text-gray-600">
              I understand that this action is permanent and cannot be undone
            </span>
          </label>
        </div>

        <div className="pt-4">
          <button
            onClick={handleDeleteAccount}
            disabled={!confirmDelete || loading}
            className="inline-flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
          >
            {loading ? 'Deleting...' : 'Delete Account'}
          </button>
        </div>
      </div>
    </div>
  );
}