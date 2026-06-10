import React from 'react';
import { Calendar } from 'lucide-react';

interface DateHeaderProps {
  selectedDate: Date;
  hijriDate: string;
}

export function DateHeader({ selectedDate, hijriDate }: DateHeaderProps) {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Calendar className="w-5 h-5 text-emerald-600" />
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              {selectedDate.toLocaleDateString('sq-AL', { 
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </h2>
            <p className="text-sm text-gray-600">{hijriDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
