export type ProfileState = {
  point: string;
  email: string;
  password: string;
  name: string;
  phoneNumber: string;
  address: string;
};

export type ProfileAction =
  | { type: 'CHANGE_POINT'; payload: string }
  | { type: 'CHANGE_PASSWORD'; payload: string }
  | { type: 'CHANGE_PHONE_NUMBER'; payload: string }
  | { type: 'CHANGE_ADDRESS'; payload: string };
