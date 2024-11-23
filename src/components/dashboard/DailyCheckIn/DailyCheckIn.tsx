import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { useAuth } from '../../../contexts/AuthContext';
import { saveDailyCheckIn, getTodayCheckIn } from '../../../services/checkInService';
import WheelOfLife from './WheelOfLife';
import CheckInSurvey from './CheckInSurvey';
import CheckInHistory from './CheckInHistory';
import AIRecommendations from './AIRecommendations';
import { Clock, Calendar, TrendingUp } from 'lucide-react';

export interface CheckInData {
  emotional: number;
  relationship: number;
  selfCare: number;
  goals: number;
  date: string;
  notes?: string;
}

export default function DailyCheckIn() {
  const [checkInData, setCheckInData] = useState<CheckInData | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  useEffect(() => {
    const loadTodayCheckIn = async () => {
      if (!currentUser) return;
      
      try {
        const todayData = await getTodayCheckIn(currentUser.uid);
        setCheckInData(todayData);
      } catch (error) {
        console.error('Error loading check-in:', error);
      } finally {
        setLoading(false);
      }
    };

    loadTodayCheckIn();
  }, [currentUser]);

  const handleCheckInSubmit = async (data: CheckInData) => {
    if (!currentUser) return;

    try {
      await saveDailyCheckIn(currentUser.uid, data);
      setCheckInData(data);
    } catch (error) {
      console.error('Error saving check-in:', error);
    }
  };

  if (loading) {
    return (
      <div className="animate-pulse bg-white rounded-lg shadow-sm p-6">
        <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="h-64 bg-gray-200 rounded"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Daily Check-in</h2>
          <p className="text-sm text-gray-500">
            {format(new Date(), 'EEEE, MMMM d, yyyy')}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="inline-flex items-center px-3 py-1.5 text-sm text-gray-600 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
          >
            {showHistory ? (
              <>
                <Clock className="h-4 w-4 mr-1" />
                Today
              </>
            ) : (
              <>
                <Calendar className="h-4 w-4 mr-1" />
                History
              </>
            )}
          </button>
        </div>
      </div>

      {showHistory ? (
        <CheckInHistory onClose={() => setShowHistory(false)} />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            {checkInData ? (
              <div className="space-y-6">
                <WheelOfLife data={checkInData} />
                <button
                  onClick={() => setCheckInData(null)}
                  className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Update Today's Check-in
                </button>
              </div>
            ) : (
              <CheckInSurvey onSubmit={handleCheckInSubmit} />
            )}
          </div>
          
          {checkInData && (
            <div>
              <AIRecommendations checkInData={checkInData} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}