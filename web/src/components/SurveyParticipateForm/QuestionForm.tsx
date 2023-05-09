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
  background-color: ${(props) => props.theme.colors.container};
`;

const Description = styled(TextLabel)`
  font-size: 15px;
  margin-bottom: 23px;
  background-color: ${(props) => props.theme.colors.inputBackground};
`;

interface QuestionFormProps {
  question: QuestionBankResponse;
  index: number;
  userResponses: AnsweredQuestion[];
  setUserResponses: (arg: AnsweredQuestion[]) => void;
  theme: DefaultTheme;
}

export default function QuestionForm({ question, index, userResponses, setUserResponses, theme }: QuestionFormProps) {
  const [choiceIsChecked, setChoiceIsChecked] = useState<boolean>(false);

  const editSelectedChoiceList = (value: number, isChecked: boolean) => {
    const newUserResponses = [...userResponses];

    if (typeof newUserResponses[index] === 'undefined') {
      newUserResponses[index] = { questionBankId: question.questionBankId };
    }

    if (isChecked) {
      newUserResponses[index] = {
        questionBankId: question.questionBankId,
        multipleChoices: [...(newUserResponses[index].multipleChoices || []), value],
      };
    } else {
      newUserResponses[index] = {
        questionBankId: question.questionBankId,
        multipleChoices: newUserResponses[index].multipleChoices?.filter((item: number) => item !== value),
      };
    }

    setUserResponses(newUserResponses);
  };

  const handleChangeCheck = (event: React.ChangeEvent<HTMLInputElement>, value: number) => {
    setChoiceIsChecked(!choiceIsChecked);
    editSelectedChoiceList(value, event.target.checked);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLInputElement>) => {
    const newUserResponses = [...userResponses];
    switch (question.questionType) {
      case QuestionType.SINGLE_CHOICE:
        newUserResponses[index] = { questionBankId: question.questionBankId, singleChoice: Number(event.target.value) };
        break;
      case QuestionType.SHORT_ANSWER:
        newUserResponses[index] = { questionBankId: question.questionBankId, shortAnswer: event.target.value };
        break;
      case QuestionType.LONG_ANSWER:
        newUserResponses[index] = { questionBankId: question.questionBankId, longAnswer: event.target.value };
        break;
      default:
        break;
    }
    setUserResponses(newUserResponses);
  };

  // TODO: show current and max text count
  return (
    <Container>
      <HeadContainer>
        <Title theme={theme}>
          {index + 1}.&nbsp;&nbsp;{question.title}
        </Title>
        <Description theme={theme}>{question.description}</Description>
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
