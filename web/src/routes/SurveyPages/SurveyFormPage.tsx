import React, { useState, useEffect, useRef } from 'react';

import styled from 'styled-components';

import axios from '../../api/axios';
import requests from '../../api/request';
import Header from '../../components/Header';
import { SurveyPageResultModal, AlertModal, ConfirmModal } from '../../components/Modal';
import RectangleButton from '../../components/Styled/RectangleButton';
import QuestionForm from '../../components/SurveyForm/QuestionForm';
import SurveyDataForm from '../../components/SurveyForm/SurveyDataForm';
import { useTheme } from '../../hooks/useTheme';
import { QuestionCreateRequest, QuestionType } from '../../types/request/Question';
import { QuestionOptionCreateRequest } from '../../types/request/QuestionOption';
import { SurveyCreateRequest } from '../../types/request/Survey';
import { ValidationErrorMessage, InputCheckResult } from '../../types/userInputCheck';
import { scrollToRef, scrollToTop } from '../../utils/scroll';
import { validateSurveyData } from '../../utils/validate';

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

const ButtonContainer = styled.div`
  padding: 10px;
  display: flex;
  justify-content: flex-end;
`;

const Title = styled.span`
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
  border-left: 16px solid ${(props) => props.theme.colors.primary};
  padding: 1.2vh 2vw 1.2vh 2vw;
  color: ${(props) => props.theme.colors.default};
  background-color: ${(props) => props.theme.colors.background};
`;

const SurveyDataContainer = styled(ItemContainer)`
  border-left: 16px solid ${(props) => props.theme.colors.primary};
`;

const QuestionContainer = styled(ItemContainer)``;

// TODO: Drag and drop questions order
export default function SurveyFormPage() {
  const [theme, toggleTheme] = useTheme();
  const questionRefs = useRef<HTMLDivElement[]>([]);
  const [recentCreate, setRecentCreate] = useState<number>();
  const [resultModalOpen, setResultModalOpen] = useState<boolean>(false);
  const [alertModalOpen, setAlertModalOpen] = useState<boolean>(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState<boolean>(false);
  const [warnText, setWarnText] = useState('');
  const [certificationIsChecked, setCertificationIsChecked] = useState<boolean>(false);
  const [surveyData, setSurveyData] = useState<SurveyCreateRequest>({
    title: '제목 없는 설문',
    description: '설문지 설명',
    startedDate: '',
    endedDate: '',
    certificationTypes: [],
    questions: [],
  });

  const turnOnAlertNotification = (domIndex: number) => {
    questionRefs.current[domIndex].style.borderLeft = '15px solid #FF5733';
  };

  const turnOffAlertNotification = (domIndex: number) => {
    questionRefs.current[domIndex].style.borderLeft = `15px solid ${theme.colors.primary}`;
  };

  const setAlertNotification = (errorIndex: number) => {
    surveyData.questions.forEach((question: QuestionCreateRequest) => {
      if (question.questionNo - 1 === errorIndex) {
        turnOnAlertNotification(question.questionNo - 1);
      } else {
        turnOffAlertNotification(question.questionNo - 1);
      }
    });
  };

  useEffect(() => {
    if (typeof recentCreate !== 'undefined') {
      scrollToRef(questionRefs, recentCreate);
    }
  }, [recentCreate]);

  const handleSubmit = () => {
    // TODO: submit surveyData to server
    console.log(surveyData);
    axios
      .post(requests.createSurvey, surveyData)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    setConfirmModalOpen(false);
    setResultModalOpen(true);
  };

  const validation = () => {
    const checkResult: InputCheckResult = validateSurveyData(surveyData);
    setAlertNotification(checkResult.index);

    switch (checkResult.message) {
      case ValidationErrorMessage.NO_QUESTION:
        setWarnText('하나 이상의 질문을 추가해 주세요');
        setAlertModalOpen(true);
        break;
      case ValidationErrorMessage.NO_OPTION:
        scrollToRef(questionRefs, checkResult.index);
        setWarnText('객관식 문항을 추가해 주세요');
        setAlertModalOpen(true);
        break;
      case ValidationErrorMessage.EARLY_START:
        scrollToTop();
        setWarnText('설문조사 시작일을 확인해 주세요');
        setAlertModalOpen(true);
        break;
      case ValidationErrorMessage.EARLY_END:
        scrollToTop();
        setWarnText('설문조사 종료일이 시작일과 같거나 빠릅니다');
        setAlertModalOpen(true);
        break;
      case ValidationErrorMessage.EMPTY_INPUT:
        if (checkResult.index !== -1) {
          scrollToRef(questionRefs, checkResult.index);
        } else {
          scrollToTop();
        }
        setWarnText('모든 입력을 채워 주세요');
        setAlertModalOpen(true);
        break;
      default:
        setConfirmModalOpen(true);
    }
  };

  const addQuestionUnderId = (questionId: number) => {
    for (let i = questionId + 1; i < surveyData.questions.length; i += 1) {
      surveyData.questions[i] = { ...surveyData.questions[i], questionNo: surveyData.questions[i].questionNo + 1 };
    }
    const newQuestions = [...surveyData.questions];
    const newQuestion: QuestionCreateRequest = {
      title: '설문 제목',
      description: '설문 설명',
      questionType: QuestionType.LONG_ANSWER,
      questionNo: questionId + 2,
      isRequired: true,
    };

    newQuestions.splice(questionId + 1, 0, newQuestion);
    setSurveyData({ ...surveyData, questions: newQuestions });
    setRecentCreate(questionId + 1);
  };

  const deleteQuestionAtId = (questionId: number) => {
    for (let i = questionId + 1; i < surveyData.questions.length; i += 1) {
      surveyData.questions[i] = { ...surveyData.questions[i], questionNo: surveyData.questions[i].questionNo - 1 };
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
    const { id, value } = event.target;
    if (typeof surveyData !== 'undefined') {
      setSurveyData({
        ...surveyData,
        [id]: value,
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

  // Update questionList[questionId][optionId] option
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

  // Add and delete question and option
  const handleClickButton = (name: string, questionId?: number, optionId?: number) => {
    if (typeof questionId !== 'undefined') {
      if (name === 'addQuestion') addQuestionUnderId(questionId);
      else if (name === 'deleteQuestion') deleteQuestionAtId(questionId);
      else if (name === 'addOption') addOptionAtBottom(questionId);
      else if (typeof optionId !== 'undefined') deleteOptionAtId(questionId, optionId);
    }
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

        {surveyData.questions.map((question: QuestionCreateRequest) => (
          <QuestionContainer
            ref={(element) => {
              questionRefs.current[question.questionNo - 1] = element as HTMLDivElement;
            }}
            theme={theme}
            key={question.questionNo - 1}
          >
            <QuestionForm
              surveyData={surveyData}
              selected={question.questionType}
              questionId={question.questionNo - 1}
              handleChangeQuestion={handleChangeQuestion}
              handleChangeQuestionType={handleChangeQuestionType}
              handleClickButton={handleClickButton}
              handleChangeOption={handleChangeOption}
              theme={theme}
            />
          </QuestionContainer>
        ))}
        <ButtonContainer>
          <RectangleButton
            buttonBgColor={theme.colors.primary}
            buttonText="완료하기"
            theme={theme}
            handleClick={validation}
            buttonWidth="15vw"
          />
        </ButtonContainer>
      </BodyContainer>

      {resultModalOpen && <SurveyPageResultModal theme={theme} />}
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
          handleConfirmClick={() => handleSubmit()}
        />
      )}
    </Container>
  );
}
