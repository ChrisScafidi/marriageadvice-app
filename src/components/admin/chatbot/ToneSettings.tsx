import React, { useState } from 'react';
import { Save } from 'lucide-react';

interface ToneSetting {
  name: string;
  value: number;
  description: string;
}

export default function ToneSettings() {
  const [settings, setSettings] = useState<ToneSetting[]>([
    {
      name: 'Empathy',
      value: 75,
      description: 'How emotionally understanding the chatbot should be'
    },
    {
      name: 'Directness',
      value: 50,
      description: 'How straightforward the chatbot\'s responses should be'
    },
    {
      name: 'Formality',
      value: 60,
      description: 'The level of professional tone in responses'
    },
    {
      name: 'Encouragement',
      value: 80,
      description: 'How much positive reinforcement to provide'
    }
  ]);

  const handleChange = (index: number, value: number) => {
    const newSettings = [...settings];
    newSettings[index].value = value;
    setSettings(newSettings);
  };

  const handleSave = () => {
    // Save settings to database
    console.log('Saving settings:', settings);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">Tone Settings</h2>
        <button
          onClick={handleSave}
          className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-rose-600 hover:bg-rose-700"
        >
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </button>
      </div>

      <div className="space-y-6">
        {settings.map((setting, index) => (
          <div key={setting.name} className="space-y-2">
            <div className="flex justify-between">
              <label className="block text-sm font-medium text-gray-700">
                {setting.name}
              </label>
              <span className="text-sm text-gray-500">{setting.value}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={setting.value}
              onChange={(e) => handleChange(index, parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer"
            />
            <p className="text-sm text-gray-500">{setting.description}</p>
          </div>
        ))}
      </div>

      <div className="bg-gray-50 rounded-lg p-4 mt-6">
        <h3 className="text-sm font-medium text-gray-900 mb-2">Message Frequency</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700">Daily Message Limit</label>
            <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500">
              <option>No limit</option>
              <option>5 messages</option>
              <option>10 messages</option>
              <option>20 messages</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-700">Response Delay</label>
            <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500">
              <option>Instant</option>
              <option>1-2 seconds</option>
              <option>2-3 seconds</option>
              <option>3-5 seconds</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}