import React from 'react';

import styled, { DefaultTheme } from 'styled-components';

import { QuestionType } from '../../types/request/Question';

const QuestionTypeOption = styled.option``;

const QuestionTypeSelector = styled.select`
  font-size: 15px;
  margin-top: 7px;
  padding: 1.2vh 1.5vw 1.2vh 1.5vw;
  border: ${(props) => props.theme.border};
  border-radius: ${(props) => props.theme.borderRadius};
  font-weight: 900;
  color: ${(props) => props.theme.colors.default};
  background-color: ${(props) => props.theme.colors.container};
  cursor: pointer;
`;

interface QuestionTypeSelectProps {
  selected: number;
  questionId: number;
  handleChangeQuestionType: (event: React.ChangeEvent<HTMLSelectElement>, questionId: number) => void;
  theme: DefaultTheme;
}

export default function QuestionTypeSelect({
  selected,
  questionId,
  handleChangeQuestionType,
  theme,
}: QuestionTypeSelectProps) {
  return (
    <QuestionTypeSelector
      theme={theme}
      name="questionType"
      onChange={(event) => handleChangeQuestionType(event, questionId)}
      value={selected}
    >
      <QuestionTypeOption theme={theme} value={QuestionType.LONG_ANSWER}>
        장문형
      </QuestionTypeOption>
      <QuestionTypeOption theme={theme} value={QuestionType.SHORT_ANSWER}>
        단답형
      </QuestionTypeOption>
      <QuestionTypeOption theme={theme} value={QuestionType.SINGLE_CHOICE}>
        단일선택
      </QuestionTypeOption>
      <QuestionTypeOption theme={theme} value={QuestionType.MULTIPLE_CHOICE}>
        다중선택
      </QuestionTypeOption>
    </QuestionTypeSelector>
  );
}
