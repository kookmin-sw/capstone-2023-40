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
  background-color: ${(props) => props.theme.colors.container};
`;

const HeadContainer = styled.div``;
const Title = styled.label`
  font-size: 40px;
  font-weight: 700;
  color: ${(props) => props.theme.colors.default};
`;
const EndDate = styled.label`
  font-size: 18px;
  font-weight: 700;
  color: ${(props) => props.theme.colors.text};
`;

const BodyContainer = styled.div``;

const QuestionContainer = styled.div`
  margin: 2px;
  padding: 2vh;
  font-size: 1.7vh;
  font-weight: bold;
  border-radius: 5px;
  color: ${(props) => props.theme.colors.default};
  background-color: ${(props) => props.theme.colors.background};
`;
const QuestionTitle = styled.div`
  margin: 2px;
  padding: 2vh;
  font-size: 1.7vh;
  font-weight: bold;
  border-radius: 5px;
  color: ${(props) => props.theme.colors.default};
  background-color: ${(props) => props.theme.colors.container};
`;

const MultipleChoiceContainer = styled.div``;
const ChoiceOption = styled.input``;
const ChoiceLabel = styled.label``;

const LongAnswerInput = styled.input`
  background-color: red;
`;
const ShortAnswerInput = styled.input``;

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
      return <LongAnswerInput theme={theme} />;
    }
    return <ShortAnswerInput theme={theme} />;
  };

  return (
    <Container theme={theme}>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <HeadContainer theme={theme}>
        <Title theme={theme}>{surveyData?.title}</Title>
        <EndDate theme={theme}> ~{surveyData?.ended_date.substring(0, 10)}</EndDate>
      </HeadContainer>

      <BodyContainer theme={theme}>
        {surveyData?.questions?.map((question: SurveyQuestion) => (
          <QuestionContainer theme={theme} key={question.question_id}>
            <QuestionTitle theme={theme}>{question.title}</QuestionTitle>
            {question.type === 'MULTIPLE_CHOICE' ? (
              <MultipleChoiceContainer theme={theme}>
                {question.options.map((option: QuestionOption) => (
                  <ChoiceLabel theme={theme} key={option.option_number}>
                    <ChoiceOption theme={theme} type="radio" name={question.title} />
                    {option.text}
                    <br />
                  </ChoiceLabel>
                ))}
              </MultipleChoiceContainer>
            ) : (
              makeInputBox(question)
            )}
          </QuestionContainer>
        ))}
      </BodyContainer>
    </Container>
  );
}
