import React from 'react';

import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

import { Icons } from '../../assets/svg/index';
import { KAKAO_AUTH_URL } from '../../components/authlist/kakaoAuth';
import Header from '../../components/Header';
import { useTheme } from '../../hooks/useTheme';

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
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

export default function AuthenticationPage() {
  const [theme, toggleTheme] = useTheme();
  const navigate = useNavigate();
  const texta = '카카오';

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const handleClick = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <Container theme={theme}>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <AuthenticationContainer theme={theme}>
        <Form>
          <WaitingImage>
            <circle cx="50" cy="50" r="50" />
          </WaitingImage>
          <TextType>{texta}에서 인증을 완료해주세요.</TextType>
        </Form>
      </AuthenticationContainer>
    </Container>
  );
}
