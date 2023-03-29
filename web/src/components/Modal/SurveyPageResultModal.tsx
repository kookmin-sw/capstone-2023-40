import React, { useRef, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import styled, { DefaultTheme } from 'styled-components';

const Container = styled.div`
  width: 100vw;
  height: 500vh;
  position: absolute;
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

const Button = styled.button`
  width: 15vw;
  border: none;
  padding: 2vh 2vw 2vh 2vw;
  margin: 2vw;
  border-radius: ${(props) => props.theme.borderRadius};
  font-size: 2vh;
  font-weight: 700;
  color: ${(props) => props.theme.colors.default};
  background-color: ${(props) => props.theme.colors.primary};
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.colors.prhover};
  }
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
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  // FIXME: there will be a way to float in right place, without scroll
  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }
  }, []);

  return (
    <Container theme={theme}>
      <ModalContainer ref={modalRef} theme={theme}>
        <Label theme={theme}>🥳</Label>
        <Button theme={theme} onClick={() => navigate('/survey')}>
          완료하기
        </Button>
      </ModalContainer>
    </Container>
  );
}
