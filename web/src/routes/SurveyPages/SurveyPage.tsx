import React, { useState, useEffect, useRef, useMemo } from 'react';

import { AxiosResponse, AxiosError } from 'axios';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import axios from '../../api/axios';
import { requests } from '../../api/request';
import RectangleButton from '../../components/Button/RectangleButton';
import Header from '../../components/Header';
import SurveyPageResultModal from '../../components/Modal/SurveyPageResultModal';
import SurveyPageSkeleton from '../../components/Skeleton/SurveyPageSkeleton';
import { useTheme } from '../../hooks/useTheme';
import { QuestionType } from '../../types/request/Question';
import { QuestionBankResponse } from '../../types/response/QuestionBank';
import { QuestionOptionResponse } from '../../types/response/QuestionOption';
import { SurveyResponse } from '../../types/response/Survey';
import { scrollToRef } from '../../utils/scroll';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${(props) => props.theme.colors.container};
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

const QuestionContainer = styled.div`
  margin-top: 23px;
  border-radius: ${(props) => props.theme.borderRadius};
  border-left: 10px solid ${(props) => props.theme.colors.primary};
  padding: 1.2vh 2vw 1.2vh 2vw;
  color: ${(props) => props.theme.colors.default};
  background-color: ${(props) => props.theme.colors.background};
`;

const QuestionTitle = styled.div`
  width: 76vw;
  padding: 1.2vh 1.5vw 1.2vh 1.5vw;
  margin-top: 7px;
  margin-bottom: 25px;
  border: ${(props) => props.theme.border};
  border-radius: ${(props) => props.theme.borderRadius};
  font-size: 18px;
  font-weight: 900;
  color: ${(props) => props.theme.colors.default};
  background-color: ${(props) => props.theme.colors.container};
`;

const Answer = styled.textarea`
  padding: 1.2vh 2vw 1.2vh 2vw;
  margin-bottom: 5px;
  border-radius: ${(props) => props.theme.borderRadius};
  border: ${(props) => props.theme.border};
  resize: none;
  font-weight: 100;
  color: ${(props) => props.theme.colors.default};
  background-color: ${(props) => props.theme.colors.container};
`;

const LongAnswer = styled(Answer)`
  width: 75vw;
  height: 70px;
  font-size: 15px;
`;

const ShortAnswer = styled(Answer)`
  text-align: center;
  width: 20vw;
  height: 18px;
  font-size: 15px;
  margin-left: 55vw;
`;

const MultipleChoiceContainer = styled.div`
  padding: 0px;
`;
// FIXME: radio button is working but need refactoring
const RadioContainer = styled.label`
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  font-size: 16px;
  padding: 1.2vh 1vw 1.2vh 1vw;
  margin-left: 1.3vw;
  margin-bottom: 10px;
  border-radius: ${(props) => props.theme.borderRadius};
  border: ${(props) => props.theme.border};
  width: 75.7vw;
  color: ${(props) => props.theme.colors.default};
  background-color: ${(props) => props.theme.colors.container};

  &:hover {
    opacity: 0.8;
  }
`;

const RadioInput = styled.input.attrs({ type: 'radio' })`
  position: absolute;
  opacity: 0;
  cursor: pointer;

  &:checked + span:before {
    background: ${(props) => props.theme.colors.primary};
    border: 7px solid ${(props) => props.theme.colors.primary};
  }
`;

const RadioCheckmark = styled.span`
  position: relative;
  display: inline-block;
  height: 20px;
  width: 20px;
  margin-right: 15px;
  background: transparent;
  border: 2px solid #999da0;
  border-radius: 50%;

  &:before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 10px;
    width: 10px;
    border-radius: 50%;
  }
`;

export default function SurveyPage() {
  const nowDate = new Date();
  const { id } = useParams();
  const [theme, toggleTheme] = useTheme();
  const questionRefs = useRef<HTMLDivElement[]>([]);

  const [surveyData, setSurveyData] = useState<SurveyResponse>();
  const [endedDate, setEndedDate] = useState<string>('');
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [resultModalOpen, setResultModalOpen] = useState<boolean>(false);

  const getDateDiff = (date: string) => {
    const endDate = new Date(date);

    const dateDiff = endDate.getTime() - nowDate.getTime();

    return Math.floor(Math.abs(dateDiff / (1000 * 60 * 60 * 24)));
  };

  const remainDate = useMemo(() => getDateDiff(endedDate), [endedDate]);

  const fetchSurveyData = async () => {
    setIsLoading(true);
    try {
      const request: AxiosResponse<SurveyResponse> = await axios.get<SurveyResponse>(requests.getSurvey + id);
      setSurveyData(request.data);
      setIsLoading(false);
    } catch (error) {
      const { name } = error as unknown as AxiosError;
      // TODO: handle error while fetching data
    }
  };

  const postSurveyAnswers = async () => {
    console.log(userAnswers);
    // FIXME: post answers to server
    // axios.post(requests.postSurvey)

    // FIXME: when post server success
    if (true) {
      setResultModalOpen(true);
    }
  };

  const turnOnUserAttention = (domIndex: number) => {
    questionRefs.current[domIndex].style.borderLeft = '15px solid #FF5733';
    scrollToRef(questionRefs, domIndex);
  };

  const turnOffUserAttention = (domIndex: number) => {
    questionRefs.current[domIndex].style.borderLeft = `10px solid ${theme.colors.primary}`;
  };

  const checkAnswers = () => {
    let answersVerification = true;
    if (typeof surveyData !== 'undefined') {
      for (let i = 0; i < surveyData.questions.length; i += 1) {
        // TODO: response validation will be needed
        if (typeof userAnswers[i] === 'undefined' || userAnswers[i] === '') {
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

  // FIXME: it cause rerendering every single typing
  const handleAnswerChange = (
    index: number,
    event: React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLInputElement>
  ) => {
    const newInputs = [...userAnswers];
    newInputs[index] = event.target.value;
    setUserAnswers(newInputs);
  };

  // TODO: show current and max text count
  const makeTextArea = (question: QuestionBankResponse, index: number) => {
    if (question.questionType === QuestionType.LONG_ANSWER) {
      return (
        <LongAnswer
          onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
            handleAnswerChange(index, event);
          }}
          maxLength={450}
          placeholder="답변을 입력해주세요"
          theme={theme}
        />
      );
    }
    return (
      <ShortAnswer
        onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
          handleAnswerChange(index, event);
        }}
        maxLength={19}
        placeholder="답변을 입력해주세요"
        theme={theme}
      />
    );
  };

  useEffect(() => {
    fetchSurveyData();
  }, []);

  useEffect(() => {
    if (typeof surveyData !== 'undefined') {
      setEndedDate(`${surveyData.endedDate}`);
    }
  }, [surveyData]);

  if (isLoading) {
    return (
      <Container theme={theme}>
        <Header theme={theme} toggleTheme={toggleTheme} />
        <SurveyPageSkeleton theme={theme} />
      </Container>
    );
  }
  return (
    <Container theme={theme}>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <HeadContainer theme={theme}>
        <Title theme={theme}>{surveyData?.title}</Title>
        <EndDate theme={theme}>
          ~ {endedDate} (D-{remainDate})
        </EndDate>
      </HeadContainer>

      <BodyContainer theme={theme}>
        {surveyData?.questions?.map((question: QuestionBankResponse, index) => (
          <QuestionContainer
            theme={theme}
            key={question.questionBankId}
            ref={(element) => {
              questionRefs.current[index] = element as HTMLDivElement;
            }}
          >
            <QuestionTitle theme={theme}>
              {index + 1}.&nbsp;&nbsp;{question.title}
            </QuestionTitle>
            {question.questionType === QuestionType.MULTIPLE_CHOICE ||
            question.questionType === QuestionType.SINGLE_CHOICE ? (
              <MultipleChoiceContainer theme={theme}>
                {question.questionOptions.map((option: QuestionOptionResponse) => (
                  <RadioContainer theme={theme} key={option.questionOptionId}>
                    <RadioInput
                      theme={theme}
                      name={question.title}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        handleAnswerChange(index, event);
                      }}
                      value={`${option.questionOptionId}`}
                    />
                    <RadioCheckmark theme={theme} />
                    {option.option}
                  </RadioContainer>
                ))}
              </MultipleChoiceContainer>
            ) : (
              makeTextArea(question, index)
            )}
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
