/**
 * Replace 'T' from Date format(yyyy-mm-dd'T'hh:MM:ss)
 *
 * @param {string} date yyyy-mm-dd'T'hh:MM:ss
 * @returns {string} yyyy-mm-dd hh:MM
 */
export const dateFormatUpToSecond = (date: string): string => {
  return date.replace('T', ' ').substring(0, 19);
};

/**
 * Replace 'T' and remove seconds from Date format(yyyy-mm-dd'T'hh:MM:ss)
 *
 * @param {string} date yyyy-mm-ddThh:MM:ss
 * @returns {string} yyyy-mm-dd hh:MM
 */
export const dateFormatUpToMinute = (date: string): string => {
  return date.replace('T', ' ').substring(0, 16);
};

/**
 * Replace 'T' and remove hour, minute and seconds from Date format(yyyy-mm-ddThh:MM:ss)
 *
 * @param {string} date yyyy-mm-dd'T'hh:MM:ss
 * @returns {string} yyyy-mm-dd
 */
export const dateFormatUpToDate = (date: string): string => {
  return date.substring(0, 10);
};

/**
 * Return how many days are left before the dDate from now
 *
 * @param {string | Date} dDate yyyy-mm-dd'T'hh:MM:ss
 * @returns {number} date difference
 */
export const getDDay = (dDate: string | Date): number => {
  const dateDiff = new Date(dDate).getTime() - new Date().getTime();

  return Math.floor(Math.abs(dateDiff / (1000 * 60 * 60 * 24)));
};

/**
 * Returns remaining time to given `date` from now.
 *
 * @param {string | Date} date yyyy-mm-dd'T'hh:MM:ss
 * @returns Remaining days, hours, minutes, seconds in number type each.
 */
export const getTimeRemaining = (date: string) => {
  const startDate = new Date(date);
  const now = new Date();

  const totalSeconds = Math.floor((startDate.getTime() - now.getTime()) / 1000);

  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor(totalSeconds / 3600) % 24;
  const minutes = Math.floor(totalSeconds / 60) % 60;
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds };
};
