import React, { useState } from 'react';
import { Download, ChevronDown, ChevronUp } from 'lucide-react';
import { format } from 'date-fns';

const payments = [
  {
    id: '1',
    date: new Date('2024-02-15'),
    amount: 19.00,
    status: 'Completed',
    description: 'Premium Plan - Monthly',
  },
  {
    id: '2',
    date: new Date('2024-01-15'),
    amount: 19.00,
    status: 'Completed',
    description: 'Premium Plan - Monthly',
  },
  {
    id: '3',
    date: new Date('2023-12-15'),
    amount: 19.00,
    status: 'Completed',
    description: 'Premium Plan - Monthly',
  },
];

export default function PaymentHistory() {
  const [isExpanded, setIsExpanded] = useState(false);

  const displayedPayments = isExpanded ? payments : payments.slice(0, 2);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Payment History</h2>

      <div className="space-y-4">
        {displayedPayments.map((payment) => (
          <div
            key={payment.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
          >
            <div>
              <p className="text-sm font-medium text-gray-900">{payment.description}</p>
              <p className="text-sm text-gray-500">
                {format(payment.date, 'MMM d, yyyy')}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  ${payment.amount.toFixed(2)}
                </p>
                <p className="text-xs text-green-600">{payment.status}</p>
              </div>
              <button
                className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
                title="Download Receipt"
              >
                <Download className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}

        {payments.length > 2 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center justify-center w-full py-2 text-sm text-gray-600 hover:text-gray-900"
          >
            {isExpanded ? (
              <>
                Show Less <ChevronUp className="h-4 w-4 ml-1" />
              </>
            ) : (
              <>
                Show More <ChevronDown className="h-4 w-4 ml-1" />
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}