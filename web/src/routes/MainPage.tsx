import React from 'react';

import styled from 'styled-components';

import BackgroundImage from '../assets/main-page.webp';
import Header from '../components/Header';
import { useTheme } from '../hooks/useTheme';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: url(${BackgroundImage}) no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
`;

const Introduction = styled.div`
  margin-top: 30vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  color: white;
  font-size: 5vh;
  font-weight: 500;
`;

const Description = styled.p`
  word-break: break-word;
  word-break: keep-all;
`;

const AppTitle = styled.span`
  font-weight: 700;
`;

const Button = styled.button`
  margin-top: 5vh;
  border: none;
  padding: 2vh;
  padding-left: 4vw;
  padding-right: 4vw;
  border-radius: ${(props) => props.theme.borderRadius};
  font-size: 2vh;
  font-weight: 700;
  color: white;
  background-color: ${(props) => props.theme.colors.primary};
`;

export default function MainPage() {
  const [theme, toggleTheme] = useTheme();

  return (
    <Container>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <Introduction>
        <Description>
          설문의 모든 것
          <br />
          <AppTitle>더 서베이</AppTitle>
          에서 쉽고 간편하게
        </Description>
        <Button theme={theme}>바로 설문하기</Button>
      </Introduction>
    </Container>
  );
}
