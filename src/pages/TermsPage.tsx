import React from 'react';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms of Service</h1>

          <div className="prose prose-rose max-w-none">
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
              <p className="text-gray-600 mb-4">
                Welcome to MarriageAdvice.AI. By accessing or using our service, you agree to be bound by these Terms of Service ("Terms"). Please read them carefully.
              </p>
              <p className="text-gray-600">
                These Terms govern your access to and use of MarriageAdvice.AI's website, services, and applications (the "Service"). Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">2. User Account Responsibilities</h2>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Account Creation</h3>
              <p className="text-gray-600 mb-4">
                To use our Service, you must be at least 18 years old and provide accurate, complete, and current information. You are responsible for maintaining the confidentiality of your account and password.
              </p>
              
              <h3 className="text-lg font-medium text-gray-900 mb-2">Prohibited Activities</h3>
              <p className="text-gray-600 mb-4">
                You agree not to:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-4">
                <li>Use the Service for any illegal purpose or in violation of any laws</li>
                <li>Harass, abuse, or harm another person</li>
                <li>Share inappropriate or harmful content</li>
                <li>Attempt to gain unauthorized access to the Service</li>
                <li>Interfere with or disrupt the Service</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">3. Subscription and Payment Terms</h2>
              <p className="text-gray-600 mb-4">
                Some aspects of the Service are provided for a fee. You agree to pay all fees in accordance with the pricing and payment terms presented to you for the Service.
              </p>
              
              <h3 className="text-lg font-medium text-gray-900 mb-2">Billing and Cancellation</h3>
              <p className="text-gray-600 mb-4">
                Subscription fees are billed in advance on a monthly basis. You may cancel your subscription at any time, and you will continue to have access to the Service through the end of your billing period.
              </p>
              
              <h3 className="text-lg font-medium text-gray-900 mb-2">Refunds</h3>
              <p className="text-gray-600 mb-4">
                Refunds are handled on a case-by-case basis and are issued at the discretion of MarriageAdvice.AI.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Disclaimer and Limitations</h2>
              <p className="text-gray-600 mb-4">
                The Service is provided "as is" without warranty of any kind. MarriageAdvice.AI is not a substitute for professional counseling or therapy.
              </p>
              <p className="text-gray-600 mb-4">
                In no event shall MarriageAdvice.AI be liable for any indirect, incidental, special, consequential, or punitive damages.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Changes to Terms</h2>
              <p className="text-gray-600 mb-4">
                We reserve the right to modify these Terms at any time. We will notify you of any changes by posting the new Terms on this page and updating the "Last Updated" date.
              </p>
              <p className="text-gray-600">
                Your continued use of the Service after any changes constitutes your acceptance of the new Terms.
              </p>
            </section>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Last Updated: {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}