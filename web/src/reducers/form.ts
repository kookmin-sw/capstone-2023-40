import React from 'react';

import { RegisterFormState, RegisterFormAction } from '../types/registerForm';

export const formReducer = (state: RegisterFormState, action: RegisterFormAction): RegisterFormState => {
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
