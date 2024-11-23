import React, { useState, useEffect } from 'react';
import { Save, RotateCcw } from 'lucide-react';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../../../lib/firebase';
import { Persona, DEFAULT_PERSONAS } from '../../../types/persona';

interface PromptVersion {
  id: string;
  name: string;
  content: string;
  personaId: string;
  createdAt: string;
}

export default function BasePromptEditor() {
  const [personas] = useState<Persona[]>(DEFAULT_PERSONAS);
  const [selectedPersona, setSelectedPersona] = useState<string>(DEFAULT_PERSONAS[0].id);
  const [prompt, setPrompt] = useState('');
  const [versionName, setVersionName] = useState('');
  const [history, setHistory] = useState<PromptVersion[]>([]);
  const [currentVersion, setCurrentVersion] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    // Load current base prompt and history for selected persona
    const loadBasePrompt = async () => {
      try {
        const docRef = doc(db, 'basePrompts', selectedPersona);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const data = docSnap.data();
          setPrompt(data.currentPrompt || '');
          setHistory(data.history || []);
          setCurrentVersion(data.history ? data.history.length : 0);
        } else {
          // If no existing prompt, use the default from persona
          const defaultPersona = personas.find(p => p.id === selectedPersona);
          if (defaultPersona) {
            setPrompt(defaultPersona.basePrompt);
            setHistory([]);
            setCurrentVersion(0);
          }
        }
      } catch (error) {
        console.error('Error loading base prompt:', error);
      }
    };

    loadBasePrompt();
  }, [selectedPersona, personas]);

  const handleSave = async () => {
    if (!prompt.trim() || !versionName.trim()) {
      setSaveStatus('error');
      return;
    }

    setIsSaving(true);
    setSaveStatus('idle');

    try {
      const newVersion: PromptVersion = {
        id: Date.now().toString(),
        name: versionName.trim(),
        content: prompt.trim(),
        personaId: selectedPersona,
        createdAt: new Date().toISOString()
      };

      const newHistory = [...history, newVersion];
      
      await setDoc(doc(db, 'basePrompts', selectedPersona), {
        currentPrompt: prompt.trim(),
        history: newHistory,
        updatedAt: new Date().toISOString()
      });

      setHistory(newHistory);
      setCurrentVersion(newHistory.length);
      setVersionName(''); // Reset version name after saving
      setSaveStatus('success');

      // Reset success message after 3 seconds
      setTimeout(() => setSaveStatus('idle'), 3000);
    } catch (error) {
      console.error('Error saving base prompt:', error);
      setSaveStatus('error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleUndo = () => {
    if (currentVersion > 0) {
      const previousVersion = history[currentVersion - 1];
      setPrompt(previousVersion.content);
      setCurrentVersion(currentVersion - 1);
    }
  };

  const handlePersonaChange = (personaId: string) => {
    setSelectedPersona(personaId);
    setSaveStatus('idle');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">Base Prompt Editor</h2>
        <div className="flex space-x-2">
          <button
            onClick={handleUndo}
            disabled={currentVersion === 0 || isSaving}
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Undo
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving || !prompt.trim() || !versionName.trim()}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-rose-600 hover:bg-rose-700 disabled:opacity-50"
          >
            <Save className="h-4 w-4 mr-2" />
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Persona
          </label>
          <select
            value={selectedPersona}
            onChange={(e) => handlePersonaChange(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
          >
            {personas.map((persona) => (
              <option key={persona.id} value={persona.id}>
                {persona.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Version Name
          </label>
          <input
            type="text"
            value={versionName}
            onChange={(e) => setVersionName(e.target.value)}
            placeholder="Enter a name for this version"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Base Prompt
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={10}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
            placeholder="Enter the base prompt for the selected persona..."
          />
        </div>
      </div>

      {saveStatus === 'success' && (
        <div className="bg-green-50 text-green-800 p-4 rounded-md">
          Base prompt saved successfully!
        </div>
      )}

      {saveStatus === 'error' && (
        <div className="bg-red-50 text-red-800 p-4 rounded-md">
          Failed to save base prompt. Please ensure all fields are filled out.
        </div>
      )}

      <div className="mt-6">
        <h3 className="text-sm font-medium text-gray-900 mb-2">Version History</h3>
        <div className="space-y-2">
          {history.map((version, index) => (
            <div
              key={version.id}
              className="flex items-center justify-between p-3 bg-white rounded-md border border-gray-200"
            >
              <div className="flex-1">
                <div className="flex items-center">
                  <span className="text-sm font-medium text-gray-900 mr-2">
                    {version.name}
                  </span>
                  {index === currentVersion && (
                    <span className="px-2 py-1 text-xs font-medium text-green-800 bg-green-100 rounded-full">
                      Current
                    </span>
                  )}
                </div>
                <span className="text-xs text-gray-500">
                  {new Date(version.createdAt).toLocaleString()}
                </span>
              </div>
              <button
                onClick={() => {
                  setPrompt(version.content);
                  setCurrentVersion(index);
                }}
                className="text-sm text-rose-600 hover:text-rose-500"
              >
                Restore
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}