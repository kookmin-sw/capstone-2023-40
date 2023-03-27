import React, { useState, useEffect } from 'react';

import { AxiosResponse, AxiosError } from 'axios';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import axios from '../../api/axios';
import requests from '../../api/request';
import Header from '../../components/Header';
import { useTheme } from '../../hooks/useTheme';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;

const HeadContainer = styled.div`
  padding: 6vh 8vw 0vh 8vw;
  background-color: ${(props) => props.theme.colors.container};
`;

const Title = styled.span`
  font-size: 40px;
  font-weight: 600;
  color: ${(props) => props.theme.colors.default};
`;

const EndDate = styled.label`
  font-size: 20px;
  font-weight: 600;
  color: ${(props) => props.theme.colors.text};
`;

const BodyContainer = styled.div`
  width: 84vw;
  padding: 1vh 8vw 1vh 8vw;
  background-color: ${(props) => props.theme.colors.container};
`;

const QuestionContainer = styled.div`
  margin-top: 23px;
  border-radius: 8px;
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
  border-radius: 15px;
  font-size: 18px;
  font-weight: 900;
  color: ${(props) => props.theme.colors.default};
  background-color: ${(props) => props.theme.colors.container};
`;

const Answer = styled.textarea`
  padding: 1.2vh 2vw 1.2vh 2vw;
  margin-bottom: 5px;
  border-radius: 15px;

  font-weight: 100;
  color: ${(props) => props.theme.colors.default};
  background-color: ${(props) => props.theme.colors.container};
`;

const LongAnswer = styled(Answer)`
  width: 74vw;
  height: 70px;
  font-size: 15px;
`;

const ShortAnswer = styled(Answer)`
  text-align: center;
  width: 20vw;
  height: 22px;
  font-size: 18px;
  margin-left: 55vw;
`;

const MultipleChoiceContainer = styled.div`
  padding: 0px;
`;

const RadioContainer = styled.label`
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  font-size: 16px;
  padding: 1.2vh 1vw 1.2vh 1vw;
  margin-left: 1.3vw;
  margin-bottom: 10px;
  border-radius: 15px;
  width: 75.7vw;
  color: ${(props) => props.theme.colors.default};
  background-color: ${(props) => props.theme.colors.container};
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

const SubmitButton = styled.button`
  margin-top: 1vh;
  border: none;
  padding: 2vh;
  padding-left: 3vw;
  padding-right: 3vw;
  margin-top: 30px;
  margin-left: 73vw;
  border-radius: ${(props) => props.theme.borderRadius};
  font-size: 2vh;
  font-weight: 700;
  color: ${(props) => props.theme.colors.text};
  background-color: ${(props) => props.theme.colors.primary};
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.colors.prhover};
  }
`;

interface QuestionOption {
  option_number: number;
  text: string;
}

interface SurveyQuestion {
  question_id: number;
  type: string;
  title: string;
  description: string;
  options: Array<QuestionOption>;
}

interface SurveyData {
  survey_id: string;
  author: number;
  title: string;
  description: string;
  created_date: string;
  ended_date: string;
  required_authentications: Array<string>;
  questions: Array<SurveyQuestion> | null;
}

// TODO: over ended date while participant survey
export default function SurveyPage() {
  const { id } = useParams();
  const [surveyData, setSurveyData] = useState<SurveyData>();
  const [theme, toggleTheme] = useTheme();

  const fetchSurveyData = async () => {
    try {
      const request: AxiosResponse<SurveyData> = await axios.get<SurveyData>(requests.fetchSurvey + id);
      setSurveyData(request.data);
    } catch (error) {
      const { name } = error as unknown as AxiosError;
    }
  };

  useEffect(() => {
    fetchSurveyData();
  }, []);

  const makeInputBox = (question: SurveyQuestion) => {
    if (question.type === 'LONG_ANSWER') {
      return <LongAnswer theme={theme} />;
    }
    return <ShortAnswer theme={theme} />;
  };

  const [select, setSelect] = useState<string>('optionA');

  return (
    <Container theme={theme}>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <HeadContainer theme={theme}>
        <Title theme={theme}>{surveyData?.title}</Title>
        <EndDate theme={theme}> &nbsp;&nbsp;~ {surveyData?.ended_date.substring(0, 10)}</EndDate>
      </HeadContainer>

      <BodyContainer theme={theme}>
        {surveyData?.questions?.map((question: SurveyQuestion, index) => (
          <QuestionContainer theme={theme} key={question.question_id}>
            <QuestionTitle theme={theme}>
              {index + 1}.&nbsp;&nbsp;{question.title}
            </QuestionTitle>
            {question.type === 'MULTIPLE_CHOICE' ? (
              <MultipleChoiceContainer theme={theme}>
                {question.options.map((option: QuestionOption) => (
                  <RadioContainer theme={theme} key={option.option_number}>
                    <RadioInput
                      theme={theme}
                      name={question.title}
                      checked={select === `${option.option_number}`}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setSelect(event.target.value);
                      }}
                      value={`${option.option_number}`}
                    />
                    <RadioCheckmark theme={theme} />
                    {option.text}
                  </RadioContainer>
                ))}
              </MultipleChoiceContainer>
            ) : (
              makeInputBox(question)
            )}
          </QuestionContainer>
        ))}
        <SubmitButton theme={theme}>제출하기</SubmitButton>
      </BodyContainer>
    </Container>
  );
}
