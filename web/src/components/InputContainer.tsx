import React from 'react';

import styled, { DefaultTheme } from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const InputTitle = styled.span`
  text-align: left;
  font-size: 1.3vh;
  font-weight: 600;
  color: ${(props) => props.theme.colors.default};
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Input = styled.input`
  min-width: 4vh;
  padding: 1.7vh;
  margin-top: 10px;
  margin-bottom: 10px;
  border: ${(props) => props.theme.border};
  border-radius: ${(props) => props.theme.borderRadius};
  color: ${(props) => props.theme.colors.default};
  background-color: ${(props) => props.theme.colors.container};
  font-size: 1.5vh;
  font-weight: 600;
  flex: 1;

  &:focus {
    outline: none;
  }

  ::placeholder,
  ::-webkit-input-placeholder {
    opacity: 0.4;
  }
  :-ms-input-placeholder {
    opacity: 0.4;
  }
`;

const Button = styled.button`
  border: none;
  min-width: 100px;
  width: 10vw;
  height: 100%;
  padding: 1.3em;
  margin-left: 1vh;
  font-size: 1.4vh;
  font-weight: 700;
  color: ${(props) => props.theme.colors.text};
  background-color: ${(props) => props.theme.colors.button};
  border-radius: ${(props) => props.theme.borderRadius};
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.colors.btnhover};
  }
`;

const PrefixBox = styled.div`
  padding: 1.7vh;
  font-size: 1.5vh;
  font-weight: 700;
  margin-right: 1vh;
  color: ${(props) => props.theme.colors.default};
  background-color: ${(props) => props.theme.colors.container};
  border: ${(props) => props.theme.border};
  border-color: ${(props) => props.theme.borderRadius};
  border-radius: ${(props) => props.theme.borderRadius};
`;

interface PrefixOptions {
  theme: DefaultTheme;
  title: string;
}

interface InputOptions {
  theme: DefaultTheme;
  type: string;
  name: string;
  value: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  pattern?: string;
  maxLength?: number;
}

type ButtonType = 'button' | 'reset' | 'submit';

interface ButtonOptions {
  theme: DefaultTheme;
  title: string;
  type: ButtonType;
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

interface InputContainerProps {
  title: string;
  prefixOptions?: PrefixOptions;
  inputOptions?: InputOptions;
  buttonOptions?: ButtonOptions;
}

/**
 * Topmost input container that handles user input from RegisterForm page.
 *
 * @param {InputContainerProps} props - Props for prefix, input, and button options
 */
export default function InputContainer(props: InputContainerProps) {
  return (
    <Container>
      <InputTitle theme={props.inputOptions?.theme}>{props.title}</InputTitle>
      <InputWrapper>
        {props.prefixOptions ? <PrefixBox {...props.prefixOptions}>{props.prefixOptions.title}</PrefixBox> : null}
        <Input {...props.inputOptions} />
        {props.buttonOptions ? <Button {...props.buttonOptions}>{props.buttonOptions.title}</Button> : null}
      </InputWrapper>
    </Container>
  );
}
