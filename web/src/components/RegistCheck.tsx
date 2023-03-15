// If Email input data is Empty
export const isEmailEmpty = (email: string) => {
  if (email === '') return true;
  return false;
};

// If Email input data meets the email regular expression
export const CheckEmail = (email: string) => {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return emailRegex.test(email);
};

// If Password input data is Empty
export const isPasswordEmpty = (password: string) => {
  if (password === '') return true;
  return false;
};

// If Password input data meets the Password regular expression
export const CheckPassword = (password: string) => {
  const PasswordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
  return PasswordRegex.test(password);
};

// If Name input data is Empty
export const isNameEmpty = (name: string) => {
  if (name === '') return true;
  return false;
};

// If PhoneNumber input data is Empty
export const isPhoneNumberEmpty = (phoneNumber: string) => {
  if (phoneNumber === '') return true;
  return false;
};

// If PhoneNumber input data meets the PhoneNumber regular expression
export const CheckPhNumber = (phnumber: string) => {
  const PhoneRegex = /^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/;
  return PhoneRegex.test(phnumber);
};

// Showing ModalPage because [inputType] is Empty
export const ShowModal_isEmpty = (inputType: string) => {
  // Delete alret & setShowModal
  alert(inputType + '을(를) 입력해주세요'.toString());
};

// Showing ModalPage because [inputType] can not checking
export const ShowModal_Check = (inputType: string) => {
  // Delete alret & setShowModal
  alert(inputType + '이(가) 올바르지 않습니다'.toString());
};

// Showing ModalPage because [inputType] is requested
export const ShowModal_Btn = (inputType: string) => {
  // Delete alret & setShowModal
  alert(inputType + '을 해주세요'.toString());
};
