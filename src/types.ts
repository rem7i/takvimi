export interface PrayerTime {
  date: string;
  fajr: string;
  sunrise: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
  daylight: string;
  notes: string;
}

export interface ParsedPrayerTime extends PrayerTime {
  daylightHours: number;
  daylightMinutes: number;
  hijriDate: string;
}