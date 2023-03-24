import React from 'react';

import styled, { DefaultTheme } from 'styled-components';

import { Icons } from '../assets/svg';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Modal = styled.div`
  margin-top: 10vh;
  width: 60vw;
  box-shadow: 4px 4px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: ${(props) => props.theme.borderRadius};
  background-color: ${(props) => props.theme.colors.container};

  @media screen and (max-width: 600px) {
    width: 95vw;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

const Title = styled.span`
  font-weight: 800;
  font-size: 1.6em;
  color: ${(props) => props.theme.colors.default};
`;

const BodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2em;
`;

const ListContainer = styled.ul`
  list-style-type: none;
`;

const ErrorIcon = styled(Icons.ERROR)`
  width: 3em;
  margin: 1em;
`;

const InfoIcon = styled(Icons.INFO)`
  width: 3em;
  margin: 1em;
`;

const WarnIcon = styled(Icons.WARN)`
  width: 3em;
  margin: 1em;
`;

const Button = styled.button`
  padding: 1em;
  font-size: 1.2em;
  border: none;
  border-radius: ${(props) => props.theme.borderRadius};
  background-color: ${(props) => props.theme.colors.button};
  cursor: pointer;
  font-weight: 700;
  color: ${(props) => props.theme.colors.text};

  &:hover {
    background-color: ${(props) => props.theme.colors.btnhover};
  }
`;

export type LogLevel = 'ERROR' | 'WARN' | 'INFO';

interface AlertModalProps {
  theme: DefaultTheme;
  title: string;
  level: LogLevel;
  text: string;
}

export default function AlertModal({ theme, title, level, text }: AlertModalProps) {
  // FIXME: maybe we can refactor this
  const setIcon = (_level: LogLevel) => {
    switch (_level) {
      case 'ERROR':
        return <ErrorIcon />;
      case 'INFO':
        return <InfoIcon />;
      case 'WARN':
      default:
        return <WarnIcon />;
    }
  };

  return (
    <Container>
      <Modal theme={theme}>
        <TitleContainer theme={theme}>
          {setIcon(level)}
          <Title theme={theme}>{title}</Title>
        </TitleContainer>
        <BodyContainer>
          {/* FIXME: To verification shortcut list */}
          {/* <ListContainer></ListContainer> */}
          <Button theme={theme}>{text}</Button>
        </BodyContainer>
      </Modal>
    </Container>
  );
}
