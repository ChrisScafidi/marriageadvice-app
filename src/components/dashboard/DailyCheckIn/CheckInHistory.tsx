import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useAuth } from '../../../contexts/AuthContext';
import { getCheckInHistory } from '../../../services/checkInService';
import { CheckInData } from './DailyCheckIn';
import { TrendingUp, Calendar } from 'lucide-react';
import { useTheme } from '../../../contexts/ThemeContext';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function CheckInHistory({ onClose }: { onClose: () => void }) {
  const [history, setHistory] = useState<CheckInData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { currentUser } = useAuth();
  const { theme } = useTheme();

  useEffect(() => {
    const loadHistory = async () => {
      if (!currentUser) {
        setError('Please sign in to view history');
        setLoading(false);
        return;
      }

      try {
        const data = await getCheckInHistory(currentUser.uid);
        if (data.length === 0) {
          setError('No check-in history found. Start by completing today\'s check-in!');
        } else {
          setHistory(data);
          setError(null);
        }
      } catch (err) {
        setError('Unable to load check-in history. Please try again later.');
        console.error('Error loading history:', err);
      } finally {
        setLoading(false);
      }
    };

    loadHistory();
  }, [currentUser]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-rose-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`p-4 rounded-lg ${
        theme === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-600'
      }`}>
        <p className="text-center">{error}</p>
      </div>
    );
  }

  const chartData = {
    labels: history.map(entry => format(new Date(entry.date), 'MMM d')),
    datasets: [
      {
        label: 'Emotional',
        data: history.map(entry => entry.emotional),
        borderColor: '#f43f5e',
        backgroundColor: theme === 'dark' ? '#f43f5e20' : '#f43f5e40',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Relationship',
        data: history.map(entry => entry.relationship),
        borderColor: '#8b5cf6',
        backgroundColor: theme === 'dark' ? '#8b5cf620' : '#8b5cf640',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Self-Care',
        data: history.map(entry => entry.selfCare),
        borderColor: '#10b981',
        backgroundColor: theme === 'dark' ? '#10b98120' : '#10b98140',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Goals',
        data: history.map(entry => entry.goals),
        borderColor: '#f59e0b',
        backgroundColor: theme === 'dark' ? '#f59e0b20' : '#f59e0b40',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        max: 5,
        ticks: {
          stepSize: 1,
          color: theme === 'dark' ? '#9ca3af' : '#4b5563',
        },
        grid: {
          color: theme === 'dark' ? '#374151' : '#e5e7eb',
        },
      },
      x: {
        ticks: {
          color: theme === 'dark' ? '#9ca3af' : '#4b5563',
        },
        grid: {
          color: theme === 'dark' ? '#374151' : '#e5e7eb',
        },
      },
    },
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: theme === 'dark' ? '#9ca3af' : '#4b5563',
        },
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
      },
    },
    interaction: {
      mode: 'nearest' as const,
      axis: 'x' as const,
      intersect: false,
    },
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <TrendingUp className={`h-5 w-5 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
          }`} />
          <h3 className={`text-lg font-medium ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Progress Over Time
          </h3>
        </div>
        <button
          onClick={onClose}
          className={`inline-flex items-center px-3 py-1.5 text-sm rounded-full ${
            theme === 'dark'
              ? 'text-gray-300 bg-gray-700 hover:bg-gray-600'
              : 'text-gray-600 bg-gray-100 hover:bg-gray-200'
          } transition-colors`}
        >
          <Calendar className="h-4 w-4 mr-1" />
          Back to Today
        </button>
      </div>

      <div className={`p-4 rounded-lg ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      }`}>
        <Line data={chartData} options={chartOptions} />
      </div>

      <div className="space-y-4">
        {history.slice(0, 7).map((entry) => (
          <div
            key={entry.date}
            className={`p-4 rounded-lg transition-colors ${
              theme === 'dark'
                ? 'bg-gray-800 hover:bg-gray-700'
                : 'bg-gray-50 hover:bg-gray-100'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className={`text-sm font-medium ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                {format(new Date(entry.date), 'EEEE, MMMM d')}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-sm">
                <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>
                  Emotional:{' '}
                </span>
                <span className={`font-medium ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  {entry.emotional}/5
                </span>
              </div>
              <div className="text-sm">
                <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>
                  Relationship:{' '}
                </span>
                <span className={`font-medium ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  {entry.relationship}/5
                </span>
              </div>
              <div className="text-sm">
                <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>
                  Self-Care:{' '}
                </span>
                <span className={`font-medium ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  {entry.selfCare}/5
                </span>
              </div>
              <div className="text-sm">
                <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>
                  Goals:{' '}
                </span>
                <span className={`font-medium ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  {entry.goals}/5
                </span>
              </div>
            </div>
            {entry.notes && (
              <p className={`mt-2 text-sm italic ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {entry.notes}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}