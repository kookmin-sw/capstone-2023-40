import axios from 'axios';
import { useDispatch } from 'react-redux';

import { setCompleteAuth, setSuccessAuth } from '../../types/surveyAuth';

// FIXME: turn on KAKAO_REDIRECT_URL in thesurvey Service,
/**
 * Auth Service with Kakao API Connecting
 * @NAVER_CLIENT_ID : Naver developers에서 발급받은 Client ID
 * @NAVER_CLIENT_SECRET : Naver developers에서 발급받은 Client secret
 * @NAVER_CALLBACK_URL : Naver developers에서 설정한 사용가능 한 URI
 * develop's NAVER URL : http://localhost:3000/mypage/authentication
 * users's NAVER URL : http://thesurvey.kr/mypage/authentication
 */
export const NAVER_CLIENT_ID = 'e499dAfX5WZKordXSfe_';
export const NAVER_CLIENT_SECRET = 'UhouC3zcUX';
export const NAVER_CALLBACK_URL = 'http://localhost:3000/mypage/authentication';
export const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&redirect_uri=${NAVER_CALLBACK_URL}&state=${Math.random()
  .toString(36)
  .slice(2, 10)}`;

/**
 * 네이버 사용자 정보 조회를 위한 Function
 * @param naverToken : 네이버에서 받은 인자코드를 사용하여 받은 token값
 */
export const getNaverProfile = async (naverToken: any, username: string, dispatch = useDispatch()) => {
  try {
    const naverUser = await axios({
      method: 'GET',
      url: `https://kapi.kakao.com/v2/user/me`,
      headers: {
        Authorization: `Bearer ${naverToken}`,
      },
    });
    const name = naverUser.data.properties.nickname;
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

/**
 * 네이버에서 받는 인자 코드로 사용자 정보 조회하기. (인자 코드 -> token -> user data)
 * @param authCode : 네이버에서 로그인 후 받은 고유 인자코드(로그인 성공시 받음)
 * @param username : The Survey에서 사용하는 사용자의 이름.
 * @param dispatch : 페이지변경이 일어나도 인증과정에 필요한 변수값들을 유지.
 */
export const getNaverUserData = async (authCode: string, username: string, dispatch = useDispatch()) => {
  const params = new URLSearchParams();
  params.append('grant_type', 'authorization_code');
  params.append('client_id', NAVER_CLIENT_ID);
  params.append('redirect_uri', NAVER_CALLBACK_URL);
  params.append('code', authCode);

  const response = await axios.post('https://kauth.kakao.com/oauth/token', params.toString(), {
    headers: {
      'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
  });
  getNaverProfile(response.data.access_token, username, dispatch);
};
