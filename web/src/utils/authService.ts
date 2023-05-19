import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import axios from '../api/axios';
import { requests } from '../api/request';
import { UserAuthListUpdateRequest } from '../types/request';
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
import { KAKAO_AUTH_URL, getKakaoUserData } from './authlist/kakaoAuth';
import { NAVER_AUTH_URL, getNaverUserData } from './authlist/naverAuth';

// 인증여부 초기화 - authlist api connect
export const initializeAuthList = (resData: any, dispatch = useDispatch()) => {
  if (resData.certificationInfolist !== null) {
    for (let i = 0; i < resData.certificationInfoList.length; i += 1) {
      const certicication = resData.certificationInfoList[i];
      const name = certicication.certificationName;
      const checkCertificated = certicication.isCertificated;
      console.log('인증명 : ', name, '인증여부 : ', checkCertificated);
      if (checkCertificated === true) {
        switch (name) {
          case 'KAKAO':
            dispatch(setAuthKakao(true));
            break;
          case 'NAVER':
            dispatch(setAuthNaver(true));
            break;
          case 'GOOGLE':
            dispatch(setAuthGoogle(true));
            break;
          case 'IDENTITY_CARD':
            dispatch(setAuthIdentity(true));
            break;
          case 'DRIVER_LICENSE':
            dispatch(setAuthDriver(true));
            break;
          case 'WEBMAIL':
            dispatch(setAuthWebMail(true));
            break;
          default:
            break;
        }
      }
    }
  }
};

// FIXME: 다른 사용자 인증 과정 추가 구현하기.
export const authConnect = (checkAuthServiceTitle: string, setConnectService: any, dispatch = useDispatch()) => {
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
      dispatch(setSuccessAuth(true));
      dispatch(setCompleteAuth(true));
      break;
    case '신분증':
      dispatch(setSuccessAuth(true));
      dispatch(setCompleteAuth(true));
      break;
    case '운전면허':
      dispatch(setSuccessAuth(true));
      dispatch(setCompleteAuth(true));
      break;
    case '웹메일':
      dispatch(setSuccessAuth(true));
      dispatch(setCompleteAuth(true));
      break;
    default:
      break;
  }
};

// FIXME: 추가 인증구현시 인증성공 과정을 수정.
/**
 * 인증사이트에서 로그인 성공시 개인정보를 조회하는 함수.
 */
export const getApiUserInformation = (
  checkAuthServiceTitle: string,
  authCode: string,
  username: string,
  dispatch = useDispatch()
) => {
  switch (checkAuthServiceTitle) {
    case '카카오':
      getKakaoUserData(authCode, username, dispatch);
      break;
    case '네이버':
      // getNaverUserData(authCode, username, dispatch);
      dispatch(setSuccessAuth(true));
      dispatch(setCompleteAuth(true));
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

// 사용자 정보 조회가 일치하면 인증성공(완료) => 인증여부 변경 및 api connect
export const authComplete = async (
  checkAuthServiceTitle: string,
  surveyAuthState: any,
  dispatch = useDispatch(),
  navigate = useNavigate()
) => {
  const updateAuthListBody: UserAuthListUpdateRequest = {
    isKakaoCertificated: surveyAuthState.kakao,
    isNaverCertificated: surveyAuthState.naver,
    isGoogleCertificated: surveyAuthState.google,
    isWebMailCertificated: surveyAuthState.webmail,
    isIdentityCardCertificated: surveyAuthState.identityCard,
    isDriverLicenseCertificated: surveyAuthState.driverLicense,
  };

  if (surveyAuthState.checkSuccessAuth) {
    switch (checkAuthServiceTitle) {
      case '카카오':
        dispatch(setAuthKakao(!surveyAuthState.kakao));
        updateAuthListBody.isKakaoCertificated = !surveyAuthState.kakao;
        break;
      case '네이버':
        dispatch(setAuthNaver(!surveyAuthState.naver));
        updateAuthListBody.isNaverCertificated = !surveyAuthState.naver;
        break;
      case '구글':
        dispatch(setAuthGoogle(!surveyAuthState.google));
        updateAuthListBody.isGoogleCertificated = !surveyAuthState.google;
        break;
      case '신분증':
        dispatch(setAuthIdentity(!surveyAuthState.identityCard));
        updateAuthListBody.isIdentityCardCertificated = !surveyAuthState.identityCard;
        break;
      case '운전면허':
        dispatch(setAuthDriver(!surveyAuthState.driverLicense));
        updateAuthListBody.isDriverLicenseCertificated = !surveyAuthState.driverLicense;
        break;
      case '웹메일':
        dispatch(setAuthWebMail(!surveyAuthState.webmail));
        updateAuthListBody.isWebMailCertificated = !surveyAuthState.webmail;
        break;
      default:
        break;
    }
  }

  // 인증 후, 인증관련 데이터 변수 초기화 및 인증 정보 업데이트
  dispatch(setCompleteAuth(false));
  dispatch(setSuccessAuth(false));
  dispatch(setAuthService(''));
  navigate('../mypage/auth-list');

  const res = await axios.patch<UserAuthListUpdateRequest>(requests.updateUserAuthList, updateAuthListBody);
  if (res.status === 200) {
    console.log('getUserData Success!');
  }
};
