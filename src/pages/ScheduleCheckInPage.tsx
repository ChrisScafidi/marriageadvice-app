import React, { useState } from 'react';
import { Heart, Calendar, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { format, addDays } from 'date-fns';

interface CheckInSlot {
  id: string;
  date: Date;
  time: string;
  type: 'personal' | 'couple';
  available: boolean;
}

const generateTimeSlots = () => {
  const slots: CheckInSlot[] = [];
  const startHour = 9;
  const endHour = 20;
  
  for (let day = 0; day < 7; day++) {
    const date = addDays(new Date(), day);
    
    for (let hour = startHour; hour <= endHour; hour++) {
      const time = `${hour}:00`;
      slots.push({
        id: `${format(date, 'yyyy-MM-dd')}-${time}`,
        date,
        time,
        type: Math.random() > 0.5 ? 'personal' : 'couple',
        available: Math.random() > 0.3,
      });
    }
  }
  
  return slots;
};

export default function ScheduleCheckInPage() {
  const [selectedSlot, setSelectedSlot] = useState<CheckInSlot | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [timeSlots] = useState<CheckInSlot[]>(generateTimeSlots());

  const handleSchedule = () => {
    if (selectedSlot) {
      setShowConfirmation(true);
      // Here you would typically make an API call to save the appointment
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Schedule Check-in</h1>
            <p className="mt-1 text-sm text-gray-500">
              Book your next relationship review session
            </p>
          </div>
          <Heart className="h-8 w-8 text-rose-500" />
        </div>

        {/* Check-in Types */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Personal Check-in</h2>
            <p className="text-gray-600 mb-4">
              A private session to reflect on your personal growth and relationship goals.
              Perfect for individual reflection and goal setting.
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                15-minute guided self-reflection
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                Progress tracking
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                Personalized insights
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Couple Check-in</h2>
            <p className="text-gray-600 mb-4">
              A shared session with your partner to discuss your relationship,
              celebrate progress, and address any concerns together.
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                30-minute guided discussion
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                Relationship assessment
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                Joint goal setting
              </li>
            </ul>
          </div>
        </div>

        {/* Time Slots */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Available Time Slots</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {timeSlots.map((slot) => (
              <button
                key={slot.id}
                onClick={() => setSelectedSlot(slot)}
                disabled={!slot.available}
                className={`p-4 rounded-lg border ${
                  selectedSlot?.id === slot.id
                    ? 'border-rose-500 bg-rose-50'
                    : slot.available
                    ? 'border-gray-200 hover:border-rose-200 hover:bg-rose-50'
                    : 'border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-900">
                    {format(slot.date, 'EEEE, MMM d')}
                  </span>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    slot.type === 'personal'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-purple-100 text-purple-800'
                  }`}>
                    {slot.type === 'personal' ? 'Personal' : 'Couple'}
                  </span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="h-4 w-4 mr-1" />
                  <span className="text-sm">{slot.time}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Schedule Button */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={handleSchedule}
            disabled={!selectedSlot}
            className="px-6 py-2 bg-rose-600 text-white rounded-md font-medium hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Schedule Check-in
          </button>
        </div>

        {/* Confirmation Modal */}
        {showConfirmation && selectedSlot && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <div className="flex items-center mb-4">
                <CheckCircle className="h-6 w-6 text-green-500 mr-2" />
                <h3 className="text-lg font-medium text-gray-900">Check-in Scheduled!</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Your {selectedSlot.type} check-in is scheduled for{' '}
                {format(selectedSlot.date, 'EEEE, MMMM d')} at {selectedSlot.time}.
              </p>
              <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-6">
                <div className="flex">
                  <AlertCircle className="h-5 w-5 text-yellow-400" />
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-yellow-800">
                      Important Note
                    </h3>
                    <p className="mt-2 text-sm text-yellow-700">
                      You'll receive an email confirmation with preparation tips and a
                      calendar invite. Make sure to add it to your calendar!
                    </p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setShowConfirmation(false)}
                className="w-full px-4 py-2 bg-rose-600 text-white rounded-md hover:bg-rose-700"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}