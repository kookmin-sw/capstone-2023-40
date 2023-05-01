import React from 'react';

import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import NotFoundImage from '../assets/not-found.webp';
import Header from '../components/Header';
import { useTheme } from '../hooks/useTheme';

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  background-color: ${(props) => props.theme.colors.container};
`;

const Title = styled.h1`
  margin-top: 10vh;
  color: ${(props) => props.theme.colors.default};
`;

const Content = styled.div``;

const Image = styled.img``;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Button = styled.button`
  margin-top: 5vh;
  padding: 1em;
  font-size: 1.2em;
  border: none;
  border-radius: ${(props) => props.theme.borderRadius};
  background-color: ${(props) => props.theme.colors.primary};
  cursor: pointer;
  font-weight: 700;
  color: white;

  &:hover {
    background-color: ${(props) => props.theme.colors.prhover};
  }
`;

export default function NotFound() {
  const [theme, toggleTheme] = useTheme();
  const navigate = useNavigate();

  return (
    <Container theme={theme}>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <Title theme={theme}>🫣 요청하신 페이지를 찾을 수 없습니다.</Title>
      <Content theme={theme}>
        <Image src={NotFoundImage} alt="not-found-image" />
        <ButtonContainer>
          <Button theme={theme} onClick={() => navigate('/')}>
            홈 화면으로 돌아가기
          </Button>
        </ButtonContainer>
      </Content>
    </Container>
  );
}
