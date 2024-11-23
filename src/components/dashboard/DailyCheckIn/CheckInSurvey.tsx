import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Smile, Frown, Meh } from 'lucide-react';
import { CheckInData } from './DailyCheckIn';
import { useTheme } from '../../../contexts/ThemeContext';

interface CheckInSurveyProps {
  onSubmit: (data: CheckInData) => void;
}

const questions = [
  {
    id: 'emotional',
    label: 'How are you feeling emotionally today?',
    description: 'Rate your overall emotional well-being',
  },
  {
    id: 'relationship',
    label: 'How connected do you feel with your partner?',
    description: 'Consider your communication and intimacy',
  },
  {
    id: 'selfCare',
    label: 'How well are you taking care of yourself?',
    description: 'Think about sleep, exercise, and nutrition',
  },
  {
    id: 'goals',
    label: 'How motivated do you feel towards your goals?',
    description: 'Consider your progress and commitment',
  },
];

export default function CheckInSurvey({ onSubmit }: CheckInSurveyProps) {
  const { register, handleSubmit, watch } = useForm<CheckInData>();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const { theme } = useTheme();

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const onFormSubmit = (data: CheckInData) => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      onSubmit({
        ...data,
        date: new Date().toISOString(),
      });
    }
  };

  const renderMoodIcons = (value: number) => {
    return (
      <div className="flex items-center justify-between w-full px-1 mt-2">
        <div className="flex flex-col items-center">
          <Frown className={`h-5 w-5 ${value === 1 ? 'text-red-500' : 'text-gray-300'}`} />
          <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Poor</span>
        </div>
        <div className="flex flex-col items-center">
          <Meh className={`h-5 w-5 ${value === 2 ? 'text-orange-500' : 'text-gray-300'}`} />
          <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Fair</span>
        </div>
        <div className="flex flex-col items-center">
          <Meh className={`h-5 w-5 ${value === 3 ? 'text-yellow-500' : 'text-gray-300'}`} />
          <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Okay</span>
        </div>
        <div className="flex flex-col items-center">
          <Smile className={`h-5 w-5 ${value === 4 ? 'text-lime-500' : 'text-gray-300'}`} />
          <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Good</span>
        </div>
        <div className="flex flex-col items-center">
          <Smile className={`h-5 w-5 ${value === 5 ? 'text-green-500' : 'text-gray-300'}`} />
          <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Great</span>
        </div>
      </div>
    );
  };

  const currentQuestionData = questions[currentQuestion];
  const value = watch(currentQuestionData.id as keyof CheckInData);

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
      {/* Progress indicator */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex-1">
          <div className={`h-2 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'} rounded-full`}>
            <div 
              className="h-2 bg-rose-500 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>
        <span className={`ml-4 text-sm ${
          theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
        }`}>
          {currentQuestion + 1} of {questions.length}
        </span>
      </div>

      {/* Question content */}
      <div className="space-y-2">
        <label className={`block text-sm font-medium ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
          {currentQuestionData.label}
        </label>
        <p className={`text-xs ${
          theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
        }`}>
          {currentQuestionData.description}
        </p>
        
        <div className="space-y-2">
          <input
            type="range"
            min="1"
            max="5"
            step="1"
            {...register(currentQuestionData.id as keyof CheckInData, {
              valueAsNumber: true,
              required: true
            })}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-rose-500"
          />
          {renderMoodIcons(value)}
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-between space-x-4">
        {currentQuestion > 0 && (
          <button
            type="button"
            onClick={handleBack}
            className={`flex-1 py-2 px-4 border rounded-md shadow-sm text-sm font-medium ${
              theme === 'dark'
                ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500`}
          >
            Back
          </button>
        )}
        <button
          type="submit"
          className={`flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
            theme === 'dark'
              ? 'bg-rose-600 hover:bg-rose-700'
              : 'bg-rose-600 hover:bg-rose-700'
          } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500`}
        >
          {currentQuestion < questions.length - 1 ? 'Next' : 'Complete Check-in'}
        </button>
      </div>
    </form>
  );
}