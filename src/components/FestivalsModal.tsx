import React from 'react';
import { X, Calendar } from 'lucide-react';
import { PrayerTime } from '../types';

interface FestivalsModalProps {
  prayerTimes: PrayerTime[];
  onClose: () => void;
}

const monthNames = [
  'Janar', 'Shkurt', 'Mars', 'Prill', 'Maj', 'Qershor',
  'Korrik', 'Gusht', 'Shtator', 'Tetor', 'Nëntor', 'Dhjetor'
];

export function FestivalsModal({ prayerTimes, onClose }: FestivalsModalProps) {
  const festivals = prayerTimes.filter(pt => pt.festat);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[80vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between rounded-t-xl">
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-emerald-600" />
            <h2 className="text-lg font-semibold text-gray-900">Festat islame</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="p-4 space-y-3">
          {festivals.length === 0 && (
            <p className="text-gray-500 text-center py-4">Nuk ka të dhëna për festat.</p>
          )}
          {festivals.map((pt, idx) => {
            const month = parseInt(pt.date.split('-')[0], 10) - 1;
            const day = parseInt(pt.date.split('-')[1], 10);
            return (
              <div key={idx} className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-amber-900">
                    {day} {monthNames[month]}
                  </span>
                  <span className="text-xs text-gray-500">{pt.date}</span>
                </div>
                <p className="text-amber-800 font-semibold">{pt.festat}</p>
                {pt.notes && pt.notes !== pt.festat && (
                  <p className="text-sm text-gray-600 mt-1">{pt.notes}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
