import React from 'react';

import styled, { DefaultTheme } from 'styled-components';

const Button = styled.button`
  width: 15vw;
  border: none;
  padding: 2vh 2vw 2vh 2vw;
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
  type: 'button' | 'submit' | 'reset' | undefined;
  handleClickButton: () => void;
  theme: DefaultTheme;
}

export default function MediumRectangleButton({
  displayText,
  type,
  handleClickButton,
  theme,
}: MediumRectangleButtonProps) {
  return (
    <Button type={type} onClick={handleClickButton} theme={theme}>
      {displayText}
    </Button>
  );
}
