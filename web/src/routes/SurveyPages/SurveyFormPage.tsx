import React, { useState, useEffect } from 'react';

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

const HeadContainer = styled.div`
  padding: 6vh 8vw 0vh 8vw;
  background-color: ${(props) => props.theme.colors.container};
`;

const Title = styled.label`
  font-size: 40px;
  font-weight: 600;
  color: ${(props) => props.theme.colors.default};
`;

const BodyContainer = styled.div`
  width: 84vw;
  padding: 1vh 8vw 1vh 8vw;
  background-color: ${(props) => props.theme.colors.container};
`;

const ItemContainer = styled.div`
  margin-top: 23px;
  border-radius: ${(props) => props.theme.borderRadius};
  border-left: 10px solid ${(props) => props.theme.colors.primary};
  padding: 1.2vh 2vw 1.2vh 2vw;
  color: ${(props) => props.theme.colors.default};
  background-color: ${(props) => props.theme.colors.background};
`;

const SurveyDataContainer = styled(ItemContainer)``;

const Input = styled.input`
  padding: 1.2vh 1.5vw 1.2vh 1.5vw;
  border: ${(props) => props.theme.border};
  border-radius: ${(props) => props.theme.borderRadius};
  font-size: 18px;
  font-weight: 900;
  color: ${(props) => props.theme.colors.default};
  background-color: ${(props) => props.theme.colors.container};
`;

const SurveyTitleInput = styled(Input)`
  width: 76vw;
  margin-top: 7px;
  margin-bottom: 25px;
`;

const SurveyDescriptionInput = styled(Input)`
  width: 76vw;
  margin-bottom: 25px;
`;

const SurveyEndDateInput = styled(Input)`
  width: 12vw;
  margin-bottom: 25px;
  margin-left: 64vw;
`;

const SurveyRequireAuthContainer = styled.div`
  width: 76vw;
  padding: 1.2vh 1.5vw 1.2vh 1.5vw;
  margin-bottom: 25px;
  font-size: 18px;
  font-weight: 900;
`;

const SelectedAuthList = styled.span``;

const SelectedAuth = styled.label`
  margin: 5px;
  border-radius: ${(props) => props.theme.borderRadius};
  padding: 1.2vh 1.5vw 1.2vh 1.5vw;
  background-color: red;
`;

const AuthSelectButton = styled.button`
  width: 5vw;
  padding: 1.2vh 1.5vw 1.2vh 1.5vw;
  margin-left: 1vw;
  border: ${(props) => props.theme.border};
  border-radius: ${(props) => props.theme.borderRadius};
  font-size: 18px;
  font-weight: 900;
  color: ${(props) => props.theme.colors.default};
  background-color: ${(props) => props.theme.colors.primary};

  &:hover {
    background-color: ${(props) => props.theme.colors.prhover};
  }
`;

const Select = styled.select`
  padding: 1.2vh 1.5vw 1.2vh 1.5vw;
  border: ${(props) => props.theme.border};
  border-radius: ${(props) => props.theme.borderRadius};
  font-size: 18px;
  font-weight: 900;
  color: ${(props) => props.theme.colors.default};
  background-color: ${(props) => props.theme.colors.container};
`;

const AuthList = styled(Select)`
  width: 12vw;
  margin-left: 40vw;
`;

const Auth = styled.option``;

const QuestionContainer = styled(ItemContainer)``;

const QuestionTypeSelector = styled(Select)`
  width: 15vw;
  margin-left: 3vw;
`;

const QuestionType = styled.option``;

const TitleInput = styled(Input)`
  width: 57vw;
  margin-top: 7px;
  margin-bottom: 25px;
`;

const Answer = styled.label``;

const RadioAnswerInput = styled.div``;

const Button = styled.button``;

const AddButton = styled(Button)``;

const DeleteButton = styled(Button)``;

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
  questions: Array<SurveyQuestion>;
}

export default function SurveyFormPage() {
  const [theme, toggleTheme] = useTheme();
  const [questions, setQuestions] = useState<SurveyQuestion[]>([]);
  const [surveyData, setSurveyData] = useState<SurveyData>();

  const makeQuestionTypeSelector = () => {
    return (
      <QuestionTypeSelector>
        <QuestionType>단답형 질문</QuestionType>
        <QuestionType>장문형 질문</QuestionType>
        <QuestionType>객관식 질문</QuestionType>
      </QuestionTypeSelector>
    );
  };

  const makeLongAnswerForm = () => {
    return (
      <QuestionContainer>
        <TitleInput />
        {makeQuestionTypeSelector()}
        <Answer>장문형 텍스트</Answer>
      </QuestionContainer>
    );
  };

  const makeShortAnswerForm = () => {
    return (
      <QuestionContainer>
        <TitleInput />
        {makeQuestionTypeSelector()}
        <Answer>단답형 텍스트</Answer>
      </QuestionContainer>
    );
  };

  const makeMultipleChoiceForm = () => {};

  return (
    <Container theme={theme}>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <HeadContainer theme={theme}>
        <Title>설문조사 작성</Title>
      </HeadContainer>

      <BodyContainer theme={theme}>
        <SurveyDataContainer theme={theme}>
          <SurveyTitleInput type="text" value="제목없는 설문" />
          <SurveyDescriptionInput type="text" value="설문 설명 없음" />
          <SurveyRequireAuthContainer>
            <SelectedAuthList>
              <SelectedAuth>카카오</SelectedAuth>
              <SelectedAuth>구글</SelectedAuth>
            </SelectedAuthList>
            <AuthList>
              <Auth>카카오</Auth>
              <Auth>구글</Auth>
              <Auth>휴대폰</Auth>
            </AuthList>
            <AuthSelectButton>+</AuthSelectButton>
          </SurveyRequireAuthContainer>
          <SurveyEndDateInput type="date" />
        </SurveyDataContainer>
        {makeLongAnswerForm()}
      </BodyContainer>
    </Container>
  );
}
