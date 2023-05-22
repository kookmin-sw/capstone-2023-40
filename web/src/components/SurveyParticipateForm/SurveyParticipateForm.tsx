import React, { useEffect, useMemo, useRef, useState } from 'react';

import { useDispatch } from 'react-redux';
import styled, { DefaultTheme } from 'styled-components';

import axios from '../../api/axios';
import { requests } from '../../api/request';
import { AnsweredQuestion, SurveySubmitRequest } from '../../types/request';
import { QuestionBankResponse } from '../../types/response/QuestionBank';
import { SurveyResponse } from '../../types/response/Survey';
import { dateFormatUpToDate, getDDay } from '../../utils/dateFormat';
import { removeEmptyAnswer } from '../../utils/removeEmptyAnswer';
import { responseErrorHandle } from '../../utils/responseErrorHandle';
import { scrollToRef } from '../../utils/scroll';
import RectangleButton from '../Button/RectangleButton';
import { AlertModal, ConfirmModal, SurveyPageResultModal } from '../Modal';
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
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
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
  const dispatch = useDispatch();
  const questionRefs = useRef<HTMLDivElement[]>([]);
  const [endedDate, setEndedDate] = useState<string>('');
  const [resultModalOpen, setResultModalOpen] = useState<boolean>(false);
  const [alertModalOpen, setAlertModalOpen] = useState<boolean>(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState<boolean>(false);
  const [warnText, setWarnText] = useState<string>('');
  const [userAnswers, setUserAnswers] = useState<Array<AnsweredQuestion>>([]);
  const [earnedPoint, setEarnedPoint] = useState<number>(0);

  const remainDate = useMemo(() => getDDay(endedDate), [endedDate]);

  const postSurveyAnswers = async () => {
    const surveySubmitData: SurveySubmitRequest = {
      surveyId: surveyData.surveyId,
      answers: removeEmptyAnswer(userAnswers),
    };
    axios
      .post(requests.submitSurvey, surveySubmitData)
      .then((response) => {
        setEarnedPoint(response.data.rewardPoints);
        setResultModalOpen(true);
        setConfirmModalOpen(false);
      })
      .catch((error) => {
        const errorMessages: string[] = responseErrorHandle(error, dispatch);
        setWarnText(errorMessages[0]);
        setAlertModalOpen(true);
        setConfirmModalOpen(false);
      });
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
        if (typeof userAnswers[i] === 'undefined' && surveyData.questions[i].isRequired) {
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
      setConfirmModalOpen(true);
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
              userAnswers={userAnswers}
              setUserAnswers={setUserAnswers}
              theme={theme}
            />
          </QuestionContainer>
        ))}

        <ButtonContainer>
          <RectangleButton
            textColor="white"
            backgroundColor={theme.colors.primary}
            hoverColor={theme.colors.prhover}
            text="제출하기"
            theme={theme}
            handleClick={handleSubmitButtonClick}
            width="20vw"
            disabled={resultModalOpen}
          />
        </ButtonContainer>
      </BodyContainer>

      {resultModalOpen && <SurveyPageResultModal point={earnedPoint} theme={theme} />}

      {alertModalOpen && (
        <AlertModal
          theme={theme}
          title="경고"
          level="WARN"
          text={warnText}
          buttonText="확인"
          onClose={() => setAlertModalOpen(false)}
        />
      )}
      {confirmModalOpen && (
        <ConfirmModal
          theme={theme}
          title="확인"
          level="INFO"
          text="제출하시겠습니까?"
          handleCancelClick={() => setConfirmModalOpen(false)}
          handleConfirmClick={() => postSurveyAnswers()}
        />
      )}
    </Container>
  );
}
