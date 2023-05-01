import React, { useState } from 'react';

import styled from 'styled-components';

import BackgroundImage from '../assets/main-page.webp';
import Header from '../components/Header';
import LoginForm from '../components/LoginForm';
import { useTheme } from '../hooks/useTheme';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url(${BackgroundImage}) no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
`;

export default function LoginPage() {
  const [theme, toggleTheme] = useTheme();

  return (
    <Container>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <LoginForm theme={theme} />
    </Container>
  );
}
