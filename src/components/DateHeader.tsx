import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

interface DateHeaderProps {
  selectedDate: Date; // Pass the selectedDate directly
  hijriDate: string;
  onDateChange: (date: Date) => void; // Callback to handle date change
}

export function DateHeader({ selectedDate, hijriDate, onDateChange }: DateHeaderProps) {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const handleDateChange = (date: Date | null) => {
    if (date) {
      onDateChange(date); // Notify parent component of the date change
      setIsDatePickerOpen(false); // Close the date picker after selection
    }
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm mb-6">
      <div className="relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Calendar className="w-5 h-5 text-emerald-600" />
            <div>
              <h2
                className="text-lg font-semibold text-gray-900 cursor-pointer"
                onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
              >
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

        {isDatePickerOpen && (
          <div className="absolute mt-2 z-50 bg-white rounded-lg shadow-lg">
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              inline
              dateFormat="yyyy-MM-dd"
            />
          </div>
        )}
      </div>
    </div>
  );
}