import React from 'react';

import styled, { DefaultTheme } from 'styled-components';

const Button = styled.button`
  font-weight: 900;
  text-align: center;
  padding: 10px;
  color: ${(props) => props.theme.colors.text};
  background-color: ${(props) => props.theme.colors.button};
  width: 35px;
  height: 35px;
  border-radius: 50%;
  border: none;
  transition: 250ms background ease;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

interface SmallCircleButtonProps {
  displayText: string;
  name: string;
  handleClickButton: (event: React.MouseEvent<HTMLButtonElement>, questionId?: number, optionId?: number) => void;
  theme: DefaultTheme;
  questionId?: number;
  optionId?: number;
}

export default function SmallCircleButton({
  displayText,
  name,
  handleClickButton,
  theme,
  questionId,
  optionId,
}: SmallCircleButtonProps) {
  return (
    <Button theme={theme} name={name} onClick={(event) => handleClickButton(event, questionId, optionId)}>
      {displayText}
    </Button>
  );
}
