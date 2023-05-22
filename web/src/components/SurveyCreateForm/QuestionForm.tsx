import React from 'react';

import styled, { DefaultTheme } from 'styled-components';

import { QuestionType } from '../../types/request/Question';
import { SurveyCreateRequest } from '../../types/request/Survey';
import { PlusImage, TrashImage } from '../Button/ImageButtons';
import ToggleSwitch from '../ToggleSwitch';
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
  margin-top: 10px;
`;

const ButtonWrapper = styled.div<{ flexJustify: string }>`
  width: 30%;
  display: flex;
  justify-content: ${(props) => props.flexJustify};
`;

const HeadContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const OptionListContainer = styled.div``;

const TextInput = styled.input.attrs({ type: 'text', maxLength: 100 })`
  flex-basis: 80%;
  padding: 1.2vh 1.5vw 1.2vh 1.5vw;
  border: ${(props) => props.theme.border};
  border-radius: ${(props) => props.theme.borderRadius};
  font-weight: 900;
  color: ${(props) => props.theme.colors.text};
  background-color: ${(props) => props.theme.colors.inputBackground};
  cursor: text;

  ::placeholder {
    color: ${(props) => props.theme.colors.placeHolder};
  }
`;

const QuestionTitleInput = styled(TextInput).attrs({ type: 'text' })`
  width: 70%;
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
  width: 30%;
  padding: 1.2vh 1.5vw 1.2vh 1.5vw;
  font-size: 15px;
  color: ${(props) => props.theme.colors.text};
  text-decoration: underline;
  text-decoration-style: dotted;
  text-decoration-color: currentColor;
  border: ${(props) => props.theme.border};
  border-radius: ${(props) => props.theme.borderRadius};

  @media screen and (max-width: 650px) {
    width: 65%;
  }
`;

const AddOptionButton = styled.button`
  font-weight: 900;
  text-align: center;
  padding: 10px;
  color: ${(props) => props.theme.colors.text};
  background-color: ${(props) => props.theme.colors.button};
  border: ${(props) => props.theme.border};
  border-radius: ${(props) => props.theme.borderRadius};
  margin-top: 3px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.colors.btnhover};
  }
`;

interface SubjectiveAnswerFormProps {
  surveyData: SurveyCreateRequest;
  selected: number;
  questionId: number;
  handleChangeQuestion: (event: React.ChangeEvent<HTMLInputElement>, questionId: number) => void;
  handleChangeQuestionType: (event: React.ChangeEvent<HTMLSelectElement>, questionId: number) => void;
  handleClickButton: (name: string, questionId?: number, optionId?: number) => void;
  handleChangeOption: (event: React.ChangeEvent<HTMLInputElement>, questionId: number, optionId: number) => void;
  handleToggleSwitch: (event: React.ChangeEvent<HTMLInputElement>, questionId: number) => void;
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
  handleToggleSwitch,
  theme,
}: SubjectiveAnswerFormProps) {
  const answerLabel = selected === QuestionType.LONG_ANSWER ? '장문형 답변이 입력됩니다.' : '단답형 답변이 입력됩니다.';
  const toggleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleToggleSwitch(event, questionId);
  };

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
        <OptionListContainer>
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
        </OptionListContainer>
      )}

      <ButtonContainer>
        <ButtonWrapper flexJustify="flex-start">
          <ToggleSwitch
            switchOnText="필수"
            switchOffText="선택"
            switchOnTextColor="white"
            switchOffTextColor={theme.colors.text}
            switchOnBackgroundColor={theme.colors.primary}
            switchOffBackgroundColor={theme.colors.button}
            toggleColor="white"
            isChecked={surveyData.questions[questionId].isRequired}
            handleChange={toggleOnChange}
          />
        </ButtonWrapper>
        <ButtonWrapper flexJustify="center">
          <PlusImage
            data-testid="addQuestion"
            onClick={() => handleClickButton('addQuestion', questionId)}
            invert={theme.iconInvert || '0%'}
          />
        </ButtonWrapper>
        <ButtonWrapper flexJustify="flex-end">
          <TrashImage
            data-testid="deleteQuestion"
            onClick={() => handleClickButton('deleteQuestion', questionId)}
            invert={theme.iconInvert || '0%'}
          />
        </ButtonWrapper>
      </ButtonContainer>
    </Container>
  );
}
