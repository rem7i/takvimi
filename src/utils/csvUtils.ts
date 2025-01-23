import { PrayerTime } from '../types';

export function parsePrayerTimes(csvData: string): PrayerTime[] {
  const lines = csvData.trim().split('\n');
  const [header, ...rows] = lines;
  
  return rows.map(row => {
    const [date, fajr, sunrise, dhuhr, asr, maghrib, isha, daylight, notes] = row.split(',');
    return {
      date,
      fajr,
      sunrise,
      dhuhr,
      asr,
      maghrib,
      isha,
      daylight,
      notes: notes?.trim() || ''
    };
  });
}

export function getPrayerTimeForDate(prayerTimes: PrayerTime[], date: Date): PrayerTime | undefined {
  const dateString = date.toISOString().split('T')[0];
  return prayerTimes.find(pt => pt.date === dateString);
}