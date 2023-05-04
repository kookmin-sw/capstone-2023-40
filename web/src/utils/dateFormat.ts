/**
 * Replace T and remove milliseconds
 *
 * @param {string} date yyyy-mm-ddThh:MM:ss.zzzZ
 * @returns {string} yyyy-mm-dd hh:MM:ss
 */
export const dateFormatUpToSecond = (date: string): string => {
  return date.replace('T', ' ').substring(0, 19);
};

/**
 * Replace T and remove seconds and milliseconds
 *
 * @param {string} date yyyy-mm-ddThh:MM:ss.zzzZ
 * @returns {string} yyyy-mm-dd hh:MM
 */
export const dateFormatUpToMinute = (date: string): string => {
  return date.replace('T', ' ').substring(0, 16);
};

/**
 * Replace T and remove hour, minute, seconds and milliseconds
 *
 * @param {string} date yyyy-mm-ddThh:MM:ss.zzzZ
 * @returns {string} yyyy-mm-dd
 */
export const dateFormatUpToDate = (date: string): string => {
  return date.substring(0, 10);
};

/**
 * Return date difference between date1 and date2
 *
 * @param {string | Date} dDate yyyy-mm-ddThh:MM:ss.zzzZ
 * @returns {number} difference date
 */
export const getDDay = (dDate: string | Date): number => {
  const dateDiff = new Date(dDate).getTime() - new Date().getTime();

  return Math.floor(Math.abs(dateDiff / (1000 * 60 * 60 * 24)));
};
