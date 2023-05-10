/**
 * Auth Service with Kakao API Connecting
 * develop's KAKAO URL : http://localhost:3000/mypage/authentication
 * users's KAKAO URL : http://thesurvey.kr/mypage/authentication
 */
export default function authServiceWithKakao() {
  const KAKAO_REST_API_KEY = '51feec3de9b441289713bc0d98fee11b';
  const KAKAO_REDIRECT_URI = 'http://localhost:3000/mypage/authentication';
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;

  window.location.href = KAKAO_AUTH_URL;
}

// FIXME: turn on KAKAO_REDIRECT_URL in thesurvey Service
// const KAKAO_REDIRECT_URI = 'http://thesurvey.kr/mypage/authentication';
