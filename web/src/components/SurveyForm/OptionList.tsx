import React from 'react';

import styled, { DefaultTheme } from 'styled-components';

import { SurveyCreateRequest } from '../../types/request/Survey';
import { NumberUtils } from '../../utils/NumberUtils';

const TextInput = styled.input.attrs({ type: 'text', maxLength: 100 })`
  padding: 1.2vh 1.5vw 1.2vh 1.5vw;
  border: ${(props) => props.theme.border};
  border-radius: ${(props) => props.theme.borderRadius};
  font-weight: 900;
  color: ${(props) => props.theme.colors.default};
  background-color: ${(props) => props.theme.colors.inputBackground};
  cursor: text;
`;
const OptionContainer = styled.div``;

const OptionInput = styled(TextInput).attrs({ type: 'text' })`
  width: 30vw;
  font-size: 13px;
  margin-top: 3px;
`;

const DeleteOptionButton = styled.button`
  font-weight: 900;
  text-align: center;
  color: ${(props) => props.theme.colors.text};
  margin-left: 3px;
  padding: 10px;
  background-color: ${(props) => props.theme.colors.button};
  width: 35px;
  height: 35px;
  border-radius: 50%;
  border: none;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
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

const OptionsContainer = styled.div``;

interface OptionFormProps {
  surveyData: SurveyCreateRequest;
  questionId: number;
  handleChangeOption: (event: React.ChangeEvent<HTMLInputElement>, questionId: number, optionId: number) => void;
  handleClickButton: (event: React.MouseEvent<HTMLButtonElement>, questionId: number, optionId?: number) => void;
  theme: DefaultTheme;
}

export default function OptionsForm({
  surveyData,
  questionId,
  handleChangeOption,
  handleClickButton,
  theme,
}: OptionFormProps) {
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
              onChange={(event) => handleChangeOption(event, questionId, index)}
              name="option"
              value={tmpOptions[index].option || ''}
            />
            <DeleteOptionButton
              theme={theme}
              name="deleteOption"
              onClick={(event) => handleClickButton(event, questionId, index)}
            >
              X
            </DeleteOptionButton>
          </OptionContainer>
        ))}
        ;
      </OptionsContainer>
    );
  }
  return <AnswerLabel theme={theme}>옵션을 추가해 주세요</AnswerLabel>;
}
