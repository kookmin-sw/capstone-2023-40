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

const SurveyTitleInput = styled.input`
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

const SurveyDescriptionInput = styled.input`
  width: 76vw;
  padding: 1.2vh 1.5vw 1.2vh 1.5vw;
  margin-bottom: 25px;
  border: ${(props) => props.theme.border};
  border-radius: ${(props) => props.theme.borderRadius};
  font-size: 18px;
  font-weight: 900;
  color: ${(props) => props.theme.colors.default};
  background-color: ${(props) => props.theme.colors.container};
`;

const SurveyEndDateInput = styled.input`
  width: 12vw;
  padding: 1.2vh 1.5vw 1.2vh 1.5vw;
  margin-bottom: 25px;
  margin-left: 64vw;
  border: ${(props) => props.theme.border};
  border-radius: ${(props) => props.theme.borderRadius};
  font-size: 18px;
  font-weight: 900;
  color: ${(props) => props.theme.colors.default};
  background-color: ${(props) => props.theme.colors.container};
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

const AuthList = styled.select`
  width: 12vw;
  padding: 1.2vh 1.5vw 1.2vh 1.5vw;
  margin-left: 40vw;
  border: ${(props) => props.theme.border};
  border-radius: ${(props) => props.theme.borderRadius};
  font-size: 18px;
  font-weight: 900;
  color: ${(props) => props.theme.colors.default};
  background-color: ${(props) => props.theme.colors.container};
`;

const Auth = styled.option``;

const QuestionContainer = styled(ItemContainer)``;

const TitleInput = styled.input``;

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

  return (
    <Container theme={theme}>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <HeadContainer theme={theme}>
        <Title>설문조사 작성</Title>
      </HeadContainer>

      <BodyContainer theme={theme}>
        <SurveyDataContainer theme={theme}>
          <SurveyTitleInput type="text" value="제목없는 설문" />
          <SurveyDescriptionInput type="text" value="설문 요약 없음" />
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
      </BodyContainer>
    </Container>
  );
}
