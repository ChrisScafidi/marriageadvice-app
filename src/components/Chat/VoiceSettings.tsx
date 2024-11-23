import React, { useState, useEffect } from 'react';
import { X, Volume2, VolumeX, PlayCircle, Settings2 } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

interface VoiceSettingsProps {
  settings: {
    rate: number;
    pitch: number;
    volume: number;
    style: 'empathetic' | 'motivational' | 'neutral';
    gender: 'female' | 'male' | 'neutral';
  };
  selectedVoice: SpeechSynthesisVoice | null;
  onSettingsChange: (settings: { 
    rate: number; 
    pitch: number; 
    volume: number;
    style: 'empathetic' | 'motivational' | 'neutral';
    gender: 'female' | 'male' | 'neutral';
  }) => void;
  onVoiceChange: (voice: SpeechSynthesisVoice) => void;
  onClose: () => void;
}

const VOICE_STYLES = [
  { 
    id: 'empathetic',
    name: 'Empathetic & Warm',
    description: 'Gentle and understanding tone for emotional support',
    pitch: 1.1,
    rate: 0.9
  },
  {
    id: 'motivational',
    name: 'Motivational & Energetic',
    description: 'Dynamic and encouraging tone for inspiration',
    pitch: 1.2,
    rate: 1.1
  },
  {
    id: 'neutral',
    name: 'Calm & Balanced',
    description: 'Clear and professional tone for general advice',
    pitch: 1.0,
    rate: 1.0
  }
];

const PREFERRED_VOICES = [
  { name: 'Google UK English Female', lang: 'en-GB', gender: 'female', style: 'empathetic' },
  { name: 'Microsoft Libby Online (Natural)', lang: 'en-US', gender: 'female', style: 'empathetic' },
  { name: 'Samantha', lang: 'en-US', gender: 'female', style: 'motivational' },
  { name: 'Alex', lang: 'en-US', gender: 'male', style: 'neutral' },
  { name: 'Karen', lang: 'en-AU', gender: 'female', style: 'empathetic' },
  { name: 'Moira', lang: 'en-IE', gender: 'female', style: 'motivational' },
  { name: 'Daniel', lang: 'en-GB', gender: 'male', style: 'neutral' }
];

export default function VoiceSettings({
  settings,
  selectedVoice,
  onSettingsChange,
  onVoiceChange,
  onClose
}: VoiceSettingsProps) {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [localSettings, setLocalSettings] = useState(settings);
  const { theme } = useTheme();
  const synth = window.speechSynthesis;

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = synth.getVoices();
      // Filter and sort voices by preference
      const matchedVoices = [
        ...availableVoices.filter(voice => 
          PREFERRED_VOICES.some(pv => voice.name.includes(pv.name))
        ),
        ...availableVoices.filter(voice => 
          voice.lang.startsWith('en') && 
          !PREFERRED_VOICES.some(pv => voice.name.includes(pv.name))
        )
      ];
      setVoices(matchedVoices);
    };

    loadVoices();
    
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  const handleSettingChange = (setting: keyof typeof settings, value: any) => {
    const newSettings = { ...localSettings, [setting]: value };
    
    // Apply voice style presets
    if (setting === 'style') {
      const style = VOICE_STYLES.find(s => s.id === value);
      if (style) {
        newSettings.pitch = style.pitch;
        newSettings.rate = style.rate;
      }
    }
    
    setLocalSettings(newSettings);
    onSettingsChange(newSettings);
  };

  const handleVoiceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const voice = voices.find(v => v.name === event.target.value);
    if (voice) {
      onVoiceChange(voice);
      // Set gender based on voice selection
      const preferredVoice = PREFERRED_VOICES.find(pv => voice.name.includes(pv.name));
      if (preferredVoice) {
        handleSettingChange('gender', preferredVoice.gender);
      }
    }
  };

  const previewVoice = () => {
    const utterance = new SpeechSynthesisUtterance(
      "Hello! I'm your AI relationship advisor. How can I help you today?"
    );
    utterance.rate = localSettings.rate;
    utterance.pitch = localSettings.pitch;
    utterance.volume = localSettings.volume;
    if (selectedVoice) utterance.voice = selectedVoice;
    synth.speak(utterance);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={`relative ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      } rounded-lg shadow-xl max-w-md w-full mx-4 p-1 bg-gradient-to-r from-rose-500 to-purple-600`}>
        <div className={`${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        } rounded-lg p-6`}>
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <Settings2 className={`h-6 w-6 ${
                theme === 'dark' ? 'text-rose-400' : 'text-rose-500'
              } mr-2`} />
              <h3 className={`text-xl font-bold ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>Voice Settings</h3>
            </div>
            <button
              onClick={onClose}
              className={`${
                theme === 'dark' ? 'text-gray-400 hover:text-gray-300' : 'text-gray-400 hover:text-gray-500'
              }`}
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="space-y-6">
            {/* Voice Style Selection */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>Voice Style</label>
              <div className="space-y-2">
                {VOICE_STYLES.map(style => (
                  <button
                    key={style.id}
                    onClick={() => handleSettingChange('style', style.id)}
                    className={`w-full p-3 rounded-lg text-left ${
                      localSettings.style === style.id
                        ? theme === 'dark'
                          ? 'bg-rose-900 border-rose-700'
                          : 'bg-rose-50 border-rose-200'
                        : theme === 'dark'
                        ? 'bg-gray-700 border-gray-600'
                        : 'bg-white border-gray-200'
                    } border hover:border-rose-300 transition-colors`}
                  >
                    <div className={`font-medium ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>{style.name}</div>
                    <div className={`text-sm ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}>{style.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Voice Selection */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>Voice</label>
              <select
                value={selectedVoice?.name}
                onChange={handleVoiceChange}
                className={`w-full p-2 rounded-lg ${
                  theme === 'dark'
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-200 text-gray-900'
                } border focus:border-rose-500`}
              >
                {voices.map((voice) => (
                  <option key={voice.name} value={voice.name}>
                    {voice.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Advanced Settings */}
            <div className={`${
              theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
            } rounded-lg p-4`}>
              <h4 className={`text-sm font-medium mb-4 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>Fine-tune Voice</h4>
              
              <div className="space-y-4">
                <div>
                  <label className={`block text-sm ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Speed: {localSettings.rate}x
                  </label>
                  <input
                    type="range"
                    min="0.5"
                    max="2"
                    step="0.1"
                    value={localSettings.rate}
                    onChange={(e) => handleSettingChange('rate', parseFloat(e.target.value))}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className={`block text-sm ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Pitch: {localSettings.pitch}
                  </label>
                  <input
                    type="range"
                    min="0.5"
                    max="2"
                    step="0.1"
                    value={localSettings.pitch}
                    onChange={(e) => handleSettingChange('pitch', parseFloat(e.target.value))}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className={`block text-sm ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Volume: {Math.round(localSettings.volume * 100)}%
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={localSettings.volume}
                    onChange={(e) => handleSettingChange('volume', parseFloat(e.target.value))}
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            {/* Preview Button */}
            <button
              onClick={previewVoice}
              className="w-full flex items-center justify-center px-4 py-2 bg-gradient-to-r from-rose-500 to-purple-600 text-white rounded-lg hover:from-rose-600 hover:to-purple-700 transition-colors"
            >
              <PlayCircle className="h-5 w-5 mr-2" />
              Preview Voice
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}