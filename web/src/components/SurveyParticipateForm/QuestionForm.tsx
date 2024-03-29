import React, { useState } from 'react';

import styled, { DefaultTheme } from 'styled-components';

import { AnsweredQuestion, QuestionType } from '../../types/request';
import { QuestionBankResponse } from '../../types/response/QuestionBank';
import ResponseInputForm from './ResponseInputForm';

const Container = styled.div``;

const HeadContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap-reverse;
`;

const BodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
`;

const TextLabel = styled.label`
  margin-top: 7px;
  padding: 1.2vh 1.5vw 1.2vh 1.5vw;
  border: ${(props) => props.theme.border};
  border-radius: ${(props) => props.theme.borderRadius};
  font-weight: 900;
  color: ${(props) => props.theme.colors.default};
`;

const Title = styled(TextLabel)`
  font-size: 18px;
  background-color: ${(props) => props.theme.colors.background};
`;

const Description = styled(TextLabel)`
  width: 80%;
  font-size: 15px;
  margin-bottom: 23px;
  background-color: ${(props) => props.theme.colors.background};

  @media screen and (max-width: 1050px) {
    width: 100%;
    margin-bottom: 0px;
  }
`;

const RequiredOption = styled(TextLabel)<{ isRequired: boolean }>`
  color: ${(props) => (props.isRequired ? props.theme.colors.primary : props.theme.colors.text)};
  font-size: 15px;
  margin-bottom: 23px;
  background-color: ${(props) => props.theme.colors.background};

  @media screen and (max-width: 1050px) {
    width: 100%;
  }
`;

interface QuestionFormProps {
  question: QuestionBankResponse;
  index: number;
  userAnswers: Array<AnsweredQuestion>;
  setUserAnswers: (arg: AnsweredQuestion[]) => void;
  theme: DefaultTheme;
}

export default function QuestionForm({ question, index, userAnswers, setUserAnswers, theme }: QuestionFormProps) {
  const [choiceIsChecked, setChoiceIsChecked] = useState<boolean>(false);

  const editSelectedChoiceList = (value: number, isChecked: boolean) => {
    const newUserAnswers = [...userAnswers];

    if (typeof newUserAnswers[index] === 'undefined') {
      newUserAnswers[index] = {
        questionBankId: question.questionBankId,
        isRequired: question.isRequired,
        questionType: question.questionType,
      };
    }

    if (isChecked) {
      newUserAnswers[index] = {
        questionBankId: question.questionBankId,
        isRequired: question.isRequired,
        questionType: question.questionType,
        multipleChoices: [...(newUserAnswers[index].multipleChoices || []), value],
      };
    } else {
      newUserAnswers[index] = {
        questionBankId: question.questionBankId,
        isRequired: question.isRequired,
        questionType: question.questionType,
        multipleChoices: newUserAnswers[index].multipleChoices?.filter((item: number) => item !== value),
      };
    }

    setUserAnswers(newUserAnswers);
  };

  const handleChangeCheck = (event: React.ChangeEvent<HTMLInputElement>, value: number) => {
    setChoiceIsChecked(!choiceIsChecked);
    editSelectedChoiceList(value, event.target.checked);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLInputElement>) => {
    const newUserAnswers = [...userAnswers];
    let tmpQuestionType: number | string;
    if (typeof question.questionType === 'undefined') {
      tmpQuestionType = -1;
    } else if (typeof question.questionType === 'string') {
      tmpQuestionType = QuestionType[question.questionType];
    } else {
      tmpQuestionType = question.questionType;
    }

    switch (tmpQuestionType) {
      case QuestionType.SINGLE_CHOICE:
        newUserAnswers[index] = {
          questionBankId: question.questionBankId,
          isRequired: question.isRequired,
          questionType: question.questionType,
          singleChoice: Number(event.target.value),
        };
        break;
      case QuestionType.SHORT_ANSWER:
        newUserAnswers[index] = {
          questionBankId: question.questionBankId,
          isRequired: question.isRequired,
          questionType: question.questionType,
          shortAnswer: event.target.value,
        };
        break;
      case QuestionType.LONG_ANSWER:
        newUserAnswers[index] = {
          questionBankId: question.questionBankId,
          isRequired: question.isRequired,
          questionType: question.questionType,
          longAnswer: event.target.value,
        };
        break;
      default:
        break;
    }
    setUserAnswers(newUserAnswers);
  };

  // TODO: show current and max text count
  return (
    <Container>
      <HeadContainer>
        <Title theme={theme}>
          {index + 1}.&nbsp;&nbsp;{question.title}
        </Title>
        <DescriptionContainer>
          <RequiredOption isRequired={question.isRequired} theme={theme}>
            {question.isRequired ? '필수 응답 질문' : '선택 응답 질문'}
          </RequiredOption>
          <Description theme={theme}>{question.description}</Description>
        </DescriptionContainer>
      </HeadContainer>

      <BodyContainer>
        <ResponseInputForm
          questionType={question.questionType}
          options={question.questionOptions}
          questionBankId={question.questionBankId}
          handleInputChange={handleInputChange}
          handleChangeCheck={handleChangeCheck}
          theme={theme}
        />
      </BodyContainer>
    </Container>
  );
}
