import React from 'react';
import { Calendar, Bell } from 'lucide-react';

const reminders = [
  {
    title: 'Weekly Check-in',
    date: '2024-02-20',
    time: '7:00 PM',
    type: 'Scheduled',
  },
  {
    title: 'Complete Communication Exercise',
    date: '2024-02-21',
    type: 'Task',
  },
  {
    title: 'Review Progress',
    date: '2024-02-23',
    type: 'Goal',
  },
];

export default function UpcomingReminders() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Upcoming</h2>
        <Bell className="h-5 w-5 text-gray-400" />
      </div>
      
      <div className="space-y-4">
        {reminders.map((reminder, index) => (
          <div key={index} className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <Calendar className="h-5 w-5 text-rose-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">{reminder.title}</p>
              <p className="text-xs text-gray-500">
                {new Date(reminder.date).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                })}
                {reminder.time && ` at ${reminder.time}`}
              </p>
              <span className="inline-block mt-1 px-2 py-1 text-xs font-medium text-rose-600 bg-rose-100 rounded-full">
                {reminder.type}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}