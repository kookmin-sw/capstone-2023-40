// If input data is Empty Like [email, password, name, phoneNumber]
export const isEmptyString = (email: string): boolean => {
  return email === '';
};

// If Email input data meets the email regular expression
export const checkEmail = (email: string) => {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return emailRegex.test(email);
};

// If Password input data meets the Password regular expression
export const checkPassword = (password: string) => {
  const PasswordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
  return PasswordRegex.test(password);
};

// If PhoneNumber input data meets the PhoneNumber regular expression
export const checkPhoneNumber = (phnumber: string) => {
  const PhoneRegex = /^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/;
  return PhoneRegex.test(phnumber);
};

// Showing ModalPage because [inputType] is Empty
export const modalIsEmpty = (inputType: string) => {
  // Delete alret & setShowModal
  alert(inputType + '을(를) 입력해주세요'.toString());
};

// Showing ModalPage because [inputType] can not checking
export const modalCheck = (inputType: string) => {
  // Delete alret & setShowModal
  alert(inputType + '이(가) 올바르지 않습니다'.toString());
};

// Showing ModalPage because [inputType] is requested
export const modalReuest = (inputType: string) => {
  // Delete alret & setShowModal
  alert(inputType + '을 해주세요'.toString());
};

// Showing All semister because [inputType] is requested
export const modalAll = (inputType: string) => {
  // Delete alret & setShowModal
  alert(inputType);
};
