import axios from 'axios';
import { useDispatch } from 'react-redux';

import { setCompleteAuth, setSuccessAuth } from '../../types/surveyAuth';

export const KAKAO_REST_API_KEY = '076bd4745b2957a7567361ad04b58a57';
export const KAKAO_REDIRECT_URI = 'http://localhost:3000/mypage/authentication';
export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;
/**
 * Auth Service with Kakao API Connecting
 * develop's KAKAO URL : http://localhost:3000/mypage/authentication
 * users's KAKAO URL : http://thesurvey.kr/mypage/authentication
 */
// FIXME: turn on KAKAO_REDIRECT_URL in thesurvey Service,
// FIXME: process.env로 KEY값 보안설정하기.
// const KAKAO_REDIRECT_URI = 'http://thesurvey.kr/mypage/authentication';

export const getKakaoProfile = async (kakaoToken: any, username: string, dispatch = useDispatch()) => {
  try {
    const kakaoUser = await axios({
      method: 'GET',
      url: `https://kapi.kakao.com/v2/user/me`,
      headers: {
        Authorization: `Bearer ${kakaoToken}`,
      },
    });
    const name = kakaoUser.data.properties.nickname;
    console.log('theSurvey username : ', username);
    console.log('kakaoUser name : ', name);

    if (name === username) {
      console.log('사용자가 같습니다!');
      dispatch(setSuccessAuth(true));
    }
    dispatch(setCompleteAuth(true));
  } catch (error) {
    console.log(error);
  }
};

export const getKakaoUserData = async (authCode: string, username: string, dispatch = useDispatch()) => {
  const params = new URLSearchParams();
  params.append('grant_type', 'authorization_code');
  params.append('client_id', KAKAO_REST_API_KEY); // 카카오 디벨로퍼스에서 발급받은 클라이언트 아이디
  params.append('redirect_uri', KAKAO_REDIRECT_URI); // 카카오 디벨로퍼스에서 설정한 리다이렉트 URI
  params.append('code', authCode);

  const response = await axios.post('https://kauth.kakao.com/oauth/token', params.toString(), {
    headers: {
      'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
  });
  getKakaoProfile(response.data.access_token, username, dispatch);
};
