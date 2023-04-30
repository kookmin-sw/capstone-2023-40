import React from 'react';

import styled, { DefaultTheme } from 'styled-components';

import { QuestionType } from '../../types/request/Question';

const Option = styled.option``;

const Selector = styled.select`
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

interface QuestionTypeSelectorProps {
  selected: number;
  questionId: number;
  handleChange: (event: React.ChangeEvent<HTMLSelectElement>, questionId: number) => void;
  theme: DefaultTheme;
}

export default function QuestionTypeSelector({ selected, questionId, handleChange, theme }: QuestionTypeSelectorProps) {
  return (
    <Selector
      data-testid="selector"
      theme={theme}
      name="questionType"
      onChange={(event) => handleChange(event, questionId)}
      value={selected}
    >
      <Option theme={theme} value={QuestionType.LONG_ANSWER}>
        장문형
      </Option>
      <Option theme={theme} value={QuestionType.SHORT_ANSWER}>
        단답형
      </Option>
      <Option theme={theme} value={QuestionType.SINGLE_CHOICE}>
        단일선택
      </Option>
      <Option theme={theme} value={QuestionType.MULTIPLE_CHOICE}>
        다중선택
      </Option>
    </Selector>
  );
}
