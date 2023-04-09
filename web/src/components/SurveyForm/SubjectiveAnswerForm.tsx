import React from 'react';

import styled, { DefaultTheme } from 'styled-components';

import { QuestionType } from '../../types/request/Question';
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

const AnswerLabel = styled.label`
  padding: 1.2vh 1.5vw 1.2vh 1.5vw;
  font-size: 15px;
  color: ${(props) => props.theme.colors.text};
  text-decoration: underline;
  text-decoration-style: dotted;
  text-decoration-color: currentColor;
  border: ${(props) => props.theme.border};
  border-radius: ${(props) => props.theme.borderRadius};
`;

interface SubjectiveAnswerFormProps {
  surveyData: SurveyCreateRequest;
  selected: number;
  questionId: number;
  handleChangeQuestion: (event: React.ChangeEvent<HTMLInputElement>, questionId: number) => void;
  handleChangeQuestionType: (event: React.ChangeEvent<HTMLSelectElement>, questionId: number) => void;
  handleClickButton: (event: React.MouseEvent<HTMLButtonElement>, questionId: number, optionId?: number) => void;
  theme: DefaultTheme;
}

export default function SubjectiveAnswerForm({
  surveyData,
  selected,
  questionId,
  handleChangeQuestion,
  handleChangeQuestionType,
  handleClickButton,
  theme,
}: SubjectiveAnswerFormProps) {
  let answerLabel = '';
  if (selected === QuestionType.LONG_ANSWER) {
    answerLabel = '장문형 답변이 입력됩니다.';
  } else {
    answerLabel = '단답형 답변이 입력됩니다.';
  }
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

      <AnswerLabel theme={theme}>{answerLabel}</AnswerLabel>
      <br />

      {EditQuestionButton({ editType: 'Add', questionId, handleClickButton, theme })}
    </Container>
  );
}
