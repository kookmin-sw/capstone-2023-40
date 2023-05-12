import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { KAKAO_AUTH_URL } from '../components/authlist/kakaoAuth';
import { NAVER_AUTH_URL } from '../components/authlist/naverAuth';
import {
  setAuthKakao,
  setAuthGoogle,
  setAuthNaver,
  setAuthDriver,
  setAuthIdentity,
  setAuthWebMail,
  setCompleteAuth,
  setAuthService,
  setSuccessAuth,
} from '../types/surveyAuth';

// FIXME: 다른 사용자 인증 과정 추가 구현하기.
export const authConnect = (checkAuthServiceTitle: string, setConnectService: any) => {
  setConnectService(true);
  switch (checkAuthServiceTitle) {
    case '카카오':
      window.location.href = KAKAO_AUTH_URL;
      break;
    case '네이버':
      console.log('네이버 로그인');
      window.location.href = NAVER_AUTH_URL;
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

// 사용자 정보 조회가 일치하면 인증성공(완료) => 인증여부 변경.
export const authComplete = (
  checkAuthServiceTitle: string,
  surveyAuthState: any,
  dispatch = useDispatch(),
  navigate = useNavigate()
) => {
  if (surveyAuthState.checkSuccessAuth) {
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
  }

  // 인증 후, 인증관련 데이터 변수 초기화.
  dispatch(setCompleteAuth(false));
  dispatch(setSuccessAuth(false));
  dispatch(setAuthService(''));
  navigate('../mypage/auth-list');
};
