import React from 'react';

import styled, { DefaultTheme } from 'styled-components';

import { SurveyCreateRequest } from '../../types/request/Survey';
import { NumberUtils } from '../../utils/NumberUtils';
import { DeleteImage } from '../Button/ImageButtons';

const OptionsContainer = styled.div``;

const OptionContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const TextInput = styled.input.attrs({ type: 'text', maxLength: 100 })`
  padding: 1.2vh 1.5vw 1.2vh 1.5vw;
  border: ${(props) => props.theme.border};
  border-radius: ${(props) => props.theme.borderRadius};
  font-weight: 900;
  color: ${(props) => props.theme.colors.default};
  background-color: ${(props) => props.theme.colors.inputBackground};
  cursor: text;
`;

const OptionInput = styled(TextInput).attrs({ type: 'text' })`
  width: 30vw;
  font-size: 13px;
  margin-top: 3px;
`;

const AnswerLabel = styled.label`
  display: inline-block;
  width: 30vw;
  padding: 1.2vh 1.5vw 1.2vh 1.5vw;
  font-size: 15px;
  color: ${(props) => props.theme.colors.text};
  text-decoration: underline;
  text-decoration-style: dotted;
  text-decoration-color: currentColor;
  border: ${(props) => props.theme.border};
  border-radius: ${(props) => props.theme.borderRadius};
`;

interface OptionListProps {
  surveyData: SurveyCreateRequest;
  questionId: number;
  handleOptionChange: (event: React.ChangeEvent<HTMLInputElement>, questionId: number, optionId: number) => void;
  handleClickButton: (name: string, questionId?: number, optionId?: number) => void;
  theme: DefaultTheme;
}

export default function OptionList({
  surveyData,
  questionId,
  handleOptionChange,
  handleClickButton,
  theme,
}: OptionListProps) {
  const tmpOptions = surveyData.questions[questionId].questionOptions;
  if (typeof tmpOptions !== 'undefined') {
    if (tmpOptions.length === 0) {
      return <AnswerLabel theme={theme}>옵션을 추가해 주세요</AnswerLabel>;
    }
    return (
      <OptionsContainer>
        {NumberUtils.range(0, tmpOptions.length).map((index: number) => (
          <OptionContainer theme={theme} key={index}>
            <OptionInput
              theme={theme}
              onChange={(event) => handleOptionChange(event, questionId, index)}
              name="option"
              value={tmpOptions[index].option || ''}
              placeholder="문항을 입력해 주세요"
            />
            <DeleteImage
              data-testid="deleteOption"
              onClick={() => handleClickButton('deleteOption', questionId, index)}
              theme={theme}
            />
          </OptionContainer>
        ))}
      </OptionsContainer>
    );
  }
  return <AnswerLabel theme={theme}>문항을 추가해 주세요</AnswerLabel>;
}
