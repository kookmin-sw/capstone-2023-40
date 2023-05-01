import { SurveyAuthAction, SurveyAuthState } from '../types/surveyAuth';

/**
 * A reducer that manages state of authentication providers when creating survey
 * according to action type.
 *
 * @param {SurveyAuthState} state - Current state of auth provider if authenticated.
 * @param {SurveyAuthAction} action - The type of auth provider to check
 * @returns {SurveyAuthState} Updated survey authentication provider's state
 */
export const surveyAuthReducer = (state: SurveyAuthState, action: SurveyAuthAction): SurveyAuthState => {
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
