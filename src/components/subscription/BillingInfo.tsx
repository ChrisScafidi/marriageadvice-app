import React, { useState } from 'react';
import { CreditCard, PaypalIcon } from 'lucide-react';

export default function BillingInfo() {
  const [isEditing, setIsEditing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Billing Information</h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="text-sm text-rose-600 hover:text-rose-500"
        >
          {isEditing ? 'Cancel' : 'Update'}
        </button>
      </div>

      {isEditing ? (
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Payment Method</label>
            <div className="mt-2 space-y-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="payment-method"
                  value="card"
                  checked={paymentMethod === 'card'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="h-4 w-4 text-rose-600 focus:ring-rose-500 border-gray-300"
                />
                <span className="ml-3 flex items-center">
                  <CreditCard className="h-5 w-5 text-gray-400" />
                  <span className="ml-2">Credit Card</span>
                </span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="payment-method"
                  value="paypal"
                  checked={paymentMethod === 'paypal'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="h-4 w-4 text-rose-600 focus:ring-rose-500 border-gray-300"
                />
                <span className="ml-3">PayPal</span>
              </label>
            </div>
          </div>

          {paymentMethod === 'card' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">Card Number</label>
                <input
                  type="text"
                  placeholder="•••• •••• •••• ••••"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">CVC</label>
                  <input
                    type="text"
                    placeholder="•••"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
                  />
                </div>
              </div>
            </>
          )}

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-rose-600 border border-transparent rounded-md hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
            >
              Save Changes
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <CreditCard className="h-5 w-5 text-gray-400" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">Visa ending in 4242</p>
                <p className="text-sm text-gray-500">Expires 12/24</p>
              </div>
            </div>
            <span className="px-2 py-1 text-xs font-medium text-green-800 bg-green-100 rounded-full">
              Primary
            </span>
          </div>
          <p className="text-sm text-gray-500">
            Your card information is securely stored and processed by our payment provider.
          </p>
        </div>
      )}
    </div>
  );
}