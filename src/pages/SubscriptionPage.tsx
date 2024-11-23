import React, { useState } from 'react';
import { CreditCard, Calendar, Clock, Download, ChevronRight } from 'lucide-react';
import BillingInfo from '../components/subscription/BillingInfo';
import CurrentPlan from '../components/subscription/CurrentPlan';
import PaymentHistory from '../components/subscription/PaymentHistory';
import PlanUpgrade from '../components/subscription/PlanUpgrade';

export default function SubscriptionPage() {
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Subscription Management</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your subscription, billing information, and view payment history
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - 2 columns */}
          <div className="lg:col-span-2 space-y-8">
            <CurrentPlan onUpgrade={() => setShowUpgradeModal(true)} />
            <BillingInfo />
            <PaymentHistory />
          </div>

          {/* Sidebar - Plan Summary */}
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Plan Summary</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <CreditCard className="h-5 w-5 text-gray-400" />
                    <span className="ml-2 text-sm text-gray-600">Current Plan</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">Premium</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-gray-400" />
                    <span className="ml-2 text-sm text-gray-600">Next Billing</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">Mar 15, 2024</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-gray-400" />
                    <span className="ml-2 text-sm text-gray-600">Billing Cycle</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">Monthly</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-900 mb-2">Need Help?</h3>
                <div className="space-y-3">
                  <a
                    href="/billing-faq"
                    className="flex items-center justify-between text-sm text-gray-600 hover:text-gray-900"
                  >
                    Billing FAQ
                    <ChevronRight className="h-4 w-4" />
                  </a>
                  <a
                    href="/contact-support"
                    className="flex items-center justify-between text-sm text-gray-600 hover:text-gray-900"
                  >
                    Contact Support
                    <ChevronRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {showUpgradeModal && (
          <PlanUpgrade onClose={() => setShowUpgradeModal(false)} />
        )}
      </div>
    </div>
  );
}