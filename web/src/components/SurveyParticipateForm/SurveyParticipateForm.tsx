import React, { useEffect, useMemo, useRef, useState } from 'react';

import styled, { DefaultTheme } from 'styled-components';

import { QuestionBankResponse } from '../../types/response/QuestionBank';
import { SurveyResponse } from '../../types/response/Survey';
import { dateFormatUpToDate, getDDay } from '../../utils/dateFormat';
import { scrollToRef } from '../../utils/scroll';
import RectangleButton from '../Button/RectangleButton';
import { SurveyPageResultModal } from '../Modal';
import QuestionForm from './QuestionForm';

const Container = styled.div``;

const QuestionContainer = styled.div`
  margin-top: 23px;
  border-radius: ${(props) => props.theme.borderRadius};
  border-left: 16px solid ${(props) => props.theme.colors.primary};
  padding: 1.2vh 2vw 1.2vh 2vw;
  color: ${(props) => props.theme.colors.default};
  background-color: ${(props) => props.theme.colors.background};
`;

const HeadContainer = styled.div`
  padding: 6vh 8vw 0vh 8vw;
  background-color: ${(props) => props.theme.colors.container};
`;

const ButtonContainer = styled.div`
  padding: 10px;
  display: flex;
  justify-content: flex-end;
`;

const Title = styled.span`
  font-size: 40px;
  font-weight: 600;
  color: ${(props) => props.theme.colors.default};
`;

const EndDate = styled.label`
  font-size: 20px;
  font-weight: 600;
  margin-left: 15px;
  color: ${(props) => props.theme.colors.text};
`;

const BodyContainer = styled.div`
  width: 84vw;
  padding: 1vh 8vw 1vh 8vw;
  background-color: ${(props) => props.theme.colors.container};
`;

interface SurveyParticipateFormProps {
  surveyData: SurveyResponse;
  theme: DefaultTheme;
}

export default function SurveyParticipateForm({ surveyData, theme }: SurveyParticipateFormProps) {
  const questionRefs = useRef<HTMLDivElement[]>([]);
  const [endedDate, setEndedDate] = useState<string>('');
  const [userResponses, setUserResponses] = useState<string[]>([]);
  const [resultModalOpen, setResultModalOpen] = useState<boolean>(false);

  const remainDate = useMemo(() => getDDay(endedDate), [endedDate]);

  const postSurveyAnswers = async () => {
    console.log(userResponses);
    // FIXME: post answers to server
    // axios.post(requests.postSurvey)

    // FIXME: when post server success
    if (true) {
      setResultModalOpen(true);
    }
  };

  const turnOnUserAttention = (domIndex: number) => {
    questionRefs.current[domIndex].style.borderLeft = '16px solid #FF5733';
    scrollToRef(questionRefs, domIndex);
  };

  const turnOffUserAttention = (domIndex: number) => {
    questionRefs.current[domIndex].style.borderLeft = `16px solid ${theme.colors.primary}`;
  };

  const checkAnswers = () => {
    let answersVerification = true;
    if (typeof surveyData !== 'undefined') {
      for (let i = 0; i < surveyData.questions.length; i += 1) {
        // TODO: response validation will be needed
        if (typeof userResponses[i] === 'undefined' || userResponses[i] === '') {
          turnOnUserAttention(i);
          answersVerification = false;
          break;
        } else {
          turnOffUserAttention(i);
        }
      }
    }
    return answersVerification;
  };

  const handleSubmitButtonClick = () => {
    const answersVerificationResult = checkAnswers();

    if (answersVerificationResult) {
      postSurveyAnswers();
    }
  };

  useEffect(() => {
    if (typeof surveyData !== 'undefined') {
      setEndedDate(`${surveyData.endedDate}`);
    }
  }, [surveyData]);

  return (
    <Container>
      <HeadContainer theme={theme}>
        <Title theme={theme}>{surveyData?.title}</Title>
        <EndDate theme={theme}>
          ~ {dateFormatUpToDate(endedDate)} (D-{remainDate})
        </EndDate>
      </HeadContainer>

      <BodyContainer theme={theme}>
        {surveyData?.questions?.map((question: QuestionBankResponse, index: number) => (
          <QuestionContainer
            theme={theme}
            key={question.questionBankId}
            ref={(element) => {
              questionRefs.current[index] = element as HTMLDivElement;
            }}
          >
            <QuestionForm
              key={question.questionBankId}
              question={question}
              index={index}
              userResponses={userResponses}
              setUserResponses={setUserResponses}
              theme={theme}
            />
          </QuestionContainer>
        ))}

        <ButtonContainer>
          <RectangleButton
            backgroundColor={theme.colors.primary}
            hoverColor={theme.colors.prhover}
            text="제출하기"
            theme={theme}
            handleClick={handleSubmitButtonClick}
            width="20vw"
          />
        </ButtonContainer>
      </BodyContainer>
      {resultModalOpen && <SurveyPageResultModal theme={theme} />}
    </Container>
  );
}
