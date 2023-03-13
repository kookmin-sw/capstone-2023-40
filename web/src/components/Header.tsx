import React, { useState, ReactNode } from 'react';

import { useNavigate } from 'react-router-dom';
import styled, { DefaultTheme } from 'styled-components';

import { ReactComponent as SunMode } from '../assets/svg/darkmodeoff.svg';
import { ReactComponent as MoonMode } from '../assets/svg/darkmodeon.svg';
import { ReactComponent as LogoDark } from '../assets/svg/logo-dark.svg';
import { ReactComponent as LogoLight } from '../assets/svg/logo-light.svg';

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

const LightMode = styled(SunMode)`
  margin-top: 1.5vh;
  width: fit-content;
  height: 40px;
  cursor: pointer;
`;

const DarkMode = styled(MoonMode)`
  margin-top: 1.5vh;
  width: fit-content;
  height: 40px;
  cursor: pointer;
  background-color: white;
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
  font-size: calc(1.5vh + 0.5vmin);
  font-weight: 600;
  cursor: pointer;
  padding: 1vw;

  &:hover {
    opacity: 0.5;
    transition: all 0.15s ease-in-out;
  }
`;

const LoginInformation = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: calc(1.5vh + 0.5vmin);
  font-weight: 800;
  color: ${(props) => props.theme.colors.text};
  margin: 10px;
  border: none;
  border-radius: ${(props) => props.theme.borderRadius};
  padding: 1vw;
  cursor: pointer;
  background-color: ${(props) => props.theme.colors.button};

  &:hover {
    background-color: ${(props) => props.theme.colors.btnhover};
  }
`;

interface HeaderProps {
  // button?: HTMLButtonElement | ReactNode;
  theme: DefaultTheme;
  toggleTheme: () => void;
}

export default function Header({ theme, toggleTheme }: HeaderProps) {
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
        {theme.alt === 'light' ? (
          <LightMode onClick={handleClick} title="Darkmode On" />
        ) : (
          <DarkMode onClick={handleClick} title="Darkmode Off" />
        )}
        <LoginInformation onClick={() => navigate('/login')} theme={theme}>
          로그인/회원가입{' '}
        </LoginInformation>
      </ButtonContainer>
    </HeaderContainer>
  );
}
