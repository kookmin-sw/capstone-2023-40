import React from 'react';

import styled, { DefaultTheme } from 'styled-components';

const Button = styled.button<{
  textColor: string;
  width: string;
  backgroundColor: string;
  backgroundHover: string;
  fontSize: string;
  fontWeight: string;
}>`
  padding: 2vh 2vw 2vh 2vw;
  width: ${(props) => props.width};
  font-size: ${(props) => props.fontSize};
  font-weight: ${(props) => props.fontWeight};
  border: none;
  border-radius: ${(props) => props.theme.borderRadius};
  color: ${(props) => props.textColor};
  background-color: ${(props) => props.backgroundColor};
  transition: 200ms background ease;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.backgroundHover};
  }
`;

interface RectangleButtonProps {
  text: string;
  textColor: string;
  width: string;
  backgroundColor: string;
  hoverColor: string;
  fontSize?: string;
  fontWeight?: string;
  handleClick: () => void;
  theme: DefaultTheme;
}

export default function RectangleButton({
  text,
  textColor,
  width,
  backgroundColor,
  hoverColor,
  fontSize,
  fontWeight,
  handleClick,
  theme,
}: RectangleButtonProps) {
  return (
    <Button
      theme={theme}
      textColor={textColor}
      width={width}
      backgroundColor={backgroundColor}
      backgroundHover={hoverColor}
      fontSize={fontSize || '18px'}
      fontWeight={fontWeight || '600'}
      onClick={handleClick}
    >
      {text}
    </Button>
  );
}
