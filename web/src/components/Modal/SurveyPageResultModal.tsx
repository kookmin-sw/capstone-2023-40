import React, { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import styled, { DefaultTheme } from 'styled-components';

import RectangleButton from '../Button/RectangleButton';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 100;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div`
  width: 30vw;
  height: 30vh;
  border-radius: ${(props) => props.theme.borderRadius};
  background-color: ${(props) => props.theme.colors.container};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Label = styled.label`
  font-size: 80px;
  font-weight: 700;
  color: ${(props) => props.theme.colors.default};
  text-align: center;

  @media screen and (max-width: 700px) {
    font-size: 30px;
  }
`;

interface ModalProps {
  theme: DefaultTheme;
}

// TODO: show point earned instead of emoji
export default function SurveyPageResultModal({ theme }: ModalProps) {
  const navigate = useNavigate();

  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  return (
    <Container theme={theme}>
      <ModalContainer theme={theme}>
        <Label theme={theme}>🥳</Label>
        <RectangleButton
          backgroundColor={theme.colors.primary}
          hoverColor={theme.colors.prhover}
          text="완료하기"
          theme={theme}
          handleClick={() => navigate('/survey')}
          width="15vw"
        />
      </ModalContainer>
    </Container>
  );
}
