import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

const instance: AxiosInstance = axios.create({
  // FIXME: 원활한 thesurvey.kr 사용을 위한 Base url 변경,
  // FIXME: 구현 및 테스트시 BaseUrl을 변경하여 사용할 것.
  baseURL: 'https://api.thesurvey.kr/v1',
  // baseURL: 'http://localhost:8080/v1',
  // timeout: 15000,
  withCredentials: true,
});

// 요청 인터셉터 추가하기
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 요청이 전달되기 전에 작업 수행
    // TODO: Validate request interface
    return config;
  },
  (error: AxiosError) => {
    // 요청 오류가 있는 작업 수행
    return Promise.reject(error);
  }
);

// 응답 인터셉터 추가하기
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    // 2xx 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
    // 응답 데이터가 있는 작업 수행
    return response;
  },
  (error: AxiosError) => {
    // 2xx 외의 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
    // 응답 오류가 있는 작업 수행
    // TODO: Show alert modal or something else
    return Promise.reject(error);
  }
);
export default instance;
