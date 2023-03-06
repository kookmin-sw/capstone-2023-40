import React, { ReactNode } from 'react';

import styled, { DefaultTheme } from 'styled-components';

const HeaderContainer = styled.header`
  position: sticky;
  top: 0;
  width: 100vw;
  display: flex;
  flex-direction: row;
  background-color: ${(props) => props.theme.colors.background};
`;

// FIXME: To relative value. Would `img` tag be fine?
const Logo = styled.img`
  margin-left: 2vw;
  width: 150px;
  src: ${(props) => props.src};
  alt="logo"
`;

const ButtonContainer = styled.div`
  margin-left: auto;
  display: flex;
  flex-direction: row;
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
  return (
    <HeaderContainer>
      <Logo src={require('../assets/logo.svg').default} />
      <ButtonContainer>
        {/* FIXME: Modify this to icon */}
        <ToggleButton type="button" theme={theme} onClick={toggleTheme}>
          button
        </ToggleButton>
      </ButtonContainer>
    </HeaderContainer>
  );
}
