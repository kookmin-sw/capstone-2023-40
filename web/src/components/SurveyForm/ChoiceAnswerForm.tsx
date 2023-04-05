import React from 'react';

import styled, { DefaultTheme } from 'styled-components';

import { QuestionCreateRequest } from '../../types/request/Question';
import QuestionTypeSelect from './QuestionTypeSelect';

const Container = styled.div``;

const TextInput = styled.input.attrs({ type: 'text' })`
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

const AddOptionButton = styled.button`
  font-weight: 900;
  text-align: center;
  padding: 10px;
  color: ${(props) => props.theme.colors.text};
  background-color: ${(props) => props.theme.colors.button};
  border: ${(props) => props.theme.border};
  border-radius: ${(props) => props.theme.borderRadius};
  margin: 5px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.colors.btnhover};
  }
`;

interface ChoiceAnswerFormProps {
  selected: number;
  questionId: number;
  handleChangeQuestion: (event: React.ChangeEvent<HTMLInputElement>, questionId: number) => void;
  handleChangeQuestionType: (event: React.ChangeEvent<HTMLSelectElement>, questionId: number) => void;
  questionList: QuestionCreateRequest[];
  handleClickButton: (event: React.MouseEvent<HTMLButtonElement>, questionId: number, optionId?: number) => void;
  optionsForm: (questionId: number) => JSX.Element | JSX.Element[];
  theme: DefaultTheme;
}

export default function ChoiceAnswerForm({
  selected,
  questionId,
  handleChangeQuestion,
  handleChangeQuestionType,
  questionList,
  handleClickButton,
  optionsForm,
  theme,
}: ChoiceAnswerFormProps) {
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

      {optionsForm(questionId)}
      <AddOptionButton theme={theme} name="addOption" onClick={(event) => handleClickButton(event, questionId)}>
        문항 추가하기
      </AddOptionButton>
      <br />

      <AddQuestionButton theme={theme} name="addQuestion" onClick={(event) => handleClickButton(event, questionId)}>
        +
      </AddQuestionButton>
    </Container>
  );
}
