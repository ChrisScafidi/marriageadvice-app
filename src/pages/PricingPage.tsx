import React from 'react';
import { Check, Crown } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const tiers = [
  {
    name: 'Free',
    price: 0,
    description: 'Perfect for trying out our service',
    features: [
      'Basic relationship advice',
      '5 AI conversations per month',
      'Access to basic resources',
      'Email support'
    ],
    cta: 'Start Free',
    mostPopular: false
  },
  {
    name: 'Premium',
    price: 19,
    description: 'Everything you need for a better relationship',
    features: [
      'Advanced relationship guidance',
      'Unlimited AI conversations',
      'Relationship progress tracking',
      'Priority support',
      'Personalized action plans',
      'Access to all resources'
    ],
    cta: 'Start Premium',
    mostPopular: true
  },
  {
    name: 'Couples',
    price: 29,
    description: 'Perfect for couples serious about growth',
    features: [
      'Everything in Premium',
      'Joint account access',
      'Couple\'s assessment tools',
      'Relationship milestone tracking',
      'Monthly relationship check-ins',
      'Video consultation support'
    ],
    cta: 'Start Together',
    mostPopular: false,
    bestValue: true
  }
];

export default function PricingPage() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handlePlanSelect = (price: number) => {
    if (!currentUser) {
      navigate('/signin');
      return;
    }
    if (price === 0) {
      navigate('/dashboard');
    } else {
      navigate('/payment');
    }
  };

  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:flex-col sm:align-center">
          <h1 className="text-5xl font-extrabold text-gray-900 sm:text-center">Pricing Plans</h1>
          <p className="mt-5 text-xl text-gray-500 sm:text-center">
            Choose the perfect plan for your relationship journey
          </p>
        </div>
        <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0 xl:grid-cols-3">
          {tiers.map((tier) => (
            <div 
              key={tier.name} 
              className={`rounded-lg shadow-lg divide-y divide-gray-200 ${
                tier.mostPopular ? 'border-2 border-rose-500 relative' : tier.bestValue ? 'border-2 border-purple-500 relative' : 'border border-gray-200'
              }`}
            >
              {tier.mostPopular && (
                <span className="absolute top-0 right-6 -translate-y-1/2 transform rounded-full bg-rose-500 px-4 py-1 text-sm font-semibold text-white">
                  Most popular
                </span>
              )}
              {tier.bestValue && (
                <span className="absolute top-0 right-6 -translate-y-1/2 transform rounded-full bg-purple-500 px-4 py-1 text-sm font-semibold text-white">
                  Best Value
                </span>
              )}
              <div className="p-6">
                <h2 className="text-2xl leading-6 font-semibold text-gray-900">{tier.name}</h2>
                <p className="mt-4 text-sm text-gray-500">{tier.description}</p>
                <p className="mt-8">
                  <span className="text-4xl font-extrabold text-gray-900">${tier.price}</span>
                  <span className="text-base font-medium text-gray-500">/month</span>
                </p>
                <button
                  onClick={() => handlePlanSelect(tier.price)}
                  className={`mt-8 block w-full rounded-md border border-transparent px-6 py-3 text-center text-sm font-medium ${
                    tier.mostPopular
                      ? 'bg-rose-600 text-white hover:bg-rose-700'
                      : tier.bestValue
                      ? 'bg-purple-600 text-white hover:bg-purple-700'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  } transition-colors duration-200`}
                >
                  {tier.cta}
                </button>
              </div>
              <div className="px-6 pt-6 pb-8">
                <h3 className="text-xs font-medium text-gray-900 tracking-wide uppercase">What's included</h3>
                <ul className="mt-6 space-y-4">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex space-x-3">
                      <Check className={`flex-shrink-0 h-5 w-5 ${
                        tier.mostPopular ? 'text-rose-500' : tier.bestValue ? 'text-purple-500' : 'text-green-500'
                      }`} />
                      <span className="text-sm text-gray-500">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}