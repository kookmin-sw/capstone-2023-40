import React from 'react';

import styled, { DefaultTheme } from 'styled-components';

import { QuestionType } from '../../types/request';
import { QuestionOptionResponse } from '../../types/response/QuestionOption';

const ChoiceContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
`;

const ChoiceLabel = styled.label`
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  font-size: 16px;
  padding: 1.2vh 1vw 1.2vh 1vw;
  margin-left: 1.3vw;
  margin-bottom: 10px;
  border-radius: ${(props) => props.theme.borderRadius};
  border: ${(props) => props.theme.border};
  width: 72vw;
  color: ${(props) => props.theme.colors.default};
  background-color: ${(props) => props.theme.colors.container};
  transition: 200ms background ease;

  &:hover {
    background-color: ${(props) => props.theme.colors.background};
  }
`;

const ChoiceMark = styled.span`
  position: relative;
  display: inline-block;
  height: 20px;
  width: 20px;
  margin-right: 15px;
  background: transparent;
  border: 2px solid #999da0;
  border-radius: 50%;

  &:before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 10px;
    width: 10px;
    border-radius: 50%;
  }
`;

const Input = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;

  &:checked + span:before {
    background: ${(props) => props.theme.colors.primary};
    border: 7px solid ${(props) => props.theme.colors.primary};
  }
`;

const Radio = styled(Input).attrs({ type: 'radio' })``;

const CheckBox = styled(Input).attrs({ type: 'checkbox' })``;

interface OptionListProps {
  optionList: Array<QuestionOptionResponse>;
  questionBankId: number;
  questionType: string | number;
  handleInputChange: (arg1: React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeCheck: (arg1: React.ChangeEvent<HTMLInputElement>, arg2: number) => void;
  theme: DefaultTheme;
}

export default function OptionList({
  optionList,
  questionBankId,
  questionType,
  handleInputChange,
  handleChangeCheck,
  theme,
}: OptionListProps) {
  return (
    <ChoiceContainer theme={theme}>
      {optionList.map((option: QuestionOptionResponse) => (
        <ChoiceLabel theme={theme} key={option.questionOptionId}>
          {questionType === QuestionType.SINGLE_CHOICE ? (
            <Radio
              theme={theme}
              name={String(questionBankId)}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                handleInputChange(event);
              }}
              value={`${option.questionOptionId}`}
            />
          ) : (
            <CheckBox
              theme={theme}
              name={String(questionBankId)}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                handleChangeCheck(event, option.questionOptionId);
              }}
              id={`${option.questionOptionId}`}
            />
          )}
          <ChoiceMark theme={theme} />
          {option.option}
        </ChoiceLabel>
      ))}
    </ChoiceContainer>
  );
}
