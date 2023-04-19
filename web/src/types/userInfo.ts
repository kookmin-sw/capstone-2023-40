export type UserInfoState = {
  point: string;
  email: string;
  password: string;
  name: string;
  phoneNumber: string;
  address: string;
  emailDisabled: boolean;
  passwordDisabled: boolean;
  nameDisabled: boolean;
  phoneNumberDisabled: boolean;
  addressDisabled: boolean;
};

export type UserInfoAction =
  | { type: 'CHANGE_POINT'; payload: string }
  | { type: 'CHANGE_EMAIL'; payload: string }
  | { type: 'CHANGE_PASSWORD'; payload: string }
  | { type: 'CHANGE_NAME'; payload: string }
  | { type: 'CHANGE_PHONE_NUMBER'; payload: string }
  | { type: 'CHANGE_ADDRESS'; payload: string }
  | { type: 'SET_CHANGE_EMAIL'; payload: boolean }
  | { type: 'SET_CHANGE_PASSWORD'; payload: boolean }
  | { type: 'SET_CHANGE_NAME'; payload: boolean }
  | { type: 'SET_CHANGE_PHONE_NUMBER'; payload: boolean }
  | { type: 'SET_CHANGE_ADDRESS'; payload: boolean };
