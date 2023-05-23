import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

import { Icons } from '../../assets/svg/index';
import Header from '../../components/Header';
import { useTheme } from '../../hooks/useTheme';
import { RootState } from '../../reducers';
import { authConnect, authComplete, getApiUserInformation } from '../../utils/authService';

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(15deg);
  }
  100% {
    transform: rotate(30deg);
  }
`;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${(props) => props.theme.colors.container};
`;

export const LoadingImage = styled(Icons.LOADING).attrs({
  width: 150,
  height: 150,
})`
  display: flex;
  justify-content: center;
  text-align: center;
  padding: 1.5vh;
  margin-left: 1vh;
  border-radius: 30px;
  animation: ${rotate} 1s linear infinite;
`;

const AuthenticationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 5vw;
  min-width: 40vh;
  height: 80vh;
  background-color: ${(props) => props.theme.colors.container};
`;
const TextType = styled.span`
  border: none;
  justify-content: center;
  text-align: center;
  font-size: calc(1vh + 1.4vmin);
  font-weight: 900;
  color: ${(props) => props.theme.colors.default};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const Button = styled.button`
  margin-top: 1vh;
  border: none;
  padding: 2vh;
  padding-left: 8vw;
  padding-right: 8vw;
  border-radius: ${(props) => props.theme.borderRadius};
  font-size: 2vh;
  font-weight: 700;
  color: ${(props) => props.theme.colors.text};
  background-color: ${(props) => props.theme.colors.button};
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.colors.btnhover};
  }
`;

export default function AuthenticationPage() {
  const [theme, toggleTheme] = useTheme();
  const navigate = useNavigate();
  const [connectService, setConnectService] = useState(false);
  const surveyAuthState = useSelector((state: RootState) => state.surveyAuth);
  const dispatch = useDispatch();
  const username = useSelector((state: RootState) => state.userInformation.name);
  const completeAuthState = surveyAuthState.checkCompleteAuth;
  const checkAuthServiceTitle = surveyAuthState.checkAuthService;
  const urlParams = new URLSearchParams(window.location.search);
  const authCode = urlParams.get('code');

  // 인가 코드가 오면 해당 인증사이트에서 가져온 사용자 개인정보 조회.
  useEffect(() => {
    if (authCode !== null) {
      // FIXME: 추가 인증방식을 도입할때 리팩토링 할 것.
      getApiUserInformation(checkAuthServiceTitle, authCode, username, dispatch);
    }
  }, [authCode]);

  // 인증 완료 상태(completeAuthState)일 때, 인증 성공여부(checkSuccessAuth) 판별.
  if (completeAuthState) {
    return (
      <Container theme={theme}>
        <Header theme={theme} toggleTheme={toggleTheme} />
        <AuthenticationContainer theme={theme}>
          <Form>
            <TextType theme={theme}>
              {!surveyAuthState.checkSuccessAuth ? `사용자 인증에 실패했습니다` : `인증이 완료되었습니다!`}!
            </TextType>
            <Button
              theme={theme}
              onClick={() => authComplete(checkAuthServiceTitle, surveyAuthState, dispatch, navigate)}
            >
              돌아가기
            </Button>
          </Form>
        </AuthenticationContainer>
      </Container>
    );
  }
  return (
    <Container theme={theme}>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <AuthenticationContainer theme={theme}>
        <Form>
          <LoadingImage>
            <circle cx="50" cy="50" r="50" />
          </LoadingImage>
          <TextType theme={theme}>
            {!connectService ? `${checkAuthServiceTitle}에서 인증을 완료해주세요.` : `인증 진행중 입니다.`}
          </TextType>
          {!connectService && (
            <Button theme={theme} onClick={() => authConnect(checkAuthServiceTitle, setConnectService, dispatch)}>
              인증하기
            </Button>
          )}
        </Form>
      </AuthenticationContainer>
    </Container>
  );
}
