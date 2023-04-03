import { AuthAction, AuthState } from '../types/auth';
import { FormAction, FormState } from '../types/form';

export const formReducer = (state: FormState, action: FormAction): FormState => {
  switch (action.type) {
    case 'SET_EMAIL':
      return { ...state, email: action.payload };
    case 'SET_PASSWORD':
      return { ...state, password: action.payload };
    case 'SET_CONFIRM_PASSWORD':
      return { ...state, confirmPassword: action.payload };
    case 'SET_NAME':
      return { ...state, name: action.payload };
    case 'SET_PHONE_NUMBER':
      return { ...state, phoneNumber: action.payload };
    case 'SET_AUTH_KEY':
      return { ...state, key: action.payload };
    case 'AUTH_EMAIL':
      return { ...state, isEmailChecked: action.payload };
    case 'CONFIRM_PASSWORD':
      return { ...state, isPasswordChecked: action.payload };
    case 'AUTH_KEY':
      return { ...state, isKeyChecked: action.payload };
    case 'AGREE_SERVICE':
      return { ...state, isServiceAgreementChecked: action.payload };
    case 'AGREE_INFORMATION':
      return { ...state, isUserInfoConsentChecked: action.payload };
    default:
      return state;
  }
};

export const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'AUTH_KAKAO':
      return { ...state, kakao: action.payload };
    case 'AUTH_NAVER':
      return { ...state, naver: action.payload };
    case 'AUTH_GOOGLE':
      return { ...state, google: action.payload };
    case 'AUTH_IDENTITY':
      return { ...state, identityCard: action.payload };
    case 'AUTH_DRIVER':
      return { ...state, driverCard: action.payload };
    case 'AUTH_SCHOOLMAIL':
      return { ...state, schoolMail: action.payload };
    default:
      return state;
  }
};
