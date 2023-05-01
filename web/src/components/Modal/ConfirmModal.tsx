import React from 'react';

import styled, { DefaultTheme } from 'styled-components';

import { Icons } from '../../assets/svg';
import { RectangleButton, RectanglePrimaryButton } from '../Button/Buttons';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 100;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Modal = styled.div`
  width: 35vw;
  box-shadow: 4px 4px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: ${(props) => props.theme.borderRadius};
  background-color: ${(props) => props.theme.colors.container};

  @media screen and (max-width: 400px) {
    width: 60vw;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
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
  justify-content: center;
  padding: 1em;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const TextContainer = styled.span`
  list-style-type: none;
  align-items: center;
  justify-content: center;
  font-size: 1em;
  margin-bottom: 2em;
  font-weight: 700;
  color: ${(props) => props.theme.colors.default};
`;

const ErrorIcon = styled(Icons.ERROR)`
  width: 2em;
  margin: 1em;
`;

const InfoIcon = styled(Icons.INFO)`
  width: 2em;
  margin: 1em;
`;

const WarnIcon = styled(Icons.WARN)`
  width: 2em;
  margin: 1em;
`;

const CancelButton = styled(RectangleButton)`
  width: 15vw;
`;

const SubmitButton = styled(RectanglePrimaryButton)`
  width: 15vw;
`;

export type LogLevel = 'ERROR' | 'WARN' | 'INFO';

interface ConfirmModalProps {
  theme: DefaultTheme;
  title: string;
  level: LogLevel;
  text: string;
  handleCancelClick: () => void;
  handleConfirmClick: () => void;
}

export default function ConfirmModal({
  theme,
  title,
  level,
  text,
  handleCancelClick,
  handleConfirmClick,
}: ConfirmModalProps) {
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
          <TextContainer theme={theme}>{text}</TextContainer>
          <ButtonContainer>
            <CancelButton type={undefined} onClick={handleCancelClick} theme={theme}>
              취소
            </CancelButton>
            <SubmitButton type={undefined} onClick={handleConfirmClick} theme={theme}>
              확인
            </SubmitButton>
          </ButtonContainer>
        </BodyContainer>
      </Modal>
    </Container>
  );
}
