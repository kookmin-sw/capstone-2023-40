/**
 * Check if input text is empty string.
 *
 * @param {string} text String type text
 * @returns {boolean} Result of checking empty string
 */
export const isEmptyString = (text: string): boolean => {
  return text === '';
};

/**
 * Validate email format.
 *
 * @param {string} email Email text
 * @returns {boolean} Result of validation
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return emailRegex.test(email);
};

/**
 * Validate password format. It **should contain** numeric string with Capital letter
 * and special character included.
 * From minimum 8 to maximum 25 characters.
 *
 * @param {string} password Password text
 * @returns {boolean} Result of validation
 */
export const validatePassword = (password: string): boolean => {
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
  return passwordRegex.test(password);
};

/**
 * Validate phone number format. It **should match** E.164 format.
 * See {@Link https://en.wikipedia.org/wiki/E.164}
 *
 * @param {string} phoneNumber Phone number text
 * @returns {boolean} Result of validation
 */
export const validatePhoneNumber = (phoneNumber: string): boolean => {
  const phoneRegex = /^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/;
  return phoneRegex.test(phoneNumber);
};
