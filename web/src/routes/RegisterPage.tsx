import React from 'react';

import styled from 'styled-components';

import Header from '../components/Header';
import RegisterForm from '../components/RegisterForm';
import { useTheme } from '../hooks/useTheme';

const Container = styled.div`
  width: 100vw;
  height: 130vh;
  background-color: ${(props) => props.theme.colors.container};
`;

export default function RegisterPage() {
  const [theme, toggleTheme] = useTheme();

  return (
    <Container theme={theme}>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <RegisterForm theme={theme} />
    </Container>
  );
}
