import { AuthState, AuthAction } from '../types/auth';

export const initialState: AuthState = {
  kakao: false,
  naver: false,
  google: false,
  identityCard: false,
  driverLicense: false,
  webmail: false,
};

export const initialAction: AuthAction = {
  type: 'AUTH_KAKAO',
  payload: false,
};

/**
 * Check login status and Open status of SubPage
 *
 * @param {AuthState} state: State value of Check Login and Opened SubPage
 * @param {AuthAction} action: Action method for setLogin and setSubPageOpen
 * @returns {AuthState} state Updated state value of Check Login and Opened SubPage
 */
export const authReducer = (state: AuthState = initialState, action: AuthAction = initialAction): AuthState => {
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
      return { ...state, driverLicense: action.payload };
    case 'AUTH_WEBMAIL':
      return { ...state, webmail: action.payload };
    default:
      return state;
  }
};
