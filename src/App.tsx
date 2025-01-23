import React, { useState, useEffect } from 'react';
import { PrayerCard } from './components/PrayerCard';
import { NextPrayerCard } from './components/NextPrayerCard';
import { DateHeader } from './components/DateHeader';
import { SpecialEventCard } from './components/SpecialEventCard';
import { getHijriDate, calculateDaylight, getNextPrayer } from './utils/dateUtils';
import { parsePrayerTimes, getPrayerTimeForDate } from './utils/csvUtils';
import { PrayerTime } from './types';
import { Sun, ChevronLeft, ChevronRight } from 'lucide-react';
import { prayerTimesData } from './data/prayer-times';

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [prayerTimes, setPrayerTimes] = useState<PrayerTime[]>([]);
  const [prayerData, setPrayerData] = useState<PrayerTime | undefined>();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const parsedTimes = parsePrayerTimes(prayerTimesData);
    setPrayerTimes(parsedTimes);
  }, []);

  useEffect(() => {
    if (prayerTimes.length > 0) {
      const timeForDate = getPrayerTimeForDate(prayerTimes, selectedDate);
      if (timeForDate) {
        setPrayerData(timeForDate);
      }
    }
  }, [selectedDate, prayerTimes]);

  // Update current time every second for the countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleDateChange = (selectedDate: Date) => {
    setSelectedDate(selectedDate);
  };

  const handlePreviousDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() - 1);
    setSelectedDate(newDate);
  };

  const handleNextDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() + 1);
    setSelectedDate(newDate);
  };

  if (!prayerData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Ngarkohen vaktet e namazeve...</p>
      </div>
    );
  }

  const { name: nextPrayer, remainingTime } = getNextPrayer(prayerData);
  const { hours: daylightHours, minutes: daylightMinutes } = calculateDaylight(prayerData);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-lg mx-auto p-4">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={handlePreviousDay}
            className="p-2 rounded-full hover:bg-gray-200 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <DateHeader 
            selectedDate={selectedDate} // Pass the selectedDate directly
            hijriDate={getHijriDate(selectedDate)}
            onDateChange={handleDateChange}
          />
          <button
            onClick={handleNextDay}
            className="p-2 rounded-full hover:bg-gray-200 transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <NextPrayerCard 
          prayerName={nextPrayer}
          remainingTime={remainingTime}
        />

        <div className="space-y-3">
          <PrayerCard name="Imsaku" time={prayerData.fajr} isNext={nextPrayer === 'Imsaku'} />
          <PrayerCard name="Lindja e Diellit" time={prayerData.sunrise} isNext={nextPrayer === 'Lindja e Diellit'} />
          <PrayerCard name="Dreka" time={prayerData.dhuhr} isNext={nextPrayer === 'Dreka'} />
          <PrayerCard name="Ikindia" time={prayerData.asr} isNext={nextPrayer === 'Ikindia'} />
          <PrayerCard name="Akshami" time={prayerData.maghrib} isNext={nextPrayer === 'Akshami'} />
          <PrayerCard name="Jacia" time={prayerData.isha} isNext={nextPrayer === 'Jacia'} />
        </div>

        <div className="mt-6 bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center space-x-2">
            <Sun className="w-5 h-5 text-blue-600" />
            <span className="text-blue-900 font-medium">
              Gjatësia e ditës: {daylightHours} orë {daylightMinutes} minuta
            </span>
          </div>
        </div>
            
        <SpecialEventCard note={prayerData.notes} />
      </div>
    </div>
  );
}

export default App;