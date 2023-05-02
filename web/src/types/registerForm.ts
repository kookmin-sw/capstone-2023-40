export interface RegisterFormState {
  /**
   * Initial state for inputs.
   */
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  phoneNumber: string;
  key: string;
  /**
   * Markers for inputs if filled and checked.
   */
  isEmailChecked: boolean;
  isPasswordChecked: boolean;
  isKeyChecked: boolean;
  isServiceAgreementChecked: boolean;
  isUserInfoConsentChecked: boolean;
}

export type RegisterFormAction =
  | { type: 'SET_EMAIL'; payload: string }
  | { type: 'SET_PASSWORD'; payload: string }
  | { type: 'SET_CONFIRM_PASSWORD'; payload: string }
  | { type: 'SET_NAME'; payload: string }
  | { type: 'SET_PHONE_NUMBER'; payload: string }
  | { type: 'SET_AUTH_KEY'; payload: string }
  | { type: 'AUTH_EMAIL'; payload: boolean }
  | { type: 'CONFIRM_PASSWORD'; payload: boolean }
  | { type: 'AUTH_KEY'; payload: boolean }
  | { type: 'AGREE_SERVICE'; payload: boolean }
  | { type: 'AGREE_INFORMATION'; payload: boolean };
