import React from 'react';

import styled, { DefaultTheme } from 'styled-components';

import { QuestionCreateRequest, QuestionType } from '../../types/request/Question';
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

const Button = styled.button`
  font-weight: 900;
  text-align: center;
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

const AddQuestionButton = styled(Button)`
  color: ${(props) => props.theme.colors.text};
  margin-left: 37vw;
`;

const DeleteQuestionButton = styled(Button)`
  color: #cd5c5c;
  margin-left: 2vw;
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
  selected: number;
  questionId: number;
  handleChangeQuestion: (event: React.ChangeEvent<HTMLInputElement>, questionId: number) => void;
  handleChangeQuestionType: (event: React.ChangeEvent<HTMLSelectElement>, questionId: number) => void;
  questionList: QuestionCreateRequest[];
  handleClickButton: (event: React.MouseEvent<HTMLButtonElement>, questionId: number, optionId?: number) => void;
  theme: DefaultTheme;
}

export default function SubjectiveAnswerForm({
  selected,
  questionId,
  handleChangeQuestion,
  handleChangeQuestionType,
  questionList,
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
        value={questionList[questionId].title || ''}
      />
      {QuestionTypeSelect({ selected, questionId, handleChangeQuestionType, theme })}
      <DeleteQuestionButton
        theme={theme}
        name="deleteQuestion"
        onClick={(event) => handleClickButton(event, questionId)}
      >
        X
      </DeleteQuestionButton>
      <QuestionDescriptionInput
        theme={theme}
        onChange={(event) => handleChangeQuestion(event, questionId)}
        name="description"
        value={questionList[questionId].description || ''}
      />

      <AnswerLabel theme={theme}>{answerLabel}</AnswerLabel>
      <br />

      <AddQuestionButton theme={theme} name="addQuestion" onClick={(event) => handleClickButton(event, questionId)}>
        +
      </AddQuestionButton>
    </Container>
  );
}
