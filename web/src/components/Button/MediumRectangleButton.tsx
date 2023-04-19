import React from 'react';

import styled, { DefaultTheme } from 'styled-components';

const Button = styled.button.attrs({ type: 'submit' })`
  width: 15vw;
  border: none;
  padding: 2vh 2vw 2vh 2vw;
  margin-top: 30px;
  margin-bottom: 30px;
  margin-left: 69vw;
  border-radius: ${(props) => props.theme.borderRadius};
  font-size: 2vh;
  font-weight: 700;
  color: ${(props) => props.theme.colors.default};
  background-color: ${(props) => props.theme.colors.primary};
  transition: 250ms background ease;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.colors.prhover};
  }
`;

interface MediumRectangleButtonProps {
  displayText: string;
  handleClickButton: () => void;
  theme: DefaultTheme;
}

export default function MediumRectangleButton({ displayText, handleClickButton, theme }: MediumRectangleButtonProps) {
  return (
    <Button theme={theme} onClick={handleClickButton}>
      {displayText}
    </Button>
  );
}
