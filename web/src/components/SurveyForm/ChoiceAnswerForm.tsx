import React from 'react';

import styled, { DefaultTheme } from 'styled-components';

import { SurveyCreateRequest } from '../../types/request/Survey';
import EditQuestionButton from './EditQuestionButton';
import QuestionTypeSelect from './QuestionTypeSelect';

const Container = styled.div``;

const TextInput = styled.input.attrs({ type: 'text', maxLength: 100 })`
  padding: 1.2vh 1.5vw 1.2vh 1.5vw;
  border: ${(props) => props.theme.border};
  border-radius: ${(props) => props.theme.borderRadius};
  font-weight: 900;
  color: ${(props) => props.theme.colors.default};
  background-color: ${(props) => props.theme.colors.container};
  cursor: text;
`;

const QuestionTitleInput = styled(TextInput).attrs({ type: 'text' })`
  font-size: 18px;
  width: 57vw;
  margin-top: 7px;
`;

const QuestionDescriptionInput = styled(TextInput).attrs({ type: 'text' })`
  font-size: 15px;
  width: 57vw;
  margin-top: 7px;
  margin-bottom: 23px;
  margin-right: 18vw;
`;

const AddOptionButton = styled.button`
  font-weight: 900;
  text-align: center;
  padding: 10px;
  color: ${(props) => props.theme.colors.text};
  background-color: ${(props) => props.theme.colors.button};
  border: ${(props) => props.theme.border};
  border-radius: ${(props) => props.theme.borderRadius};
  margin-top: 25px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.colors.btnhover};
  }
`;

interface ChoiceAnswerFormProps {
  surveyData: SurveyCreateRequest;
  selected: number;
  questionId: number;
  handleChangeQuestion: (event: React.ChangeEvent<HTMLInputElement>, questionId: number) => void;
  handleChangeQuestionType: (event: React.ChangeEvent<HTMLSelectElement>, questionId: number) => void;
  handleClickButton: (event: React.MouseEvent<HTMLButtonElement>, questionId: number, optionId?: number) => void;
  makeOptionsForm: (questionId: number) => JSX.Element | JSX.Element[];
  theme: DefaultTheme;
}

export default function ChoiceAnswerForm({
  surveyData,
  selected,
  questionId,
  handleChangeQuestion,
  handleChangeQuestionType,
  handleClickButton,
  makeOptionsForm,
  theme,
}: ChoiceAnswerFormProps) {
  return (
    <Container>
      <QuestionTitleInput
        theme={theme}
        onChange={(event) => handleChangeQuestion(event, questionId)}
        name="title"
        value={surveyData.questions[questionId].title || ''}
      />
      {QuestionTypeSelect({ selected, questionId, handleChangeQuestionType, theme })}
      {EditQuestionButton({ editType: 'Delete', questionId, handleClickButton, theme })}

      <QuestionDescriptionInput
        theme={theme}
        onChange={(event) => handleChangeQuestion(event, questionId)}
        name="description"
        value={surveyData.questions[questionId].description || ''}
      />

      {makeOptionsForm(questionId)}
      <br />
      <AddOptionButton theme={theme} name="addOption" onClick={(event) => handleClickButton(event, questionId)}>
        문항 추가하기
      </AddOptionButton>
      <br />

      {EditQuestionButton({ editType: 'Add', questionId, handleClickButton, theme })}
    </Container>
  );
}
