import React from 'react';
import { Check } from 'lucide-react';

interface Plan {
  id: string;
  name: string;
  price: number;
  interval: string;
  features: string[];
  popular?: boolean;
}

interface PlanComparisonProps {
  plans: Plan[];
  selectedPlan: Plan;
  onSelect: (plan: Plan) => void;
}

export default function PlanComparison({ plans, selectedPlan, onSelect }: PlanComparisonProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`rounded-lg shadow-sm divide-y divide-gray-200 ${
              plan.popular
                ? 'border-2 border-rose-500 relative'
                : 'border border-gray-200'
            }`}
          >
            {plan.popular && (
              <div className="absolute top-0 right-0 -translate-y-1/2 px-4 py-1 bg-rose-500 text-white text-sm font-medium rounded-full">
                Most Popular
              </div>
            )}

            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-900">{plan.name}</h2>
              <p className="mt-4">
                <span className="text-4xl font-extrabold text-gray-900">
                  ${plan.price}
                </span>
                <span className="text-base font-medium text-gray-500">
                  /{plan.interval}
                </span>
              </p>

              <button
                onClick={() => onSelect(plan)}
                className={`mt-8 block w-full py-3 px-6 border rounded-md text-center text-sm font-medium ${
                  selectedPlan.id === plan.id
                    ? 'bg-rose-600 border-transparent text-white hover:bg-rose-700'
                    : 'bg-white border-gray-300 text-gray-900 hover:bg-gray-50'
                }`}
              >
                {plan.price === 0 ? 'Get Started' : 'Select Plan'}
              </button>
            </div>

            <div className="pt-6 pb-8 px-6">
              <h3 className="text-sm font-medium text-gray-900 tracking-wide uppercase">
                What's included
              </h3>
              <ul className="mt-6 space-y-4">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex space-x-3">
                    <Check className="flex-shrink-0 h-5 w-5 text-green-500" />
                    <span className="text-sm text-gray-500">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}