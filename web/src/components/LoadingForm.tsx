import React from 'react';

import styled from 'styled-components';

import { useTheme } from '../hooks/useTheme';
import { LoadingImage } from '../routes/MyPages/AuthenticationPage';
import Header from './Header';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${(props) => props.theme.colors.container};
`;

const LoadingBoxContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-bottom: 1vh;
  background-color: ${(props) => props.theme.colors.container};
  border: ${(props) => props.theme.borderResultList};
  border-radius: ${(props) => props.theme.borderRadius};
  background-color: ${(props) => props.theme.colors.opposite};
`;

const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-top: 20vw;
`;

export default function LoadingForm() {
  const [theme, toggleTheme] = useTheme();

  return (
    <Container theme={theme}>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <LoadingBoxContainer>
        <Form>
          <LoadingImage>
            <circle cx="50" cy="50" r="50" />
          </LoadingImage>
        </Form>
      </LoadingBoxContainer>
    </Container>
  );
}
