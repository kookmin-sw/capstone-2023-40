import axios from 'axios';
import { useDispatch } from 'react-redux';

import { setCompleteAuth, setSuccessAuth } from '../../types/surveyAuth';

// FIXME: turn on KAKAO_REDIRECT_URL in thesurvey Service,
/**
 * Auth Service with Kakao API Connecting
 * @KAKAO_REST_API_KEY : kakao developers에서 발급받은 Client ID
 * @KAKAO_REDIRECT_URL : kakao developers에서 설정한 사용가능 한 URI
 * develop's KAKAO URL : http://localhost:3000/mypage/authentication
 * users's KAKAO URL : http://thesurvey.kr/mypage/authentication
 */
export const KAKAO_REST_API_KEY = '076bd4745b2957a7567361ad04b58a57';
export const KAKAO_REDIRECT_URI = 'http://localhost:3000/mypage/authentication';
export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;

/**
 * 카카오 사용자 정보 조회를 위한 Function
 * @param kakaoToken : 카카오에서 받은 인자코드를 사용하여 받은 token값
 */
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
    } else {
      console.log('사용자가 다릅니다!');
    }
    dispatch(setCompleteAuth(true));
  } catch (error) {
    console.log(error);
  }
};

/**
 * 카카오에서 받는 인자 코드로 사용자 정보 조회하기. (인자 코드 -> token -> user data)
 * @param authCode : 카카오에서 로그인 후 받은 고유 인자코드(로그인 성공시 받음)
 * @param username : The Survey에서 사용하는 사용자의 이름.
 * @param dispatch : 페이지변경이 일어나도 인증과정에 필요한 변수값들을 유지.
 */
export const getKakaoUserData = async (authCode: string, username: string, dispatch = useDispatch()) => {
  const params = new URLSearchParams();
  params.append('grant_type', 'authorization_code');
  params.append('client_id', KAKAO_REST_API_KEY);
  params.append('redirect_uri', KAKAO_REDIRECT_URI);
  params.append('code', authCode);
  console.log(params.toString());

  await axios
    .post('https://kauth.kakao.com/oauth/token', params.toString(), {
      headers: {
        'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    })
    .then((res) => {
      if (res.status === 200) {
        getKakaoProfile(res.data.access_token, username, dispatch);
      }
    });
};
