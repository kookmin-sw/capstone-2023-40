import React from 'react';

import styled from 'styled-components';

const Container = styled.div`
  justify-content: flex-start;
  align-items: center;
  display: flex;
  z-index: 0;
`;

const Toggle = styled.input<{
  leftText: string;
  rightText: string;
  leftTextColor: string;
  rightTextColor: string;
  leftBackgroundColor: string;
  rightBackgroundColor: string;
  toggleColor: string;
}>`
  all: unset;
  z-index: 1;
  width: 5rem;
  height: 2rem;
  background: ${(props) => props.leftBackgroundColor};
  border-radius: 2em;

  ::before {
    position: absolute;
    content: '${(props) => props.leftText}';
    padding-left: 1em;
    width: 3.5rem;
    height: 2rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    color: ${(props) => props.leftTextColor};
    font-weight: 900;
    font-size: 0.813rem;
    transition: all 0.2s ease-in-out;
  }

  ::after {
    position: relative;
    content: '';
    display: block;
    width: 1.6em;
    height: 1.6em;
    top: calc((2rem - 1.6em) / 2);
    left: calc(5rem - 1.9em);
    border-radius: 50%;
    background: ${(props) => props.toggleColor};
    transition: all 0.2s ease-in-out;
  }
  &:checked {
    background: ${(props) => props.rightBackgroundColor};
    transition: all 0.2s ease-in-out;

    ::before {
      position: absolute;
      padding-right: 1em;
      content: '${(props) => props.rightText}';
      align-items: center;
      justify-content: flex-end;
      color: ${(props) => props.rightTextColor};
    }

    ::after {
      content: '';
      z-index: 2;
      top: calc((2rem - 1.6em) / 2);
      left: calc((2rem - 1.6em) / 2);
      width: 1.6em;
      height: 1.6em;
      display: block;
      border-radius: 50%;
      background: ${(props) => props.toggleColor};
      position: relative;
    }
  }
`;

interface ToggleSwitchProps {
  leftText: string;
  rightText: string;
  leftTextColor: string;
  rightTextColor: string;
  leftBackgroundColor: string;
  rightBackgroundColor: string;
  toggleColor: string;
  isChecked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ToggleSwitch({
  leftText,
  rightText,
  leftTextColor,
  rightTextColor,
  leftBackgroundColor,
  rightBackgroundColor,
  toggleColor,
  isChecked,
  onChange,
}: ToggleSwitchProps) {
  return (
    <Container>
      <Toggle
        leftText={leftText}
        rightText={rightText}
        leftTextColor={leftTextColor}
        rightTextColor={rightTextColor}
        leftBackgroundColor={leftBackgroundColor}
        rightBackgroundColor={rightBackgroundColor}
        toggleColor={toggleColor}
        onChange={(event) => onChange(event)}
        type="checkbox"
        checked={isChecked}
      />
    </Container>
  );
}
