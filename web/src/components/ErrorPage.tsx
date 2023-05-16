import React from 'react';

import { useNavigate } from 'react-router';
import styled, { DefaultTheme } from 'styled-components';

import RectangleButton from './Button/RectangleButton';
import Header from './Header';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${(props) => props.theme.colors.container};
`;

const Notification = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-top: 35vh;
  padding: 10px;
`;

const Label = styled.label`
  font-size: 50px;
  font-weight: 700;
  color: ${(props) => props.theme.colors.default};
  text-align: center;

  @media screen and (max-width: 700px) {
    font-size: 30px;
  }
`;

interface ErrorPageProps {
  labelText: string;
  buttonText: string;
  navigateRoute: string;
  theme: DefaultTheme;
  toggleTheme: () => void;
}

export default function ErrorPage({ labelText, buttonText, navigateRoute, theme, toggleTheme }: ErrorPageProps) {
  const navigate = useNavigate();

  return (
    <Container theme={theme}>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <Notification theme={theme}>
        <Label theme={theme}>{labelText}</Label>
        <br />
        <RectangleButton
          text={buttonText}
          width="250px"
          backgroundColor={theme.colors.primary}
          hoverColor={theme.colors.prhover}
          handleClick={() => navigate(`${navigateRoute}`)}
          theme={theme}
        />
      </Notification>
    </Container>
  );
}
