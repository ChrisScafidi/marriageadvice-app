import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from '../components/payment/PaymentForm';
import { useSubscription } from '../contexts/SubscriptionContext';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export default function PaymentPage() {
  const navigate = useNavigate();
  const { selectedPlan } = useSubscription();
  const [error, setError] = useState<string | null>(null);

  // Default to Premium plan amount if no plan is selected
  const amount = selectedPlan?.price || 1900; // $19.00 in cents

  const appearance = {
    theme: 'stripe',
    variables: {
      colorPrimary: '#e11d48',
      colorBackground: '#ffffff',
      colorText: '#1f2937',
    },
  };

  const options = {
    mode: 'payment' as const,
    amount: amount,
    currency: 'usd',
    appearance,
  };

  if (!amount) {
    navigate('/pricing');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Complete your subscription
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          You're subscribing to the {selectedPlan?.name || 'Premium'} plan
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}
          
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-900">Amount</span>
              <span className="text-sm text-gray-900">${(amount / 100).toFixed(2)}/month</span>
            </div>

            <Elements stripe={stripePromise} options={options}>
              <PaymentForm onError={setError} />
            </Elements>
          </div>
        </div>
      </div>
    </div>
  );
}