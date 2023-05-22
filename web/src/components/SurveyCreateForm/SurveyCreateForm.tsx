import React, { useEffect, useRef, useState } from 'react';

import { useDispatch } from 'react-redux';
import styled, { DefaultTheme } from 'styled-components';

import axios from '../../api/axios';
import { requests } from '../../api/request';
import { QuestionCreateRequest, QuestionType } from '../../types/request/Question';
import { QuestionOptionCreateRequest } from '../../types/request/QuestionOption';
import { SurveyCreateRequest } from '../../types/request/Survey';
import { ValidationErrorMessage, InputCheckResult } from '../../types/userInputCheck';
import { responseErrorHandle } from '../../utils/responseErrorHandle';
import { scrollToRef, scrollToTop } from '../../utils/scroll';
import { validateSurveyData } from '../../utils/validate';
import RectangleButton from '../Button/RectangleButton';
import { SurveyPageResultModal, AlertModal, ConfirmModal } from '../Modal';
import QuestionForm from './QuestionForm';
import SurveyDataForm from './SurveyDataForm';

const Container = styled.div`
  width: 84vw;
  padding: 1vh 8vw 1vh 8vw;
  background-color: ${(props) => props.theme.colors.container};
`;

const ButtonContainer = styled.div`
  padding: 10px;
  display: flex;
  justify-content: flex-end;
`;

const ItemContainer = styled.div`
  margin-top: 15px;
  border-radius: ${(props) => props.theme.borderRadius};
  border-left: 16px solid ${(props) => props.theme.colors.primary};
  padding: 1.2vh 2vw 1.2vh 2vw;
  color: ${(props) => props.theme.colors.default};
  background-color: ${(props) => props.theme.colors.background};
`;

interface SurveyFormProps {
  theme: DefaultTheme;
}

export default function SurveyCreateForm({ theme }: SurveyFormProps) {
  const dispatch = useDispatch();
  const questionRefs = useRef<HTMLDivElement[]>([]);
  const [recentCreate, setRecentCreate] = useState<number>();
  const [certificationIsChecked, setCertificationIsChecked] = useState<boolean>(false);
  const [resultModalOpen, setResultModalOpen] = useState<boolean>(false);
  const [alertModalOpen, setAlertModalOpen] = useState<boolean>(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState<boolean>(false);
  const [warnText, setWarnText] = useState<string>('');
  const [surveyData, setSurveyData] = useState<SurveyCreateRequest>({
    title: '제목 없는 설문',
    description: '설문지 설명',
    startedDate: '',
    endedDate: '',
    certificationTypes: [],
    questions: [],
  });
  const [usedPoint, setUsedPoint] = useState<number>(0);
  const [numOfContext, setNumOfContext] = useState<number>(0);

  const handleSubmit = () => {
    axios
      .post(requests.createSurvey, surveyData)
      .then((response) => {
        setUsedPoint(response.data.rewardPoints * -2);
        setConfirmModalOpen(false);
        setResultModalOpen(true);
      })
      .catch((error) => {
        const errorMessages: string[] = responseErrorHandle(error, dispatch);
        setWarnText(errorMessages[0]);
        setAlertModalOpen(true);
        setConfirmModalOpen(false);
      });
  };

  useEffect(() => {
    if (typeof recentCreate !== 'undefined') {
      scrollToRef(questionRefs, recentCreate);
    }
  }, [recentCreate]);

  useEffect(() => {
    if (numOfContext >= 1000) {
      setWarnText(`질문 수와 옵션 수의 합이 1000개 이하여야 합니다. 현재 ${numOfContext}개`);
      setAlertModalOpen(true);
    }
  }, [numOfContext]);

  const setAlertNotificationStyle = (errorIndex: number) => {
    surveyData.questions.forEach((question: QuestionCreateRequest) => {
      const questionNumber = question.questionNo - 1;
      const borderStyle = questionNumber === errorIndex ? '15px solid #FF5733' : `15px solid ${theme.colors.primary}`;
      questionRefs.current[questionNumber].style.borderLeft = borderStyle;
    });
  };

  const validation = () => {
    const checkResult: InputCheckResult = validateSurveyData(surveyData);
    setAlertNotificationStyle(checkResult.index);

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
        setWarnText('설문조사 시작일은 현재시간 이후여야 합니다');
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
    setNumOfContext(numOfContext + 1);
  };

  const deleteQuestionAtId = (questionId: number) => {
    for (let i = questionId + 1; i < surveyData.questions.length; i += 1) {
      surveyData.questions[i] = { ...surveyData.questions[i], questionNo: surveyData.questions[i].questionNo - 1 };
    }
    const newQuestions = [...surveyData.questions];
    newQuestions.splice(questionId, 1);
    setSurveyData({ ...surveyData, questions: newQuestions });
    setRecentCreate(newQuestions.length === 0 ? undefined : newQuestions.length - 1);
    setNumOfContext(numOfContext - 1);
  };

  const addOptionAtBottom = (questionId: number) => {
    let newOptions = surveyData.questions[questionId].questionOptions;
    const newOption: QuestionOptionCreateRequest = {
      option: '객관식 문항',
      description: 'NULL',
    };

    newOptions = newOptions ? [...newOptions, newOption] : [newOption];

    const newQuestions = [...surveyData.questions];
    newQuestions[questionId] = { ...newQuestions[questionId], questionOptions: newOptions };
    setSurveyData({ ...surveyData, questions: newQuestions });
    setNumOfContext(numOfContext + 1);
  };

  const deleteOptionAtId = (questionId: number, optionId: number) => {
    const newOptions = surveyData.questions[questionId].questionOptions;
    if (newOptions) {
      newOptions.splice(optionId, 1);
    }

    const newQuestions = [...surveyData.questions];
    newQuestions[questionId] = { ...newQuestions[questionId], questionOptions: newOptions };
    setSurveyData({ ...surveyData, questions: newQuestions });
    setNumOfContext(numOfContext + 1);
  };

  const editRequiredCertificationList = (value: number, isChecked: boolean) => {
    if (typeof surveyData.certificationTypes !== 'undefined') {
      const newCertificationTypes = isChecked
        ? [...surveyData.certificationTypes, value]
        : surveyData.certificationTypes.filter((item) => item !== value);
      setSurveyData({ ...surveyData, certificationTypes: newCertificationTypes });
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

  // Update questions[questionId] title | description
  const handleChangeQuestion = (event: React.ChangeEvent<HTMLInputElement>, questionId: number) => {
    const { name, value } = event.target;
    surveyData.questions[questionId] = { ...surveyData.questions[questionId], [name]: value };
    setSurveyData({ ...surveyData });
  };

  // Update questions[questionId] type
  const handleChangeQuestionType = (event: React.ChangeEvent<HTMLSelectElement>, questionId: number) => {
    const { name, value } = event.target;
    surveyData.questions[questionId] = {
      ...surveyData.questions[questionId],
      [name]: +value,
      questionOptions: undefined,
    };
    setSurveyData({ ...surveyData });
  };

  // Update questions[questionId][optionId] option
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
    if (typeof questionId === 'undefined') return;

    if (name === 'addQuestion') addQuestionUnderId(questionId);
    else if (name === 'deleteQuestion') deleteQuestionAtId(questionId);
    else if (name === 'addOption') addOptionAtBottom(questionId);
    else if (typeof optionId !== 'undefined') deleteOptionAtId(questionId, optionId);
  };

  // Update questions[questionId] isRequired
  const handleToggleSwitch = (event: React.ChangeEvent<HTMLInputElement>, questionId: number) => {
    const { checked } = event.target;
    surveyData.questions[questionId] = {
      ...surveyData.questions[questionId],
      isRequired: checked,
    };
    setSurveyData({ ...surveyData });
  };

  return (
    <Container theme={theme}>
      <ItemContainer theme={theme}>
        <SurveyDataForm
          surveyData={surveyData}
          handleChangeSurveyData={handleChangeSurveyData}
          handleChangeCheck={handleChangeCheck}
          handleClickButton={handleClickButton}
          theme={theme}
        />
      </ItemContainer>

      {surveyData.questions.map((question: QuestionCreateRequest) => (
        <ItemContainer
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
            handleToggleSwitch={handleToggleSwitch}
            theme={theme}
          />
        </ItemContainer>
      ))}

      <ButtonContainer>
        <RectangleButton
          textColor="white"
          backgroundColor={theme.colors.primary}
          hoverColor={theme.colors.prhover}
          text="제출하기"
          theme={theme}
          handleClick={validation}
          width="30%"
          disabled={numOfContext >= 1000}
        />
      </ButtonContainer>

      {resultModalOpen && <SurveyPageResultModal point={usedPoint} theme={theme} />}

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
