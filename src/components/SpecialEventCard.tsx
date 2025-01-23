import React from 'react';

interface SpecialEventCardProps {
  note: string;
}

export function SpecialEventCard({ note }: SpecialEventCardProps) {
  if (!note) return null;

  return (
    <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg mt-6">
      <div className="flex items-center space-x-3">
      <p className="text-amber-500">
        Shënime: 
      </p>
        <p className="text-amber-900 font-medium">{note}</p>
      </div>
    </div>
  );
}