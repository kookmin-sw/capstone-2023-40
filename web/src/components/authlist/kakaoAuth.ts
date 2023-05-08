const KAKAO_REST_API_KEY = '51feec3de9b441289713bc0d98fee11b';
const KAKAO_REDIRECT_URI = 'http://localhost:3000/mypage/authentication';
export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;
