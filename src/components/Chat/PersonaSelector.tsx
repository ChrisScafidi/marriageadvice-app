import React from 'react';
import { Persona } from '../../types/persona';
import PersonaAvatar from '../HowItWorks/PersonaAvatar';

interface PersonaSelectorProps {
  personas: Persona[];
  selectedPersonaId: string;
  onSelectPersona: (personaId: string) => void;
  disabled?: boolean;
}

export default function PersonaSelector({
  personas,
  selectedPersonaId,
  onSelectPersona,
  disabled = false
}: PersonaSelectorProps) {
  const getPersonaType = (personaId: string): 'empathetic' | 'tough' | 'wise' => {
    switch (personaId) {
      case 'empathetic-listener':
        return 'empathetic';
      case 'tough-love-coach':
        return 'tough';
      case 'wise-mentor':
        return 'wise';
      default:
        return 'empathetic';
    }
  };

  return (
    <div className="p-4 bg-white border-b border-gray-200">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Choose your AI Advisor
      </label>
      <div className="grid grid-cols-3 gap-2">
        {personas.map((persona) => (
          <button
            key={persona.id}
            onClick={() => onSelectPersona(persona.id)}
            disabled={disabled}
            className={`p-4 rounded-lg flex flex-col items-center text-center transition-colors ${
              selectedPersonaId === persona.id
                ? 'bg-rose-50 border-2 border-rose-500'
                : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'
            } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            <PersonaAvatar type={getPersonaType(persona.id)} size="sm" />
            <span className="text-sm font-medium mt-2">{persona.name}</span>
            <span className="text-xs mt-1 text-gray-500">{persona.description}</span>
          </button>
        ))}
      </div>
    </div>
  );
}