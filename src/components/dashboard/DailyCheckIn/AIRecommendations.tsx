import React from 'react';
import { CheckInData } from './DailyCheckIn';
import { Lightbulb, ArrowRight, MessageCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useChat } from '../../../hooks/useChat';

interface AIRecommendationsProps {
  checkInData: CheckInData;
}

export default function AIRecommendations({ checkInData }: AIRecommendationsProps) {
  const navigate = useNavigate();
  const { addMessage } = useChat();

  const getRecommendations = () => {
    const recommendations = [];

    if (checkInData.emotional <= 3) {
      recommendations.push({
        title: 'Emotional Well-being',
        suggestion: 'Take time for self-reflection and emotional processing',
        action: 'Start a guided emotional check-in conversation',
        prompt: "I'm feeling emotionally drained today and could use some guidance on processing my emotions. Can you help me work through this?"
      });
    }

    if (checkInData.relationship <= 3) {
      recommendations.push({
        title: 'Relationship Connection',
        suggestion: 'Focus on quality time and open communication',
        action: 'Explore communication exercises',
        prompt: "I'd like to improve my connection with my partner. Can you suggest some effective communication exercises and ways to strengthen our bond?"
      });
    }

    if (checkInData.selfCare <= 3) {
      recommendations.push({
        title: 'Self-Care Practices',
        suggestion: 'Prioritize your physical and mental well-being',
        action: 'Get personalized self-care tips',
        prompt: "I've been struggling with self-care lately. Can you help me create a personalized self-care routine that fits my lifestyle?"
      });
    }

    if (checkInData.goals <= 3) {
      recommendations.push({
        title: 'Goal Setting',
        suggestion: 'Review and adjust your relationship goals',
        action: 'Create an action plan',
        prompt: "I need help setting and achieving my relationship goals. Can you guide me through creating a realistic action plan?"
      });
    }

    return recommendations.length > 0 ? recommendations : [{
      title: 'Keep Going Strong!',
      suggestion: 'You\'re doing well across all areas. Consider setting new challenges.',
      action: 'Explore growth opportunities',
      prompt: "I'm doing well in my relationship but want to continue growing. Can you suggest some advanced relationship-building exercises or challenges?"
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
        <Lightbulb className="h-5 w-5 text-yellow-500" />
        <h3 className="text-lg font-medium text-gray-900">AI Recommendations</h3>
      </div>

      <div className="space-y-4">
        {getRecommendations().map((rec, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-lg p-4 hover:border-rose-200 hover:bg-rose-50 transition-colors"
          >
            <h4 className="font-medium text-gray-900">{rec.title}</h4>
            <p className="mt-1 text-sm text-gray-600">{rec.suggestion}</p>
            <button
              onClick={() => handleRecommendationClick(rec.prompt)}
              className="mt-3 inline-flex items-center text-sm text-rose-600 hover:text-rose-700"
            >
              <MessageCircle className="h-4 w-4 mr-1" />
              {rec.action}
              <ArrowRight className="h-4 w-4 ml-1" />
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={() => handleRecommendationClick("Hi, I'd like some general relationship advice and guidance.")}
        className="block w-full text-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
      >
        Start AI Conversation
      </button>
    </div>
  );
}