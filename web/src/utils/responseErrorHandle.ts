import { AxiosError } from 'axios';

export const responseErrorHandle = (error: AxiosError): string[] => {
  const { response } = error as AxiosError;

  let labelText = '';
  let buttonText = '';
  let navigateRoute = '';

  switch (response?.status) {
    case 400:
      labelText = `${response?.data}`;
      buttonText = '확인';
      break;
    case 401:
      labelText = '로그인이 만료 되었습니다.';
      buttonText = '로그인 하러 가기';
      navigateRoute = '/login';
      break;
    case 403:
      labelText = `${response?.data}`;
      buttonText = '설문 리스트로 돌아가기';
      navigateRoute = '/survey';
      break;
    case 500:
      labelText = '서버에 문제가 생겼습니다.';
      navigateRoute = '/';
      break;
    default:
      labelText = `${response?.data}`;
      buttonText = '홈화면으로 돌아가기';
      navigateRoute = '/';
      break;
  }

  return [labelText, buttonText, navigateRoute];
};
