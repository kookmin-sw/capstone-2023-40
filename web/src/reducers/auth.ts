import { AuthAction, AuthState } from '../types/auth';

/**
 * A reducer that manages state of authentication provider according to action type.
 *
 * @param {AuthState} state - Current state of auth provider if authenticated.
 * @param {AuthAction} action - The type of auth provider to check
 * @returns {AuthState} Updated state
 */
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
      return { ...state, driverLicense: action.payload };
    case 'AUTH_WEBMAIL':
      return { ...state, webmail: action.payload };
    default:
      return state;
  }
};
