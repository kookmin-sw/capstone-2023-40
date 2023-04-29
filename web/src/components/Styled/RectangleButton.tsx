import React from 'react';

import styled, { DefaultTheme } from 'styled-components';

const Button = styled.button<{ width: string; backgroundColor: string }>`
  padding: 2vh 2vw 2vh 2vw;
  width: ${(props) => props.width};
  font-size: 18px;
  font-weight: 700;
  border: none;
  border-radius: ${(props) => props.theme.borderRadius};
  color: ${(props) => props.theme.colors.default};
  background-color: ${(props) => props.backgroundColor};
  transition: 200ms background ease;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

interface RectangleButtonProps {
  buttonText: string;
  buttonWidth: string;
  buttonBgColor: string;
  handleClick: () => void;
  theme: DefaultTheme;
}

export default function RectangleButton({
  buttonText,
  buttonWidth,
  buttonBgColor,
  handleClick,
  theme,
}: RectangleButtonProps) {
  return (
    <Button theme={theme} width={buttonWidth} backgroundColor={buttonBgColor} onClick={handleClick}>
      {buttonText}
    </Button>
  );
}
