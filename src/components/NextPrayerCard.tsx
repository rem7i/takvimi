import React from 'react';
import { Timer } from 'lucide-react';

interface NextPrayerCardProps {
  prayerName: string;
  remainingTime: string;
}

export function NextPrayerCard({ prayerName, remainingTime }: NextPrayerCardProps) {
  return (
    <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-6 rounded-xl text-white shadow-lg mb-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-medium opacity-90">Vakti i radhës:</h2>
          <p className="text-2xl font-bold mt-1">{prayerName}</p>
        </div>
        <div className="flex items-center space-x-2">
          <Timer className="w-6 h-6" />
          <span className="text-xl font-semibold">Edhe {remainingTime}</span>
        </div>
      </div>
    </div>
  );
}