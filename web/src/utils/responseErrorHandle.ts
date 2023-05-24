import { AxiosError } from 'axios';
import { Dispatch } from 'redux';

import { setLoggedIn, HeaderAction } from '../types/header';

export const responseErrorHandle = (error: AxiosError, dispatch: Dispatch<HeaderAction>): string[] => {
  const { response } = error as AxiosError;

  let labelText = typeof response?.data === 'string' ? response.data : '';
  let buttonText = '';
  let navigateRoute = '';

  switch (response?.status) {
    case 400:
      if (labelText !== '') {
        buttonText = '확인';
      } else {
        labelText = '잘못된 요청이에요. 다시 시도 해주세요.';
        buttonText = '홈화면으로 돌아가기';
        navigateRoute = '/';
      }
      break;
    case 401:
      if (labelText === '설문조사에 필요한 인증을 완료해주세요.') {
        buttonText = '인증 하러 가기';
        navigateRoute = '/mypage/auth-list';
      } else if (labelText === '권한이 없습니다') {
        labelText = '로그인이 만료 되었어요.';
        buttonText = '로그인 하러 가기';
        navigateRoute = '/login';
      }
      break;
    case 403:
      buttonText = '설문 리스트로 돌아가기';
      navigateRoute = '/survey';
      break;
    case 500:
      labelText = '앗! 서버에 문제가 생겼어요.';
      navigateRoute = '/';
      break;
    default:
      labelText = `${response?.status} 에러가 발생했어요.`;
      buttonText = '홈화면으로 돌아가기';
      navigateRoute = '/';
      break;
  }

  return [labelText, buttonText, navigateRoute];
};
