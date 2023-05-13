import { SurveyAuthAction, SurveyAuthState } from '../types/surveyAuth';

const initialState: SurveyAuthState = {
  kakao: false,
  naver: false,
  google: false,
  identityCard: false,
  driverLicense: false,
  webmail: false,

  checkCompleteAuth: false,
  checkSuccessAuth: false,
  checkAuthService: '',
};

const initialAction: SurveyAuthAction = {
  type: 'AUTH_KAKAO',
  payload: false,
};

/**
 * A reducer that manages state of authentication providers when creating survey
 * according to action type.
 * action type은 현재 { boolean, string } 두가지 타입을 가지고 있기 때문에,
 * 각각의 action type을 알맞게 강제시킴.
 *
 * @param {SurveyAuthState} state - Current state of auth provider if authenticated.
 * @param {SurveyAuthAction} action - The type of auth provider to check
 * @returns {SurveyAuthState} Updated survey authentication provider's state
 */
export const surveyAuthReducer = (
  state: SurveyAuthState = initialState,
  action: SurveyAuthAction = initialAction
): SurveyAuthState => {
  switch (action.type) {
    case 'AUTH_KAKAO':
      return { ...state, kakao: !!action.payload };
    case 'AUTH_NAVER':
      return { ...state, naver: !!action.payload };
    case 'AUTH_GOOGLE':
      return { ...state, google: !!action.payload };
    case 'AUTH_IDENTITY':
      return { ...state, identityCard: !!action.payload };
    case 'AUTH_DRIVER':
      return { ...state, driverLicense: !!action.payload };
    case 'AUTH_WEBMAIL':
      return { ...state, webmail: !!action.payload };
    case 'COMPLETE_AUTH':
      return { ...state, checkCompleteAuth: !!action.payload };
    case 'SUCCESS_AUTH':
      return { ...state, checkSuccessAuth: !!action.payload };
    case 'SET_AUTH_SERVICE':
      return { ...state, checkAuthService: action.payload.toString() };
    default:
      return state;
  }
};
