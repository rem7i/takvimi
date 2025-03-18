# Takvimi

Takvimi is a prayer times application that provides accurate Islamic prayer schedules with additional features for tracking Hijri dates and daylight hours.

## Features

- **Prayer Time Tracking**: Get accurate times for all daily prayers (Fajr/Imsaku, Sunrise/Lindja, Dhuhr/Dreka, Asr/Ikindia, Maghrib/Akshami, Isha/Jacia)
- **Next Prayer Countdown**: Shows the upcoming prayer with a real-time countdown
- **Hijri Calendar**: Displays the current Islamic date with localized month names
- **Daylight Calculator**: Calculates daylight hours between sunrise and sunset

## Technical Overview

The application is built using TypeScript and provides utilities for:

- Converting Gregorian dates to Hijri dates with proper transliteration
- Calculating the time remaining until the next prayer
- Computing daylight duration based on sunrise and sunset times

## Usage Examples

### Getting the Hijri Date

```typescript
import { getHijriDate } from './utils/dateUtils';

const today = new Date();
const hijriDate = getHijriDate(today);
console.log(`Today in Hijri calendar: ${hijriDate}`);
```

### Finding the Next Prayer

```typescript
import { getNextPrayer } from './utils/dateUtils';
import { PrayerTime } from './types';

const todayPrayers: PrayerTime = {
  fajr: '04:30',
  sunrise: '06:15',
  dhuhr: '13:00',
  asr: '16:45',
  maghrib: '20:10',
  isha: '21:45'
};

const nextPrayer = getNextPrayer(todayPrayers);
console.log(`Next prayer: ${nextPrayer.name} in ${nextPrayer.remainingTime}`);
```

### Calculating Daylight Hours

```typescript
import { calculateDaylight } from './utils/dateUtils';
import { PrayerTime } from './types';

const todayPrayers: PrayerTime = {
  fajr: '04:30',
  sunrise: '06:15',
  dhuhr: '13:00',
  asr: '16:45',
  maghrib: '20:10',
  isha: '21:45'
};

const daylight = calculateDaylight(todayPrayers);
console.log(`Daylight today: ${daylight.hours} hours and ${daylight.minutes} minutes`);
```

## Localization

The application supports transliteration of Hijri month names to the following format:

| English | Transliterated |
|---------|---------------|
| Muharram | Muharrem |
| Safar | Sefer |
| Rabi al-awwal | Rebiul-Evvel |
| Rabi al-thani | Rebiul-Ahir |
| Jumada al-awwal | Xhumadel-Ula |
| Jumada al-thani | Xhumadel-Ahireh |
| Rajab | Rexheb |
| Shaban | Shaban |
| Ramadan | Ramazan |
| Shawwal | Shevval |
| Dhu al-Qidah | Dhul-Ka'de |
| Dhu al-Hijjah | Dhul-Ḥixhxhe |

## Installation

```bash
git clone https://github.com/rem7i/takvimi.git
```

```bash
cd takvimi
```

```bash
npm install
```

```bash
npm start
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
