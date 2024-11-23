import React from 'react';
import { Persona } from '../../types/persona';
import { Heart, Shield, Star, Zap, Info } from 'lucide-react';

interface PersonaInfoProps {
  persona: Persona;
}

const iconMap: Record<string, React.ElementType> = {
  heart: Heart,
  shield: Shield,
  star: Star,
  zap: Zap,
};

export default function PersonaInfo({ persona }: PersonaInfoProps) {
  const Icon = iconMap[persona.icon] || Heart;

  return (
    <div className="flex items-center gap-2 px-3 py-2 bg-rose-50 rounded-lg">
      <Icon className="h-4 w-4 text-rose-500" />
      <div className="flex-1">
        <p className="text-sm font-medium text-rose-900">{persona.name}</p>
        <p className="text-xs text-rose-700">{persona.description}</p>
      </div>
      <button
        className="p-1 hover:bg-rose-100 rounded-full transition-colors"
        title="Learn more about this persona"
      >
        <Info className="h-4 w-4 text-rose-500" />
      </button>
    </div>
  );
}