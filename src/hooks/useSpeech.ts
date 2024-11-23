import { useState, useEffect } from 'react';

export function useSpeech() {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const synth = window.speechSynthesis;

  useEffect(() => {
    const loadVoices = () => {
      setVoices(synth.getVoices());
    };

    loadVoices();
    
    // Chrome loads voices asynchronously
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = loadVoices;
    }

    return () => {
      synth.cancel(); // Cancel any ongoing speech when component unmounts
    };
  }, []);

  const speak = (text: string) => {
    synth.cancel(); // Cancel any ongoing speech

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Enhanced voice settings
    utterance.rate = 0.9; // Slightly slower than default
    utterance.pitch = 1.1; // Slightly higher pitch
    utterance.volume = 1.0; // Full volume

    // Priority list of preferred voices
    const preferredVoices = [
      'Google UK English Female',
      'Microsoft Libby Online (Natural)',
      'Samantha',
      'Alex',
      'Karen',
      'Moira',
      'Daniel'
    ];

    // Try to find a preferred voice
    const selectedVoice = voices.find(voice => 
      preferredVoices.some(preferred => 
        voice.name.includes(preferred)
      )
    ) || voices.find(voice => 
      voice.lang.startsWith('en') && voice.name.includes('Female')
    ) || voices[0];

    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    synth.speak(utterance);
    return utterance;
  };

  const stop = () => {
    synth.cancel();
  };

  return {
    speak,
    stop,
    voices,
  };
}