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

// FIXME: radio button is working but need refactoring
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

const Checkmark = styled.span`
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

const TextInput = styled.textarea`
  padding: 1.2vh 2vw 1.2vh 2vw;
  margin-bottom: 5px;
  border-radius: ${(props) => props.theme.borderRadius};
  border: ${(props) => props.theme.border};
  resize: none;
  font-weight: 100;
  color: ${(props) => props.theme.colors.default};
  background-color: ${(props) => props.theme.colors.container};
`;

const LongAnswer = styled(TextInput)`
  width: 70%;
  height: 70px;
  font-size: 15px;
`;

const ShortAnswer = styled(TextInput)`
  text-align: center;
  width: 20vw;
  height: 18px;
  font-size: 15px;
`;

interface ResponseInputFormProps {
  questionType: QuestionType;
  options: Array<QuestionOptionResponse> | null;
  questionBankId: number;
  handleInputChange: (arg1: React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeCheck: (arg1: React.ChangeEvent<HTMLInputElement>, arg2: number) => void;
  theme: DefaultTheme;
}

export default function ResponseInputForm({
  questionType,
  options,
  questionBankId,
  handleInputChange,
  handleChangeCheck,
  theme,
}: ResponseInputFormProps) {
  if (questionType === QuestionType.SINGLE_CHOICE || questionType === QuestionType.MULTIPLE_CHOICE) {
    return (
      <ChoiceContainer theme={theme}>
        {options?.map((option: QuestionOptionResponse) => (
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
            <Checkmark theme={theme} />
            {option.option}
          </ChoiceLabel>
        ))}
      </ChoiceContainer>
    );
  }

  switch (questionType) {
    case QuestionType.SHORT_ANSWER:
      return (
        <ShortAnswer
          onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
            handleInputChange(event);
          }}
          maxLength={19}
          placeholder="답변을 입력해주세요"
          theme={theme}
        />
      );
    default:
      return (
        <LongAnswer
          onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
            handleInputChange(event);
          }}
          maxLength={450}
          placeholder="답변을 입력해주세요"
          theme={theme}
        />
      );
  }
}
