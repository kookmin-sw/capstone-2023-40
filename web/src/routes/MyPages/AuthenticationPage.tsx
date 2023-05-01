import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

import { Icons } from '../../assets/svg/index';
import { KAKAO_AUTH_URL } from '../../components/authlist/kakaoAuth';
import Header from '../../components/Header';
import { useTheme } from '../../hooks/useTheme';
import { RootState } from '../../reducers';
import {
  setAuthKakao,
  setAuthGoogle,
  setAuthNaver,
  setAuthDriver,
  setAuthIdentity,
  setAuthWebMail,
} from '../../types/profileAuth';

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

const WaitingImage = styled(Icons.WAITING).attrs({
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
  const [completeAuth, setCompleteAuth] = useState<boolean>(false);
  const authState = useSelector((state: RootState) => state.auth);
  const location = useLocation();
  const dispatch = useDispatch();
  const state = { ...location.state };

  const handleClick = (title: string) => {
    switch (title) {
      case '카카오':
        dispatch(setAuthKakao(authState.kakao));
        break;
      case '네이버':
        dispatch(setAuthNaver(authState.naver));
        break;
      case '구글':
        dispatch(setAuthGoogle(authState.google));
        break;
      case '신분증':
        dispatch(setAuthIdentity(authState.identityCard));
        break;
      case '운전면허':
        dispatch(setAuthDriver(authState.driverLicense));
        break;
      case '웹메일':
        dispatch(setAuthWebMail(authState.webmail));
        break;
      default:
        break;
    }
    navigate('../mypage/auth-list');
  };

  if (!completeAuth) {
    return (
      <Container theme={theme}>
        <Header theme={theme} toggleTheme={toggleTheme} />
        <AuthenticationContainer theme={theme}>
          <Form>
            <TextType theme={theme}>{state.title} 인증이 완료되었습니다!</TextType>
            <Button theme={theme} onClick={() => handleClick(state.title)}>
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
          <WaitingImage>
            <circle cx="50" cy="50" r="50" />
          </WaitingImage>
          <TextType theme={theme}>{state.title}에서 인증을 완료해주세요.</TextType>
        </Form>
      </AuthenticationContainer>
    </Container>
  );
}
