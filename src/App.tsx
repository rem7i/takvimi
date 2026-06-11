import React, { useState, useEffect } from 'react';
import { PrayerCard } from './components/PrayerCard';
import { NextPrayerCard } from './components/NextPrayerCard';
import { DateHeader } from './components/DateHeader';
import { SpecialEventCard } from './components/SpecialEventCard';
import { FestivalsModal } from './components/FestivalsModal';
import { calculateDaylight, getNextPrayer } from './utils/dateUtils';
import { getHijriDate, isRamadan } from './utils/hijriDateUtils';
import { parsePrayerTimes, getPrayerTimeForDate } from './utils/csvUtils';
import { PrayerTime } from './types';
import { Sun, ChevronLeft, ChevronRight, Calendar, Globe, Github } from 'lucide-react';
import { prayerTimesData } from './data/prayer-times';


function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [prayerTimes, setPrayerTimes] = useState<PrayerTime[]>([]);
  const [prayerData, setPrayerData] = useState<PrayerTime | undefined>();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showFestivals, setShowFestivals] = useState(false);

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
  const hijriDate = getHijriDate(selectedDate);
  const isRamadanMonth = isRamadan(hijriDate);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-lg mx-auto p-4">
        {isRamadanMonth && (
          <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4 rounded-r-lg mb-6">
            <p className="text-emerald-900">Urime Ramazanin!</p>
          </div>
        )}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={handlePreviousDay}
            className="p-2 rounded-full hover:bg-gray-200 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <DateHeader 
            selectedDate={selectedDate}
            hijriDate={hijriDate.format}
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
        <SpecialEventCard note={prayerData.notes} />
          <div className="flex items-center mb-2">
            <Calendar className="w-5 h-5 text-gray-600" />
            <span className="text-gray-900 font-medium">
            Vaktet për datën {selectedDate.toLocaleDateString()}:
            </span>
        </div>      
        <div className="space-y-3">
          <PrayerCard name="Imsaku" time={prayerData.fajr} isNext={nextPrayer === 'Imsaku'} />
          <PrayerCard name="Sabahu" time={prayerData.sabahu} isNext={nextPrayer === 'Sabahu'} />
          <PrayerCard name="Lindja e Diellit" time={prayerData.sunrise} isNext={nextPrayer === 'Lindja e Diellit'} />
          <PrayerCard name="Dreka" time={prayerData.dhuhr} isNext={nextPrayer === 'Dreka'} />
          <PrayerCard name="Ikindia" time={prayerData.asr} isNext={nextPrayer === 'Ikindia'} />
          <PrayerCard name="Akshami" time={prayerData.maghrib} isNext={nextPrayer === 'Akshami'} />
          <PrayerCard name="Jacia" time={prayerData.isha} isNext={nextPrayer === 'Jacia'} />
        </div>

        {showFestivals && (
          <FestivalsModal
            prayerTimes={prayerTimes}
            onClose={() => setShowFestivals(false)}
          />
        )}

        <div className="mt-6 bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center space-x-2">
            <Sun className="w-5 h-5 text-blue-600" />
            <span className="text-blue-900 font-medium">
              Gjatësia e ditës: {daylightHours} orë {daylightMinutes} minuta
            </span>
          </div>
        </div>

        <button
          onClick={() => setShowFestivals(true)}
          className="w-full mt-6 p-3 bg-white border border-emerald-200 rounded-lg flex items-center justify-center space-x-2 hover:bg-emerald-50 transition-colors"
        >
          <Calendar className="w-5 h-5 text-emerald-600" />
          <span className="text-emerald-800 font-medium">Festat islame</span>
        </button>

        <div className="mt-8 pt-4 border-t border-gray-200 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Takvimi</p>
          <div className="flex items-center justify-center space-x-4 mt-2">
            <a
              href="https://remzinura.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-600 transition-colors"
            >
              <Globe className="w-5 h-5" />
            </a>
            <a
              href="https://github.com/rem7i/takvimi"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-600 transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;
