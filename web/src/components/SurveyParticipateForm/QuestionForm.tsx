import React from 'react';

import styled, { DefaultTheme } from 'styled-components';

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
  userResponses: string[];
  setUserResponses: (arg: string[]) => void;
  theme: DefaultTheme;
}
export default function QuestionForm({ question, index, userResponses, setUserResponses, theme }: QuestionFormProps) {
  // FIXME: it cause rerendering every single typing
  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLInputElement>) => {
    const newInputs = [...userResponses];
    newInputs[index] = event.target.value;
    setUserResponses(newInputs);
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
          theme={theme}
        />
      </BodyContainer>
    </Container>
  );
}
