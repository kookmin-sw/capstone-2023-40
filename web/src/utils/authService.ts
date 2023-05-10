import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import authServiceWithKakao from '../components/authlist/kakaoAuth';
import {
  setAuthKakao,
  setAuthGoogle,
  setAuthNaver,
  setAuthDriver,
  setAuthIdentity,
  setAuthWebMail,
  setCompleteAuth,
  setAuthService,
} from '../types/surveyAuth';

// FIXME: 다른 사용자 인증 과정 추가 구현하기.
export const AuthConnect = (checkAuthServiceTitle: string, setConnectService: any) => {
  switch (checkAuthServiceTitle) {
    case '카카오':
      setConnectService(true);
      authServiceWithKakao();
      break;
    case '네이버':
      break;
    case '구글':
      break;
    case '신분증':
      break;
    case '운전면허':
      break;
    case '웹메일':
      break;
    default:
      break;
  }
};

// FIXME: 인가코드를 받으면 인증완료를 할 수 있도록 변경해야 함.
export const AuthComplete = (
  checkAuthServiceTitle: string,
  surveyAuthState: any,
  dispatch = useDispatch(),
  navigate = useNavigate()
) => {
  switch (checkAuthServiceTitle) {
    case '카카오':
      dispatch(setAuthKakao(!surveyAuthState.kakao));
      break;
    case '네이버':
      dispatch(setAuthNaver(!surveyAuthState.naver));
      break;
    case '구글':
      dispatch(setAuthGoogle(!surveyAuthState.google));
      break;
    case '신분증':
      dispatch(setAuthIdentity(!surveyAuthState.identityCard));
      break;
    case '운전면허':
      dispatch(setAuthDriver(!surveyAuthState.driverLicense));
      break;
    case '웹메일':
      dispatch(setAuthWebMail(!surveyAuthState.webmail));
      break;
    default:
      break;
  }
  dispatch(setCompleteAuth(false));
  dispatch(setAuthService(''));
  navigate('../mypage/auth-list');
};
