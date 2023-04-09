import React, { useState, useEffect, useRef } from 'react';

import styled from 'styled-components';

// import axios from '../../api/axios';
// import requests from '../../api/request';
import Header from '../../components/Header';
import SurveyPageResultModal from '../../components/Modal/SurveyPageResultModal';
import ChoiceAnswerForm from '../../components/SurveyForm/ChoiceAnswerForm';
import SubjectiveAnswerForm from '../../components/SurveyForm/SubjectiveAnswerForm';
import SurveyDataForm from '../../components/SurveyForm/SurveyDataForm';
import { useTheme } from '../../hooks/useTheme';
import { QuestionCreateRequest, QuestionType } from '../../types/request/Question';
import { QuestionOptionCreateRequest } from '../../types/request/QuestionOption';
import { SurveyCreateRequest, CertificationType } from '../../types/request/Survey';
import { NumberUtils } from '../../utils/NumberUtils';

// TODO: add media-query for mobile....
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${(props) => props.theme.colors.container};
`;

const HeadContainer = styled.div`
  padding: 3vh 8vw 0vh 8vw;
  background-color: ${(props) => props.theme.colors.container};
`;

const Title = styled.label`
  font-size: 30px;
  font-weight: 600;
  color: ${(props) => props.theme.colors.default};
`;

const BodyContainer = styled.div`
  width: 84vw;
  padding: 1vh 8vw 1vh 8vw;
  background-color: ${(props) => props.theme.colors.container};
`;

const ItemContainer = styled.div`
  margin-top: 15px;
  border-radius: ${(props) => props.theme.borderRadius};
  border-left: 16px solid transparent;
  padding: 1.2vh 2vw 1.2vh 2vw;
  color: ${(props) => props.theme.colors.default};
  background-color: ${(props) => props.theme.colors.background};
`;

const SurveyDataContainer = styled(ItemContainer)`
  border-left: 16px solid ${(props) => props.theme.colors.primary};
`;

const TextInput = styled.input.attrs({ type: 'text', maxLength: 100 })`
  padding: 1.2vh 1.5vw 1.2vh 1.5vw;
  border: ${(props) => props.theme.border};
  border-radius: ${(props) => props.theme.borderRadius};
  font-weight: 900;
  color: ${(props) => props.theme.colors.default};
  background-color: ${(props) => props.theme.colors.container};
  cursor: text;
`;

const QuestionContainer = styled(ItemContainer)``;

const AnswerLable = styled.label`
  font-size: 13px;
  padding: 1.2vh 1.5vw 1.2vh 1.5vw;
  color: ${(props) => props.theme.colors.text};
  text-decoration: underline;
  text-decoration-style: dotted;
  text-decoration-color: currentColor;
  border: ${(props) => props.theme.border};
  border-radius: ${(props) => props.theme.borderRadius};
`;

const OptionContainer = styled.div``;

const OptionInput = styled(TextInput).attrs({ type: 'text' })`
  width: 30vw;
  font-size: 13px;
  margin-top: 3px;
`;

const DeleteOptionButton = styled.button`
  font-weight: 900;
  text-align: center;
  color: ${(props) => props.theme.colors.text};
  margin-left: 3px;
  padding: 10px;
  background-color: ${(props) => props.theme.colors.button};
  width: 35px;
  height: 35px;
  border-radius: 50%;
  border: none;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

const SubmitButton = styled.button.attrs({ type: 'submit' })`
  width: 15vw;
  border: none;
  padding: 2vh 2vw 2vh 2vw;
  margin-top: 30px;
  margin-bottom: 30px;
  margin-left: 69vw;
  border-radius: ${(props) => props.theme.borderRadius};
  font-size: 2vh;
  font-weight: 700;
  color: ${(props) => props.theme.colors.default};
  background-color: ${(props) => props.theme.colors.primary};
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.colors.prhover};
  }
`;

// TODO: Drag and drop questions order
export default function SurveyFormPage() {
  const [theme, toggleTheme] = useTheme();
  const questionRefs = useRef<HTMLDivElement[]>([]);
  const [recentCreate, setRecentCreate] = useState<number>();
  const [resultModalOpen, setResultModalOpen] = useState<boolean>(false);
  // const [questionList, setQuestionList] = useState<QuestionCreateRequest[]>([]);
  // const [requiredCertificationList, setRequiredCertificationList] = useState<CertificationType[]>([]);
  const [certificationIsChecked, setCertificationIsChecked] = useState<boolean>(false);
  const [surveyData, setSurveyData] = useState<SurveyCreateRequest>({
    title: '제목 없는 설문',
    description: '설문지 설명',
    startedDate: '2023-04-04T20:31',
    endedDate: '2023-04-04T20:31',
    certificationTypes: [],
    questions: [],
  });

  const scrollToRecentCreateQuestion = () => {
    if (typeof recentCreate !== 'undefined') {
      questionRefs.current[recentCreate].scrollIntoView({ block: 'center', inline: 'nearest', behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToRecentCreateQuestion();
  }, [recentCreate]);

  const handleSubmit = () => {
    // TODO: Check surveyData is valid
    // TODO: submit surveyData to server
    console.log(surveyData);
    // setResultModalOpen(true);
  };

  const addQuestionUnderId = (questionId: number) => {
    for (let i = questionId + 1; i < surveyData.questions.length; i += 1) {
      surveyData.questions[i] = { ...surveyData.questions[i], questionNo: i + 1 };
    }
    const newQuestions = [...surveyData.questions];
    const newQuestion: QuestionCreateRequest = {
      title: '설문 제목',
      description: '설문 설명',
      questionType: QuestionType.LONG_ANSWER,
      questionNo: questionId + 1,
      isRequired: true,
    };

    newQuestions.splice(questionId + 1, 0, newQuestion);
    setSurveyData({ ...surveyData, questions: newQuestions });
    setRecentCreate(questionId + 1);
  };

  const deleteQuestionAtId = (questionId: number) => {
    for (let i = questionId + 1; i < surveyData.questions.length; i += 1) {
      surveyData.questions[i] = { ...surveyData.questions[i], questionNo: i - 1 };
    }
    const newQuestions = [...surveyData.questions];
    newQuestions.splice(questionId, 1);
    setSurveyData({ ...surveyData, questions: newQuestions });
    setRecentCreate(newQuestions.length === 0 ? undefined : newQuestions.length - 1);
  };

  const addOptionAtBottom = (questionId: number) => {
    let newOptions = surveyData.questions[questionId].questionOptions;
    const newOption: QuestionOptionCreateRequest = {
      option: '객관식 문항',
      description: '',
    };

    if (newOptions) {
      newOptions = [...newOptions, newOption];
    } else {
      newOptions = [newOption];
    }

    const newQuestions = [...surveyData.questions];
    newQuestions[questionId] = { ...newQuestions[questionId], questionOptions: newOptions };
    setSurveyData({ ...surveyData, questions: newQuestions });
  };

  const deleteOptionAtId = (questionId: number, optionId: number) => {
    const newOptions = surveyData.questions[questionId].questionOptions;
    if (newOptions) {
      newOptions.splice(optionId, 1);
    }

    const newQuestions = [...surveyData.questions];
    newQuestions[questionId] = { ...newQuestions[questionId], questionOptions: newOptions };
    setSurveyData({ ...surveyData, questions: newQuestions });
  };

  const editRequiredCertificationList = (value: number, isChecked: boolean) => {
    if (typeof surveyData.certificationTypes !== 'undefined') {
      if (isChecked) {
        setSurveyData({ ...surveyData, certificationTypes: [...surveyData.certificationTypes, value] });
      } else {
        setSurveyData({
          ...surveyData,
          certificationTypes: surveyData.certificationTypes.filter((item) => item !== value),
        });
      }
    }
  };

  const handleChangeCheck = (event: React.ChangeEvent<HTMLInputElement>, value: number) => {
    setCertificationIsChecked(!certificationIsChecked);
    editRequiredCertificationList(value, event.target.checked);
  };

  // Update surveyData title | description | startedDate | endedDate
  const handleChangeSurveyData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (typeof surveyData !== 'undefined') {
      setSurveyData({
        ...surveyData,
        [name]: value,
      });
    }
  };

  // Update questionList[questionId] title | description
  const handleChangeQuestion = (event: React.ChangeEvent<HTMLInputElement>, questionId: number) => {
    const { name, value } = event.target;
    surveyData.questions[questionId] = { ...surveyData.questions[questionId], [name]: value };
    setSurveyData({ ...surveyData });
  };

  // Update questionList[questionId] type
  const handleChangeQuestionType = (event: React.ChangeEvent<HTMLSelectElement>, questionId: number) => {
    const { name, value } = event.target;
    surveyData.questions[questionId] = {
      ...surveyData.questions[questionId],
      [name]: +value,
      questionOptions: undefined,
    };
    setSurveyData({ ...surveyData });
  };

  // update questionList[questionId][optionId] option
  const handleChangeOption = (event: React.ChangeEvent<HTMLInputElement>, questionId: number, optionId: number) => {
    const { name, value } = event.target;
    const newOptions = surveyData.questions[questionId].questionOptions;
    if (newOptions) {
      newOptions[optionId] = { ...newOptions[optionId], [name]: value };
    }
    const newQuestions = [...surveyData.questions];
    newQuestions[questionId] = { ...newQuestions[questionId], questionOptions: newOptions };
    setSurveyData({ ...surveyData, questions: newQuestions });
  };

  const handleClickButton = (event: React.MouseEvent<HTMLButtonElement>, questionId: number, optionId?: number) => {
    const { name } = event.target as HTMLInputElement;
    if (name === 'addQuestion') addQuestionUnderId(questionId);
    else if (name === 'deleteQuestion') deleteQuestionAtId(questionId);
    else if (name === 'addOption') addOptionAtBottom(questionId);
    else if (typeof optionId !== 'undefined') deleteOptionAtId(questionId, optionId);
  };

  const makeSubjectiveAnswerForm = (questionId: number, selected: number) => {
    return (
      <QuestionContainer
        ref={(element) => {
          questionRefs.current[questionId] = element as HTMLDivElement;
        }}
        theme={theme}
        key={questionId}
      >
        {SubjectiveAnswerForm({
          surveyData,
          selected,
          questionId,
          handleChangeQuestion,
          handleChangeQuestionType,
          handleClickButton,
          theme,
        })}
      </QuestionContainer>
    );
  };

  const makeOptionsForm = (questionId: number) => {
    const tmpOptions = surveyData.questions[questionId].questionOptions;
    if (typeof tmpOptions !== 'undefined') {
      return NumberUtils.range(0, tmpOptions.length).map((index: number) => (
        <OptionContainer theme={theme} key={index}>
          <OptionInput
            theme={theme}
            onChange={(event) => handleChangeOption(event, questionId, index)}
            name="option"
            value={tmpOptions[index].option || ''}
          />
          <DeleteOptionButton
            theme={theme}
            name="deleteOption"
            onClick={(event) => handleClickButton(event, questionId, index)}
          >
            X
          </DeleteOptionButton>
        </OptionContainer>
      ));
    }
    return <AnswerLable theme={theme}>옵션을 추가해 주세요</AnswerLable>;
  };

  const makeChoiceForm = (questionId: number, selected: number) => {
    return (
      <QuestionContainer
        ref={(element) => {
          questionRefs.current[questionId] = element as HTMLDivElement;
        }}
        theme={theme}
        key={questionId}
      >
        {ChoiceAnswerForm({
          surveyData,
          selected,
          questionId,
          handleChangeQuestion,
          handleChangeQuestionType,
          handleClickButton,
          makeOptionsForm,
          theme,
        })}
      </QuestionContainer>
    );
  };

  const showQuestionForm = (questionType: number, questionId: number) => {
    if (questionType === QuestionType.LONG_ANSWER || questionType === QuestionType.SHORT_ANSWER) {
      return makeSubjectiveAnswerForm(questionId, questionType);
    }
    return makeChoiceForm(questionId, questionType);
  };

  return (
    <Container theme={theme}>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <HeadContainer theme={theme}>
        <Title theme={theme}>설문조사 작성</Title>
      </HeadContainer>

      <BodyContainer theme={theme}>
        <SurveyDataContainer theme={theme}>
          {SurveyDataForm({
            surveyData,
            handleChangeSurveyData,
            handleChangeCheck,
            handleClickButton,
            theme,
          })}
        </SurveyDataContainer>

        {surveyData.questions.map((question: QuestionCreateRequest) =>
          showQuestionForm(question.questionType, question.questionNo)
        )}

        <SubmitButton theme={theme} onClick={handleSubmit}>
          완료하기
        </SubmitButton>
      </BodyContainer>

      {resultModalOpen && <SurveyPageResultModal theme={theme} />}
    </Container>
  );
}
