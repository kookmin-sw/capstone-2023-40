import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import styled, { DefaultTheme } from 'styled-components';

import { Icons } from '../assets/svg';

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

const LogoLightContainer = styled(Icons.LIGHT_LOGO)`
  margin-left: 2vw;
  width: 150px;
  height: fit-content;
  cursor: pointer;

  @media only screen and (max-width: 700px) {
    display: none;
  }
`;

const LogoDarkContainer = styled(Icons.DARK_LOGO)`
  margin-left: 2vw;
  width: 150px;
  height: fit-content;
  cursor: pointer;

  @media only screen and (max-width: 700px) {
    display: none;
  }
`;

const FaviconContainer = styled(Icons.FAVICON)`
  margin: 1vw;
  margin-left: 3vw;
  width: 40px;
  height: fit-content;
  cursor: pointer;

  @media only screen and (min-width: 700px) {
    display: none;
  }
`;

const CheckBoxContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CheckBoxWrapper = styled.div`
  position: relative;
`;

const CheckBoxLabel = styled.label`
  position: absolute;
  margin: 2px;
  top: 0;
  left: 0;
  width: 60px;
  height: 30px;
  border-radius: ${(props) => props.theme.borderRadius};
  background-color: ${(props) => props.theme.colors.button};
  cursor: pointer;

  &::after {
    content: '';
    display: block;
    border-radius: 50%;
    width: 25px;
    height: 25px;
    margin: 2px;
    background-color: ${(props) => props.theme.colors.opposite};
    box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.2);
    transition: 0.2s;
  }
`;

const CheckBox = styled.input`
  opacity: 0;
  z-index: 1;
  border-radius: ${(props) => props.theme.borderRadius};
  width: 60px;
  height: 30px;

  &:checked + ${CheckBoxLabel} {
    background-color: ${(props) => props.theme.colors.button};

    &::after {
      content: '';
      display: block;
      border-radius: 50%;
      width: 25px;
      height: 25px;
      margin-left: calc(60px / 2);
      transition: 0.2s;
      cursor: pointer;
    }
  }
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
  margin-right: 2vw;
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
        <>
          <LogoLightContainer onClick={() => navigate('/')} title="logo" />
          <FaviconContainer onClick={() => navigate('/')} title="logo" />
        </>
      ) : (
        <>
          <LogoDarkContainer onClick={() => navigate('/')} title="logo" />
          <FaviconContainer onClick={() => navigate('/')} title="logo" />
        </>
      )}
      <NavigatorContainer theme={theme}>
        <Navigator onClick={() => navigate('/survey')}>설문</Navigator>
        <Navigator onClick={() => navigate('/report')}>리포트</Navigator>
      </NavigatorContainer>
      <ButtonContainer>
        <CheckBoxContainer>
          <CheckBoxWrapper>
            <CheckBox id="checkbox" type="checkbox" theme={theme} onClick={handleClick} />
            <CheckBoxLabel htmlFor="checkbox" theme={theme} />
          </CheckBoxWrapper>
          <LoginInformation onClick={() => navigate('/login')} theme={theme}>
            로그인/회원가입
          </LoginInformation>
        </CheckBoxContainer>
      </ButtonContainer>
    </HeaderContainer>
  );
}
