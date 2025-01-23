import React from 'react';
import { Clock } from 'lucide-react';

interface PrayerCardProps {
  name: string;
  time: string;
  isNext: boolean;
}

export function PrayerCard({ name, time, isNext }: PrayerCardProps) {
  return (
    <div className={`p-4 rounded-lg ${
      isNext 
        ? 'bg-emerald-100 border-2 border-emerald-500' 
        : 'bg-white border border-gray-200'
    }`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Clock className={`w-5 h-5 ${isNext ? 'text-emerald-600' : 'text-gray-600'}`} />
          <h3 className={`font-medium ${isNext ? 'text-emerald-900' : 'text-gray-900'}`}>
            {name}
          </h3>
        </div>
        <span className={`font-semibold ${isNext ? 'text-emerald-900' : 'text-gray-900'}`}>
          {time}
        </span>
      </div>
    </div>
  );
}