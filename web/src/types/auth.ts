export type AuthState = {
  kakao: boolean;
  naver: boolean;
  google: boolean;
  identityCard: boolean;
  driverLicense: boolean;
  webmail: boolean;
};

export type AuthAction =
  | { type: 'AUTH_KAKAO'; payload: boolean }
  | { type: 'AUTH_NAVER'; payload: boolean }
  | { type: 'AUTH_GOOGLE'; payload: boolean }
  | { type: 'AUTH_IDENTITY'; payload: boolean }
  | { type: 'AUTH_DRIVER'; payload: boolean }
  | { type: 'AUTH_WEBMAIL'; payload: boolean };
