import React from 'react';
import { MessageCircle, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useChat } from '../../hooks/useChat';
import { CheckInData } from './DailyCheckIn/DailyCheckIn';
import { useTheme } from '../../contexts/ThemeContext';

interface AIRecommendationsProps {
  checkInData: CheckInData;
}

export default function AIRecommendations({ checkInData }: AIRecommendationsProps) {
  const navigate = useNavigate();
  const { addMessage } = useChat();
  const { theme } = useTheme();

  const getRecommendations = () => {
    const recommendations = [];

    if (checkInData.emotional <= 3) {
      recommendations.push({
        title: 'Emotional Well-being',
        suggestion: 'Process and understand your emotions',
        action: 'Start guided emotional check-in',
        prompt: "I've been feeling emotionally drained lately. Can you help me understand my emotions better and suggest some coping strategies? My emotional well-being score is currently " + checkInData.emotional + " out of 5."
      });
    }

    if (checkInData.relationship <= 3) {
      recommendations.push({
        title: 'Relationship Connection',
        suggestion: 'Strengthen your bond and communication',
        action: 'Explore connection exercises',
        prompt: "My relationship connection feels weak (rated " + checkInData.relationship + "/5). Can you provide specific exercises or activities that can help strengthen our emotional bond and improve our communication?"
      });
    }

    if (checkInData.selfCare <= 3) {
      recommendations.push({
        title: 'Self-Care Practices',
        suggestion: 'Prioritize your well-being',
        action: 'Get personalized self-care plan',
        prompt: "I'm struggling with self-care (rated " + checkInData.selfCare + "/5). Can you help me create a realistic self-care routine that balances my relationship needs with personal well-being?"
      });
    }

    if (checkInData.goals <= 3) {
      recommendations.push({
        title: 'Goal Setting',
        suggestion: 'Define and achieve relationship goals',
        action: 'Create action plan',
        prompt: "I need help with relationship goals (currently at " + checkInData.goals + "/5). Can you help me set SMART goals for my relationship and create a step-by-step plan to achieve them?"
      });
    }

    return recommendations.length > 0 ? recommendations : [{
      title: 'Maintain Your Progress',
      suggestion: 'Build on your current success',
      action: 'Explore growth opportunities',
      prompt: "I'm doing well in my relationship (scoring high across all areas) but want to ensure continued growth. Can you suggest some advanced relationship-building exercises or ways to maintain and build upon our current success?"
    }];
  };

  const handleRecommendationClick = async (prompt: string) => {
    navigate('/chat');
    // Small delay to ensure navigation is complete
    setTimeout(() => {
      addMessage(prompt);
    }, 100);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <MessageCircle className={`h-5 w-5 ${
          theme === 'dark' ? 'text-rose-400' : 'text-rose-500'
        }`} />
        <h3 className={`text-lg font-medium ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
          AI Recommendations
        </h3>
      </div>

      <div className="space-y-4">
        {getRecommendations().map((rec, index) => (
          <div
            key={index}
            className={`${
              theme === 'dark'
                ? 'bg-gray-800 border-gray-700 hover:border-rose-700 hover:bg-gray-700'
                : 'bg-white border-gray-200 hover:border-rose-200 hover:bg-rose-50'
            } border rounded-lg p-4 transition-colors cursor-pointer`}
            onClick={() => handleRecommendationClick(rec.prompt)}
          >
            <h4 className={`font-medium ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              {rec.title}
            </h4>
            <p className={`mt-1 text-sm ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {rec.suggestion}
            </p>
            <button className={`mt-3 inline-flex items-center text-sm ${
              theme === 'dark' ? 'text-rose-400 hover:text-rose-300' : 'text-rose-600 hover:text-rose-700'
            }`}>
              <MessageCircle className="h-4 w-4 mr-1" />
              {rec.action}
              <ArrowRight className="h-4 w-4 ml-1" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}