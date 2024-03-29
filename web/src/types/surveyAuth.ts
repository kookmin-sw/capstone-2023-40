/**
 * @VariableList : kakao, naver, google, identityCard, webmail
 * @CheckList : checkCompleteAuth(인증과정이 완료 되었는지 확인, boolean)
 * @CheckList : checkSuccessAuth(인증과정이 끝난 상태에서 사용자 인증에 성공했는지 확인, boolean)
 * @CheckList : checkAuthService(어떤 인증서버스 사용중인지 확인, string)
 */
export type SurveyAuthState = {
  kakao: boolean;
  naver: boolean;
  google: boolean;
  identityCard: boolean;
  driverLicense: boolean;
  webmail: boolean;

  checkCompleteAuth: boolean;
  checkSuccessAuth: boolean;
  checkAuthService: string;
};

export const setAuthKakao = (payload: boolean) => ({
  type: 'AUTH_KAKAO',
  payload: payload,
});

export const setAuthGoogle = (payload: boolean) => ({
  type: 'AUTH_GOOGLE',
  payload: payload,
});

export const setAuthNaver = (payload: boolean) => ({
  type: 'AUTH_NAVER',
  payload: payload,
});

export const setAuthIdentity = (payload: boolean) => ({
  type: 'AUTH_IDENTITY',
  payload: payload,
});

export const setAuthDriver = (payload: boolean) => ({
  type: 'AUTH_DRIVER',
  payload: payload,
});

export const setAuthWebMail = (payload: boolean) => ({
  type: 'AUTH_WEBMAIL',
  payload: payload,
});

export const setCompleteAuth = (payload: boolean) => ({
  type: 'COMPLETE_AUTH',
  payload: payload,
});

export const setSuccessAuth = (payload: boolean) => ({
  type: 'SUCCESS_AUTH',
  payload: payload,
});

export const setAuthService = (payload: string) => ({
  type: 'SET_AUTH_SERVICE',
  payload: payload,
});

export type SurveyAuthAction =
  | ReturnType<typeof setAuthKakao>
  | ReturnType<typeof setAuthGoogle>
  | ReturnType<typeof setAuthNaver>
  | ReturnType<typeof setAuthIdentity>
  | ReturnType<typeof setAuthDriver>
  | ReturnType<typeof setAuthWebMail>
  | ReturnType<typeof setCompleteAuth>
  | ReturnType<typeof setAuthService>;
