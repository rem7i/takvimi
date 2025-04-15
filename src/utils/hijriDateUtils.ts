import * as HijriJS from 'hijri-js';

export type HijriCalculationMethod = 'UmmAlQura' | 'Turkish' | 'Karachi' | 'MWL';

interface HijriDateOptions {
  calculationMethod?: HijriCalculationMethod;
  adjustment?: number;
}

export interface HijriDate {
  day: number;
  month: number;
  year: number;
  monthName: string;
  format: string;
}

const hijriMonths = {
  1: 'Muharrem',
  2: 'Sefer',
  3: 'Rebiul-Evvel',
  4: 'Rebiul-Ahir',
  5: 'Xhumadel-Ula',
  6: 'Xhumadel-Ahireh',
  7: 'Rexheb',
  8: 'Shaban',
  9: 'Ramazan',
  10: 'Shevval',
  11: 'Dhul-Ka\'de',
  12: 'Dhul-Ḥixhxhe'
};

export function getHijriDate(date: Date, options: HijriDateOptions = {}): HijriDate {
  const {
    adjustment = 0
  } = options;

  // Manual calculation of Hijri date since the library isn't working as expected
  // This is a simple implementation - for production use, consider a more robust library
  
  // Get Julian day number for the given date
  const jd = gregorianToJulian(date);
  
  // Convert Julian day number to Hijri date
  const { year, month, day } = julianToHijri(jd);
  
  // Apply adjustment if needed
  const adjustedDay = day + adjustment;
  
  return {
    day: adjustedDay,
    month: month,
    year: year,
    monthName: hijriMonths[month],
    format: `${adjustedDay} ${hijriMonths[month]} ${year}`
  };
}

// Helper function to convert Gregorian date to Julian day number
function gregorianToJulian(date: Date): number {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  
  let jd = Math.floor((1461 * (year + 4800 + Math.floor((month - 14) / 12))) / 4) +
           Math.floor((367 * (month - 2 - 12 * Math.floor((month - 14) / 12))) / 12) -
           Math.floor((3 * Math.floor((year + 4900 + Math.floor((month - 14) / 12)) / 100)) / 4) +
           day - 32075;
  
  return jd;
}

// Helper function to convert Julian day number to Hijri date
function julianToHijri(jd: number): { year: number, month: number, day: number } {
  const l = jd - 1948440 + 10632;
  const n = Math.floor((l - 1) / 10631);
  const l1 = l - 10631 * n + 354;
  const j = Math.floor((10985 - l1) / 5316) * Math.floor((50 * l1) / 17719) + 
            Math.floor(l1 / 5670) * Math.floor((43 * l1) / 15238);
  const l2 = l1 - Math.floor((30 - j) / 15) * Math.floor((17719 * j) / 50) - 
             Math.floor(j / 16) * Math.floor((15238 * j) / 43) + 29;
  
  const month = Math.floor((24 * l2) / 709);
  const day = l2 - Math.floor((709 * month) / 24);
  const year = 30 * n + j - 30;
  
  return { year, month, day };
}

export function isRamadan(hijriDate: HijriDate): boolean {
  return hijriDate.month === 9;
}

export function getNextHijriMonth(date: Date, options: HijriDateOptions = {}): HijriDate {
  const nextMonth = new Date(date);
  nextMonth.setMonth(date.getMonth() + 1);
  return getHijriDate(nextMonth, options);
}

export function getImportantIslamicDates(year: number, options: HijriDateOptions = {}): Date[] {
  const importantDates = [
    { month: 9, day: 1 },  // Start of Ramadan
    { month: 10, day: 1 }, // Eid al-Fitr
    { month: 12, day: 10 } // Eid al-Adha
  ];

  // Using our own conversion functions instead of relying on the library
  return importantDates.map(({ month, day }) => {
    // This is a simplified approach - for production, use a more accurate method
    // Convert Hijri date to Julian day number (approximate)
    const jd = hijriToJulian(year, month, day);
    
    // Convert Julian day number to Gregorian date
    return julianToGregorian(jd);
  });
}

// Helper function to convert Hijri date to Julian day number
function hijriToJulian(year: number, month: number, day: number): number {
  return Math.floor((11 * year + 3) / 30) + 
         Math.floor(354 * year) + 
         Math.floor(30 * month) - 
         Math.floor((month - 1) / 2) + 
         day + 1948440 - 385;
}

// Helper function to convert Julian day number to Gregorian date
function julianToGregorian(jd: number): Date {
  const z = Math.floor(jd);
  const a = z;
  const b = a + 1524;
  const c = Math.floor((b - 122.1) / 365.25);
  const d = Math.floor(365.25 * c);
  const e = Math.floor((b - d) / 30.6001);
  
  const day = b - d - Math.floor(30.6001 * e);
  let month = e - 1;
  if (month > 12) month = month - 12;
  
  let year = c - 4716;
  if (month > 2) year -= 1;
  
  return new Date(year, month - 1, day);
}