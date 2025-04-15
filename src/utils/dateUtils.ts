import { PrayerTime } from '../types';

export function calculateDaylight(prayerTime: PrayerTime): { hours: number; minutes: number } {
  const sunrise = new Date(`2000/01/01 ${prayerTime.sunrise.replace(/\s/g, '')}`);
  const maghrib = new Date(`2000/01/01 ${prayerTime.maghrib.replace(/\s/g, '')}`);
  const diff = maghrib.getTime() - sunrise.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  return { hours, minutes };
}

export function getNextPrayer(prayerTime: PrayerTime): { name: string; remainingTime: string } {
  const now = new Date();
  const prayers = [
    { name: 'Imsaku', time: prayerTime.fajr },
    { name: 'Lindja', time: prayerTime.sunrise },
    { name: 'Dreka', time: prayerTime.dhuhr },
    { name: 'Ikindia', time: prayerTime.asr },
    { name: 'Akshami', time: prayerTime.maghrib },
    { name: 'Jacia', time: prayerTime.isha },
  ];

  const currentTime = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
  
  for (const prayer of prayers) {
    const [hours, minutes] = prayer.time.split(':').map(Number);
    const prayerSeconds = hours * 3600 + minutes * 60;
    
    if (prayerSeconds > currentTime) {
      const diff = prayerSeconds - currentTime;
      const remainingHours = Math.floor(diff / 3600);
      const remainingMinutes = Math.floor((diff % 3600) / 60);
      const remainingSeconds = diff % 60;
      
      return {
        name: prayer.name,
        remainingTime: `${remainingHours}:${remainingMinutes}:${remainingSeconds}`
      };
    }
  }

  // Calculate time until tomorrow's Fajr
  const [fajrHours, fajrMinutes] = prayerTime.fajr.split(':').map(Number);
  const tomorrowFajr = fajrHours * 3600 + fajrMinutes * 60;
  const timeUntilTomorrow = (24 * 3600 - currentTime) + tomorrowFajr;
  
  const remainingHours = Math.floor(timeUntilTomorrow / 3600);
  const remainingMinutes = Math.floor((timeUntilTomorrow % 3600) / 60);
  const remainingSeconds = timeUntilTomorrow % 60;

  return {
    name: 'Imsaku',
    remainingTime: `${remainingHours}:${remainingMinutes}:${remainingSeconds}`
  };
}
