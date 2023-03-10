import React, { useState, ReactNode } from 'react';

import { useNavigate } from 'react-router-dom';
import styled, { DefaultTheme } from 'styled-components';

import { ReactComponent as LogoDark } from '../assets/svg/logo-dark.svg';
import { ReactComponent as LogoLight } from '../assets/svg/logo-light.svg';
import ThemeToggle from './ThemeToggle';

const HeaderContainer = styled.header<{ isTransitionEnabled: boolean }>`
  position: sticky;
  top: 0;
  width: 100vw;
  display: flex;
  flex-direction: row;
  background-color: ${(props) => props.theme.colors.header};
  transition: ${(props) => (props.isTransitionEnabled ? 'background-color 300ms linear' : 'none')};
  -webkit-transition: ${(props) => (props.isTransitionEnabled ? 'background-color 300ms linear' : 'none')};
  -ms-transition: ${(props) => (props.isTransitionEnabled ? 'background-color 300ms linear' : 'none')};
  -o-transition: ${(props) => (props.isTransitionEnabled ? 'background-color 300ms linear' : 'none')};
  -ms-transition: ${(props) => (props.isTransitionEnabled ? 'background-color 300ms linear' : 'none')};
`;

const LogoLightContainer = styled(LogoLight)`
  margin-left: 2vw;
  width: 150px;
  height: fit-content;
  cursor: pointer;
`;

const LogoDarkContainer = styled(LogoDark)`
  margin-left: 2vw;
  width: 150px;
  height: fit-content;
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
  const [isTransitionEnabled, setIsTransitionEnabled] = useState<boolean>(false);

  const handleClick = () => {
    setIsTransitionEnabled(true);
    toggleTheme();
  };

  return (
    <HeaderContainer theme={theme} isTransitionEnabled={isTransitionEnabled}>
      {theme.alt === 'light' ? (
        <LogoLightContainer onClick={() => navigate('/')} title="logo" />
      ) : (
        <LogoDarkContainer onClick={() => navigate('/')} title="logo" />
      )}
      <NavigatorContainer theme={theme}>
        <Navigator onClick={() => navigate('/survey')}>설문</Navigator>
        <Navigator onClick={() => navigate('/report')}>리포트</Navigator>
      </NavigatorContainer>
      <ButtonContainer>
        {/* FIXME: Modify this to icon */}
        <ThemeToggle />
      </ButtonContainer>
    </HeaderContainer>
  );
}
