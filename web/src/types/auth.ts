export type AuthState = {
  kakao: boolean;
  naver: boolean;
  google: boolean;
  identityCard: boolean;
  driverCard: boolean;
  schoolMail: boolean;
};

export type AuthAction =
  | { type: 'AUTH_KAKAO'; payload: boolean }
  | { type: 'AUTH_NAVER'; payload: boolean }
  | { type: 'AUTH_GOOGLE'; payload: boolean }
  | { type: 'AUTH_IDENTITY'; payload: boolean }
  | { type: 'AUTH_DRIVER'; payload: boolean }
  | { type: 'AUTH_SCHOOLMAIL'; payload: boolean };
