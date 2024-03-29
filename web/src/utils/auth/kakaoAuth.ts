import axios from 'axios';
import { useDispatch } from 'react-redux';

import { setCompleteAuth, setSuccessAuth } from '../../types/surveyAuth';

export const KAKAO_REST_API_KEY = `${process.env.REACT_APP_KAKAO_REST_API_KEY}`;
export const KAKAO_REDIRECT_URI =
  process.env.NODE_ENV === 'production'
    ? `${process.env.REACT_APP_KAKAO_REDIRECT_URL}`
    : `${process.env.REACT_APP_DEVELOP_KAKAO_REDIRECT_URL}`;
export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;

// 다른 로그인 환경에 영향을 끼치는 것을 방지하기 위한 kakao token값 초기화
export const unlinkKakao = async (kakaoToken: string) => {
  const res = await axios({
    method: 'POST',
    url: `https://kapi.kakao.com/v1/user/unlink`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${kakaoToken}`,
    },
  });
};

/**
 * 카카오 사용자 정보 조회를 위한 Function
 * @param kakaoToken : 카카오에서 받은 인자코드를 사용하여 받은 token값
 */
export const getKakaoProfile = async (kakaoToken: string, username: string, dispatch = useDispatch()) => {
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
      console.log('카카오 인증 완료!');
      dispatch(setSuccessAuth(true));
    } else {
      // FIXME: handle logic for wrong username
      console.log('사용자가 다릅니다!');
    }
    unlinkKakao(kakaoToken);
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
