import React from 'react';

import styled, { DefaultTheme } from 'styled-components';

import { QuestionType } from '../../types/request/Question';
import { SurveyCreateRequest } from '../../types/request/Survey';
import { PlusImage, TrashImage } from '../Styled/ImageButtons';
import OptionList from './OptionList';
import QuestionTypeSelector from './QuestionTypeSelector';

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

const SubjectiveQuestion = styled.div``;

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

const EmptyObject = styled.button`
  border: none;
  background-color: transparent;
  width: 35px;
  height: 35px;
`;

interface SubjectiveAnswerFormProps {
  surveyData: SurveyCreateRequest;
  selected: number;
  questionId: number;
  handleChangeQuestion: (event: React.ChangeEvent<HTMLInputElement>, questionId: number) => void;
  handleChangeQuestionType: (event: React.ChangeEvent<HTMLSelectElement>, questionId: number) => void;
  handleClickButton: (name: string, questionId?: number, optionId?: number) => void;
  handleChangeOption: (event: React.ChangeEvent<HTMLInputElement>, questionId: number, optionId: number) => void;
  theme: DefaultTheme;
}

export default function QuestionForm({
  surveyData,
  selected,
  questionId,
  handleChangeQuestion,
  handleChangeQuestionType,
  handleClickButton,
  handleChangeOption,
  theme,
}: SubjectiveAnswerFormProps) {
  let answerLabel = '';
  if (selected === QuestionType.LONG_ANSWER) {
    answerLabel = '장문형 답변이 입력됩니다.';
  } else {
    answerLabel = '단답형 답변이 입력됩니다.';
  }
  return (
    <Container data-testid="question">
      <HeadContainer>
        <QuestionTitleInput
          theme={theme}
          onChange={(event) => handleChangeQuestion(event, questionId)}
          name="title"
          value={surveyData.questions[questionId].title || ''}
          placeholder="설문의 제목을 입력해주세요"
        />
        <QuestionTypeSelector
          selected={selected}
          questionId={questionId}
          handleChange={handleChangeQuestionType}
          theme={theme}
        />
      </HeadContainer>

      <QuestionDescriptionInput
        theme={theme}
        onChange={(event) => handleChangeQuestion(event, questionId)}
        name="description"
        value={surveyData.questions[questionId].description || ''}
        placeholder="설문의 설명을 입력해주세요"
      />

      {selected === QuestionType.LONG_ANSWER || selected === QuestionType.SHORT_ANSWER ? (
        <AnswerLabel theme={theme}>{answerLabel}</AnswerLabel>
      ) : (
        <SubjectiveQuestion>
          <OptionList
            surveyData={surveyData}
            questionId={questionId}
            handleClickButton={handleClickButton}
            handleOptionChange={handleChangeOption}
            theme={theme}
          />
          <ButtonContainer>
            <AddOptionButton theme={theme} name="addOption" onClick={() => handleClickButton('addOption', questionId)}>
              문항 추가하기
            </AddOptionButton>
          </ButtonContainer>
        </SubjectiveQuestion>
      )}

      <ButtonContainer>
        <EmptyObject />
        <PlusImage
          data-testid="addQuestion"
          onClick={() => handleClickButton('addQuestion', questionId)}
          theme={theme}
        />
        <TrashImage
          data-testid="deleteQuestion"
          onClick={() => handleClickButton('deleteQuestion', questionId)}
          theme={theme}
        />
      </ButtonContainer>
    </Container>
  );
}
