import { PrayerTime } from '../types';

export function parsePrayerTimes(csvData: string): PrayerTime[] {
  const lines = csvData.trim().split('\n');
  const [header, ...rows] = lines;
  
  return rows.map(row => {
    const [date, fajr, sabahu, sunrise, dhuhr, asr, maghrib, isha, festat, notes] = row.split(',');
    return {
      date,
      fajr,
      sabahu,
      sunrise,
      dhuhr,
      asr,
      maghrib,
      isha,
      festat: festat?.trim() || '',
      notes: notes?.trim() || ''
    };
  });
}

export function getPrayerTimeForDate(prayerTimes: PrayerTime[], date: Date): PrayerTime | undefined {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const dateString = `${month}-${day}`;
  return prayerTimes.find(pt => pt.date === dateString);
}
