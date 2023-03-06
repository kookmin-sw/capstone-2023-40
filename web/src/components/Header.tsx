import React, { ReactNode } from 'react';

import { useNavigate } from 'react-router-dom';
import styled, { DefaultTheme } from 'styled-components';

const HeaderContainer = styled.header`
  position: sticky;
  top: 0;
  width: 100vw;
  display: flex;
  flex-direction: row;
  background-color: ${(props) => props.theme.colors.background};
  transition: background-color 300ms linear;
  -webkit-transition: background-color 300ms linear;
  -ms-transition: background-color 300ms linear;
  -o-transition: background-color 300ms linear;
  -ms-transition: background-color 300ms linear;
`;

// FIXME: To relative value. Would `img` tag be fine?
const Logo = styled.img`
  margin-left: 2vw;
  width: 150px;
  src: ${(props) => props.src};
  cursor: pointer;
`;

const ButtonContainer = styled.div`
  margin-left: auto;
  display: flex;
  flex-direction: row;
`;

const NavigatorContainer = styled.ul`
  color: ${(props) => props.theme.colors.default};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2vw;
  list-style-type: none;
  margin: 0;
  padding: 0;
  flex: 1;
`;

const Navigator = styled.li`
  font-size: 2vh;
  font-weight: 600;
  cursor: pointer;
  padding: 1vw;

  &:hover {
    opacity: 0.5;
    transition: all 0.15s ease-in-out;
  }
`;

const ToggleButton = styled.button`
  text-decoration: none;
  margin-right: 2vw;
  border: none;
  padding: ${(props) => props.theme.padding};
  background-color: ${(props) => props.theme.colors.button};
`;

interface HeaderProps {
  button?: HTMLButtonElement | ReactNode;
  theme: DefaultTheme;
  toggleTheme: () => void;
}

export default function Header({ button, theme, toggleTheme }: HeaderProps) {
  const navigate = useNavigate();

  return (
    <HeaderContainer theme={theme}>
      <Logo src={require('../assets/logo.svg').default} alt="logo" onClick={() => navigate('/')} />
      <NavigatorContainer theme={theme}>
        <Navigator onClick={() => navigate('/survey')}>설문</Navigator>
        <Navigator onClick={() => navigate('/report')}>리포트</Navigator>
      </NavigatorContainer>
      <ButtonContainer>
        {/* FIXME: Modify this to icon */}
        <ToggleButton type="button" theme={theme} onClick={toggleTheme}>
          button
        </ToggleButton>
      </ButtonContainer>
    </HeaderContainer>
  );
}
