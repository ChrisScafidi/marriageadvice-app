import React from 'react';
import { Heart, Target, Lightbulb } from 'lucide-react';

interface PersonaAvatarProps {
  type: 'empathetic' | 'tough' | 'wise';
  size?: 'sm' | 'md' | 'lg';
}

export default function PersonaAvatar({ type, size = 'md' }: PersonaAvatarProps) {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-20 h-20'
  };

  const getPersonaStyles = () => {
    switch (type) {
      case 'empathetic':
        return {
          bg: 'bg-gradient-to-br from-rose-500 to-pink-600',
          icon: Heart,
          glow: 'shadow-rose-500/50'
        };
      case 'tough':
        return {
          bg: 'bg-gradient-to-br from-purple-500 to-indigo-600',
          icon: Target,
          glow: 'shadow-purple-500/50'
        };
      case 'wise':
        return {
          bg: 'bg-gradient-to-br from-blue-500 to-cyan-600',
          icon: Lightbulb,
          glow: 'shadow-blue-500/50'
        };
    }
  };

  const { bg, icon: Icon, glow } = getPersonaStyles();

  return (
    <div className={`${sizeClasses[size]} rounded-full ${bg} shadow-lg ${glow} flex items-center justify-center p-3 animate-pulse-slow`}>
      <Icon className="w-full h-full text-white" />
    </div>
  );
}