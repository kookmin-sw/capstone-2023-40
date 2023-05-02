export type SurveyAuthState = {
  kakao: boolean;
  naver: boolean;
  google: boolean;
  identityCard: boolean;
  driverLicense: boolean;
  webmail: boolean;
};

export const setAuthKakao = (payload: boolean) => ({
  type: 'AUTH_KAKAO',
  payload: !payload,
});

export const setAuthGoogle = (payload: boolean) => ({
  type: 'AUTH_GOOGLE',
  payload: !payload,
});

export const setAuthNaver = (payload: boolean) => ({
  type: 'AUTH_NAVER',
  payload: !payload,
});

export const setAuthIdentity = (payload: boolean) => ({
  type: 'AUTH_IDENTITY',
  payload: !payload,
});

export const setAuthDriver = (payload: boolean) => ({
  type: 'AUTH_DRIVER',
  payload: !payload,
});

export const setAuthWebMail = (payload: boolean) => ({
  type: 'AUTH_WEBMAIL',
  payload: !payload,
});

// export type SurveyAuthAction =
//   | { type: 'AUTH_KAKAO'; payload: boolean }
//   | { type: 'AUTH_NAVER'; payload: boolean }
//   | { type: 'AUTH_GOOGLE'; payload: boolean }
//   | { type: 'AUTH_IDENTITY'; payload: boolean }
//   | { type: 'AUTH_DRIVER'; payload: boolean }
//   | { type: 'AUTH_WEBMAIL'; payload: boolean };

export type SurveyAuthAction =
  | ReturnType<typeof setAuthKakao>
  | ReturnType<typeof setAuthGoogle>
  | ReturnType<typeof setAuthNaver>
  | ReturnType<typeof setAuthIdentity>
  | ReturnType<typeof setAuthDriver>
  | ReturnType<typeof setAuthWebMail>;
