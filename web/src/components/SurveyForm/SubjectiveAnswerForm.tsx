import React from 'react';

import styled, { DefaultTheme } from 'styled-components';

import { QuestionType } from '../../types/request/Question';
import { SurveyCreateRequest } from '../../types/request/Survey';
import EditQuestionButton from './EditQuestionButton';
import QuestionTypeSelect from './QuestionTypeSelect';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const HeadContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const TextInput = styled.input.attrs({ type: 'text', maxLength: 100 })`
  flex-basis: 80%;
  padding: 1.2vh 1.5vw 1.2vh 1.5vw;
  border: ${(props) => props.theme.border};
  border-radius: ${(props) => props.theme.borderRadius};
  font-weight: 900;
  color: ${(props) => props.theme.colors.default};
  background-color: ${(props) => props.theme.colors.inputBackground};
  cursor: text;
`;

const QuestionTitleInput = styled(TextInput).attrs({ type: 'text' })`
  font-size: 18px;
  margin-top: 7px;
`;

const QuestionDescriptionInput = styled(TextInput).attrs({ type: 'text' })`
  font-size: 15px;
  margin-top: 7px;
  margin-bottom: 23px;
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
      <HeadContainer>
        <QuestionTitleInput
          theme={theme}
          onChange={(event) => handleChangeQuestion(event, questionId)}
          name="title"
          value={surveyData.questions[questionId].title || ''}
        />
        {QuestionTypeSelect({ selected, questionId, handleChangeQuestionType, theme })}
      </HeadContainer>

      <QuestionDescriptionInput
        theme={theme}
        onChange={(event) => handleChangeQuestion(event, questionId)}
        name="description"
        value={surveyData.questions[questionId].description || ''}
      />

      <AnswerLabel theme={theme}>{answerLabel}</AnswerLabel>

      <ButtonContainer>
        {EditQuestionButton({ editType: 'Add', questionId, handleClickButton, theme })}
        {EditQuestionButton({ editType: 'Delete', questionId, handleClickButton, theme })}
      </ButtonContainer>
    </Container>
  );
}
