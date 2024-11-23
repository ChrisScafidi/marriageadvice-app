import React, { useState } from 'react';
import BasePromptEditor from '../../components/admin/chatbot/BasePromptEditor';
import QuickReplyManager from '../../components/admin/chatbot/QuickReplyManager';
import ResponseLibrary from '../../components/admin/chatbot/ResponseLibrary';
import ResourceManager from '../../components/admin/chatbot/ResourceManager';
import ChatbotAnalytics from '../../components/admin/chatbot/ChatbotAnalytics';
import ToneSettings from '../../components/admin/chatbot/ToneSettings';

export default function ChatbotSettingsPage() {
  const [activeTab, setActiveTab] = useState('base-prompt');

  const tabs = [
    { id: 'base-prompt', label: 'Base Prompt' },
    { id: 'quick-replies', label: 'Quick Replies' },
    { id: 'responses', label: 'Response Library' },
    { id: 'resources', label: 'Resources' },
    { id: 'tone', label: 'Tone Settings' },
    { id: 'analytics', label: 'Analytics' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'base-prompt':
        return <BasePromptEditor />;
      case 'quick-replies':
        return <QuickReplyManager />;
      case 'responses':
        return <ResponseLibrary />;
      case 'resources':
        return <ResourceManager />;
      case 'tone':
        return <ToneSettings />;
      case 'analytics':
        return <ChatbotAnalytics />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Chatbot Settings</h1>

        {/* Tabs */}
        <div className="bg-white shadow rounded-lg">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6" aria-label="Tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                    ${activeTab === tab.id
                      ? 'border-rose-500 text-rose-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }
                  `}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}