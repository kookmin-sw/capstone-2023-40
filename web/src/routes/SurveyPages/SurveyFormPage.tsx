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

const Select = styled.select`
  padding: 1.2vh 1.5vw 1.2vh 1.5vw;
  border: ${(props) => props.theme.border};
  border-radius: ${(props) => props.theme.borderRadius};
  font-size: 18px;
  font-weight: 900;
  color: ${(props) => props.theme.colors.default};
  background-color: ${(props) => props.theme.colors.container};
`;

const AuthList = styled.div``;

const AuthCheckBox = styled.input``;

const AuthLabel = styled.label``;

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
  options: Array<QuestionOption> | null;
}

interface SurveyData {
  // survey_id: string;
  // author: number;
  title: string;
  description: string;
  // created_date: string;
  ended_date: string;
  required_authentications: Array<string>;
  // questions: Array<SurveyQuestion>;
}

export default function SurveyFormPage() {
  const authList = ['카카오', '구글', '운전면허', '웹메일'];
  const [theme, toggleTheme] = useTheme();
  const [questions, setQuestions] = useState<SurveyQuestion[]>([]);
  const [requiredAuthentications, setRequiredAuthentications] = useState<string[]>([]);
  const [authIsChecked, setAuthIsChecked] = useState<boolean>(false);
  const [surveyData, setSurveyData] = useState<SurveyData>();

  const handleStringInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (typeof surveyData !== 'undefined') {
      setSurveyData({
        ...surveyData,
        [name]: value,
      });
    }
  };

  const handleRequiredAuthentications = (value: string, isChecked: boolean) => {
    if (isChecked) {
      setRequiredAuthentications((prev) => [...prev, value]);
    } else {
      setRequiredAuthentications(requiredAuthentications.filter((item) => item !== value));
    }
  };

  const handleCheckInputChange = (event: React.ChangeEvent<HTMLInputElement>, value: string) => {
    setAuthIsChecked(!authIsChecked);
    handleRequiredAuthentications(value, event.target.checked);
  };

  const handleSubmit = () => {
    // TODO: put questions and requiredAuth to SurveyData
    if (typeof surveyData !== 'undefined') {
      setSurveyData({
        ...surveyData,
        required_authentications: requiredAuthentications,
      });
    }
  };

  const makeQuestion = (index: number) => {
    const newQuestion = {
      question_id: index,
      type: 'LONG_ANSWER',
      title: '',
      description: '',
      options: null,
    };
    setQuestions([...questions, newQuestion]);
  };

  const deleteQuestion = (index: number) => {
    setQuestions([...questions.filter((question) => question.question_id !== index)]);
  };

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { name } = event.target as HTMLInputElement;
    if (name === 'add') makeQuestion(questions.length);
    else deleteQuestion(1);
  };

  const questionTypeSelector = () => {
    return (
      <QuestionTypeSelector>
        <QuestionType>장문형 질문</QuestionType>
        <QuestionType>단답형 질문</QuestionType>
        <QuestionType>객관식 질문</QuestionType>
      </QuestionTypeSelector>
    );
  };

  const longAnswerForm = (questionId: number) => {
    return (
      <QuestionContainer key={questionId}>
        <TitleInput />
        {questionTypeSelector()}
        <Answer>장문형 텍스트</Answer>
      </QuestionContainer>
    );
  };

  const shortAnswerForm = (questionId: number) => {
    return (
      <QuestionContainer key={questionId}>
        <TitleInput />
        {questionTypeSelector()}
        <Answer>단답형 텍스트</Answer>
      </QuestionContainer>
    );
  };

  const multipleChoiceForm = (questionId: number) => {
    return <div key={questionId}>a</div>;
  };

  const showQuestionForm = (questionType: string, questionId: number) => {
    switch (questionType) {
      case 'LONG_ANSWER':
        return longAnswerForm(questionId);
      case 'SHORT_ANSWER':
        return shortAnswerForm(questionId);
      default:
        return multipleChoiceForm(questionId);
    }
  };

  useEffect(() => {
    const initialSurveyData = {
      title: '제목 없는 설문',
      description: '설문지 설명',
      ended_date: '',
      required_authentications: requiredAuthentications,
    };
    setSurveyData(initialSurveyData);
  }, []);

  useEffect(() => {
    console.log(surveyData);
  }, [surveyData]);

  useEffect(() => {
    console.log(requiredAuthentications);
  }, [requiredAuthentications]);

  useEffect(() => {
    console.log(questions);
  }, [questions]);

  return (
    <Container theme={theme}>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <HeadContainer theme={theme}>
        <Title>설문조사 작성</Title>
      </HeadContainer>

      <BodyContainer theme={theme}>
        <SurveyDataContainer theme={theme}>
          <SurveyTitleInput
            onChange={handleStringInputChange}
            name="title"
            type="text"
            value={surveyData?.title || ''}
          />
          <SurveyDescriptionInput
            onChange={handleStringInputChange}
            name="description"
            type="text"
            value={surveyData?.description || ''}
          />
          <SurveyRequireAuthContainer>
            <SelectedAuthList>
              {requiredAuthentications.map((auth: string) => (
                <SelectedAuth key={auth}>{auth}</SelectedAuth>
              ))}
            </SelectedAuthList>
            {authList.map((auth: string, index: number) => (
              <AuthList key={auth}>
                <AuthCheckBox
                  type="checkbox"
                  checked={requiredAuthentications.includes(auth)}
                  onChange={(e) => handleCheckInputChange(e, auth)}
                />
                <AuthLabel>{auth}</AuthLabel>
              </AuthList>
            ))}
          </SurveyRequireAuthContainer>
          <SurveyEndDateInput
            type="date"
            onChange={handleStringInputChange}
            name="ended_date"
            value={surveyData?.ended_date || ''}
          />
        </SurveyDataContainer>
        <AddButton name="add" onClick={handleButtonClick}>
          +
        </AddButton>
        <DeleteButton name="delete" onClick={handleButtonClick}>
          -
        </DeleteButton>

        {questions.map((question: SurveyQuestion) => showQuestionForm(question.type, question.question_id))}
      </BodyContainer>
    </Container>
  );
}
