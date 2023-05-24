import React from 'react';

import styled, { DefaultTheme } from 'styled-components';

import { QuestionType } from '../../types/request';
import { QuestionOptionResponse } from '../../types/response/QuestionOption';
import OptionList from './OptionList';

const TextArea = styled.textarea`
  padding: 1.2vh 2vw 1.2vh 2vw;
  margin-bottom: 5px;
  border-radius: ${(props) => props.theme.borderRadius};
  border: ${(props) => props.theme.border};
  resize: none;
  font-weight: 100;
  color: ${(props) => props.theme.colors.text};
  background-color: ${(props) => props.theme.colors.background};

  ::placeholder {
    color: ${(props) => props.theme.colors.placeHolder};
  }
`;

const LongAnswer = styled(TextArea)`
  width: 70%;
  height: 70px;
  font-size: 15px;
`;

const TextInput = styled.input`
  padding: 1.2vh 2vw 1.2vh 2vw;
  margin-bottom: 5px;
  border-radius: ${(props) => props.theme.borderRadius};
  border: ${(props) => props.theme.border};
  resize: none;
  font-weight: 100;
  color: ${(props) => props.theme.colors.text};
  background-color: ${(props) => props.theme.colors.background};

  ::placeholder {
    color: ${(props) => props.theme.colors.placeHolder};
  }
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
  let tmpQuestionType: number | string;
  if (typeof questionType === 'undefined') {
    tmpQuestionType = -1;
  } else if (typeof questionType === 'string') {
    tmpQuestionType = QuestionType[questionType];
  } else {
    tmpQuestionType = questionType;
  }

  switch (tmpQuestionType) {
    case QuestionType.SHORT_ANSWER:
      return (
        <ShortAnswer
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            handleInputChange(event);
          }}
          maxLength={100}
          placeholder="답변을 입력해주세요"
          theme={theme}
        />
      );
    case QuestionType.LONG_ANSWER:
      return (
        <LongAnswer
          onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
            handleInputChange(event);
          }}
          maxLength={255}
          placeholder="답변을 입력해주세요"
          theme={theme}
        />
      );
    default:
      return (
        <OptionList
          optionList={options || []}
          questionBankId={questionBankId}
          questionType={tmpQuestionType}
          handleInputChange={handleInputChange}
          handleChangeCheck={handleChangeCheck}
          theme={theme}
        />
      );
  }
}
