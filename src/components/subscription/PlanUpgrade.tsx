import React from 'react';
import { X, Check } from 'lucide-react';

interface PlanUpgradeProps {
  onClose: () => void;
}

const plans = [
  {
    name: 'Free',
    price: 0,
    features: [
      'Basic relationship advice',
      '5 AI conversations per month',
      'Access to basic resources',
      'Email support',
    ],
    current: false,
  },
  {
    name: 'Premium',
    price: 19,
    features: [
      'Advanced relationship guidance',
      'Unlimited AI conversations',
      'Relationship progress tracking',
      'Priority support',
      'Personalized action plans',
      'Access to all resources',
    ],
    current: true,
  },
  {
    name: 'Couples',
    price: 29,
    features: [
      'Everything in Premium',
      'Joint account access',
      'Couple\'s assessment tools',
      'Relationship milestone tracking',
      'Monthly relationship check-ins',
      'Video consultation support',
    ],
    current: false,
  },
];

export default function PlanUpgrade({ onClose }: PlanUpgradeProps) {
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Compare Plans</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-lg border ${
                  plan.current
                    ? 'border-rose-500 shadow-lg'
                    : 'border-gray-200'
                } p-6 relative`}
              >
                {plan.current && (
                  <div className="absolute top-0 right-0 -translate-y-1/2 px-3 py-1 bg-rose-500 text-white text-sm font-medium rounded-full">
                    Current Plan
                  </div>
                )}

                <h3 className="text-lg font-semibold text-gray-900">{plan.name}</h3>
                <p className="mt-2">
                  <span className="text-3xl font-bold text-gray-900">
                    ${plan.price}
                  </span>
                  <span className="text-gray-500">/month</span>
                </p>

                <ul className="mt-6 space-y-4">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="ml-3 text-sm text-gray-500">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`mt-8 w-full py-2 px-4 rounded-md text-sm font-medium ${
                    plan.current
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-rose-600 text-white hover:bg-rose-700'
                  }`}
                  disabled={plan.current}
                >
                  {plan.current ? 'Current Plan' : 'Switch Plan'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}