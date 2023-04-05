import React, { useState, useEffect, useRef } from 'react';

import styled from 'styled-components';

// import axios from '../../api/axios';
// import requests from '../../api/request';
import Header from '../../components/Header';
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

const GuideLabel = styled.label`
  margin-left: 10px;
  margin-right: 10px;
  font-weight: 900;
  color: ${(props) => props.theme.colors.default};
`;

const TextInput = styled.input.attrs({ type: 'text' })`
  padding: 1.2vh 1.5vw 1.2vh 1.5vw;
  border: ${(props) => props.theme.border};
  border-radius: ${(props) => props.theme.borderRadius};
  font-weight: 900;
  color: ${(props) => props.theme.colors.default};
  background-color: ${(props) => props.theme.colors.container};
  cursor: text;
`;

const SurveyTitleInput = styled(TextInput)`
  width: 74vw;
  margin-top: 7px;
  margin-bottom: 10px;
  font-size: 23px;
`;

const SurveyDescriptionInput = styled(TextInput)`
  width: 74vw;
  margin-bottom: 25px;
  font-size: 18px;
`;

const SurveyDateContainer = styled.div``;

const SurveyDateInput = styled.input.attrs({ type: 'datetime-local' })`
  padding: 1.2vh 1.5vw 1.2vh 1.5vw;
  border: ${(props) => props.theme.border};
  border-radius: ${(props) => props.theme.borderRadius};
  font-weight: 900;
  color: ${(props) => props.theme.colors.default};
  background-color: ${(props) => props.theme.colors.container};
  width: 21vw;
  margin-left: 2vw;
  margin-right: 2vw;
  margin-bottom: 25px;
`;

const SurveyCertificationsContainer = styled.div`
  width: 76vw;
  padding-bottom: 15px;
`;

const SelectedCertificationsContainer = styled.div`
  width: 76vw;
  height: 45px;
`;

const SelectedCertification = styled.label`
  margin: 5px;
  border-radius: ${(props) => props.theme.borderRadius};
  padding: 1.2vh 1.5vw 1.2vh 1.5vw;
  background-color: red;
`;

const CertificationPicker = styled.label`
  display: flex;
  align-items: center;
`;

const CheckBox = styled.input.attrs({ type: 'checkbox' })`
  appearance: none;
  width: 20px;
  height: 20px;
  border: ${(props) => props.theme.border};
  border-radius: 0.35rem;

  &:checked {
    border-color: transparent;
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
    background-size: 100% 100%;
    background-position: 50%;
    background-repeat: no-repeat;
    background-color: limegreen;
  }
`;

const CertificationLabel = styled.span``;

const QuestionContainer = styled(ItemContainer)``;

const QuestionTypeSelector = styled.select`
  padding: 1.2vh 1.5vw 1.2vh 1.5vw;
  border: ${(props) => props.theme.border};
  border-radius: ${(props) => props.theme.borderRadius};
  font-size: 14px;
  font-weight: 900;
  color: ${(props) => props.theme.colors.default};
  background-color: ${(props) => props.theme.colors.container};
  width: 10vw;
  margin-left: 2vw;
  cursor: pointer;
`;

const QuestionTypeOption = styled.option``;

const QuestionTitleInput = styled(TextInput).attrs({ type: 'text' })`
  font-size: 18px;
  width: 57vw;
  margin-top: 7px;
`;

const QuestionDescriptionInput = styled(TextInput).attrs({ type: 'text' })`
  font-size: 15px;
  width: 57vw;
  margin-top: 7px;
  margin-bottom: 23px;
  margin-right: 18vw;
`;

const AnswerLable = styled.label`
  padding: 1.2vh 1.5vw 1.2vh 1.5vw;
  font-size: 15px;
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
  margin: 5px;
`;

const Button = styled.button`
  font-weight: 900;
  text-align: center;
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

const AddQuestionButton = styled(Button)`
  color: ${(props) => props.theme.colors.text};
  margin-left: 37vw;
`;

const DeleteQuestionButton = styled(Button)`
  color: #cd5c5c;
  margin-left: 2vw;
`;

const AddOptionButton = styled.button`
  font-weight: 900;
  text-align: center;
  padding: 10px;
  color: ${(props) => props.theme.colors.text};
  background-color: ${(props) => props.theme.colors.button};
  border: ${(props) => props.theme.border};
  border-radius: ${(props) => props.theme.borderRadius};
  margin: 5px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.colors.btnhover};
  }
`;

const DeleteOptionButton = styled(Button)`
  color: ${(props) => props.theme.colors.text};
  margin-left: 3px;
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
  const [questionList, setQuestionList] = useState<QuestionCreateRequest[]>([]);
  const [requiredCertificationList, setRequiredCertificationList] = useState<CertificationType[]>([]);
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
    console.log(recentCreate);
    scrollToRecentCreateQuestion();
  }, [recentCreate]);

  useEffect(() => {
    if (typeof surveyData !== 'undefined') {
      setSurveyData({
        ...surveyData,
        questions: questionList,
      });
    }
  }, [questionList]);

  useEffect(() => {
    if (typeof surveyData !== 'undefined') {
      setSurveyData({
        ...surveyData,
        certificationTypes: requiredCertificationList,
      });
    }
  }, [requiredCertificationList]);

  const handleSubmit = () => {
    // TODO: Check surveyData is valid
    // TODO: submit surveyData to server
    console.log(surveyData);
  };

  const addQuestionUnderId = (questionId: number) => {
    for (let i = questionId + 1; i < questionList.length; i += 1) {
      questionList[i] = { ...questionList[i], questionNo: i + 1 };
    }
    const newQuestionList = [...questionList];
    const newQuestion: QuestionCreateRequest = {
      title: '설문 제목',
      description: '설문 설명',
      questionType: QuestionType.LONG_ANSWER,
      questionNo: questionId + 1,
      isRequired: true,
    };

    newQuestionList.splice(questionId + 1, 0, newQuestion);
    setQuestionList(newQuestionList);
    setRecentCreate(questionId + 1);
  };

  const deleteQuestionAtId = (questionId: number) => {
    for (let i = questionId + 1; i < questionList.length; i += 1) {
      questionList[i] = { ...questionList[i], questionNo: i - 1 };
    }
    const newQuestionList = [...questionList];
    newQuestionList.splice(questionId, 1);
    setQuestionList(newQuestionList);
    setRecentCreate(newQuestionList.length === 0 ? undefined : newQuestionList.length - 1);
  };

  const addOptionAtBottom = (questionId: number) => {
    let newOptions = questionList[questionId].questionOptions;
    const newOption: QuestionOptionCreateRequest = {
      option: '객관식 문항',
      description: '',
    };

    if (newOptions) {
      newOptions = [...newOptions, newOption];
    } else {
      newOptions = [newOption];
    }

    const newQuestionList = [...questionList];
    newQuestionList[questionId] = { ...newQuestionList[questionId], questionOptions: newOptions };
    setQuestionList(newQuestionList);
  };

  const deleteOptionAtId = (questionId: number, optionId: number) => {
    const newOptions = questionList[questionId].questionOptions;
    if (newOptions) {
      newOptions.splice(optionId, 1);
    }

    const newQuestionList = [...questionList];
    newQuestionList[questionId] = { ...newQuestionList[questionId], questionOptions: newOptions };
    setQuestionList(newQuestionList);
  };

  const editRequiredCertificationList = (value: number, isChecked: boolean) => {
    if (isChecked) {
      setRequiredCertificationList((prev) => [...prev, value]);
    } else {
      setRequiredCertificationList(requiredCertificationList.filter((item) => item !== value));
    }
  };

  const handleChangeCheck = (event: React.ChangeEvent<HTMLInputElement>, value: number) => {
    setCertificationIsChecked(!certificationIsChecked);
    editRequiredCertificationList(value, event.target.checked);
  };

  // update surveyData title, description, startedDate, endedDate
  const handleChangeSurveyData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (typeof surveyData !== 'undefined') {
      setSurveyData({
        ...surveyData,
        [name]: value,
      });
    }
  };

  // update questionList[questionId] title, description
  const handleChangeQuestion = (
    event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>,
    questionId: number
  ) => {
    const { name, value } = event.target;
    questionList[questionId] = { ...questionList[questionId], [name]: value };
    setQuestionList([...questionList]);
  };

  // update questionList[questionId] type
  const handleChangeQuestionType = (
    event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>,
    questionId: number
  ) => {
    const { name, value } = event.target;
    questionList[questionId] = { ...questionList[questionId], [name]: +value };
    setQuestionList([...questionList]);
  };

  // update questionList[questionId][optionId] option
  const handleChangeOption = (event: React.ChangeEvent<HTMLInputElement>, questionId: number, optionId: number) => {
    const { name, value } = event.target;
    const newOptions = questionList[questionId].questionOptions;
    if (newOptions) {
      newOptions[optionId] = { ...newOptions[optionId], [name]: value };
    }
    const newQuestionList = [...questionList];
    newQuestionList[questionId] = { ...newQuestionList[questionId], questionOptions: newOptions };
    setQuestionList(newQuestionList);
  };

  const handleClickButton = (event: React.MouseEvent<HTMLButtonElement>, questionId: number, optionId?: number) => {
    const { name } = event.target as HTMLInputElement;
    if (name === 'addQuestion') addQuestionUnderId(questionId);
    else if (name === 'deleteQuestion') deleteQuestionAtId(questionId);
    else if (name === 'addOption') addOptionAtBottom(questionId);
    else if (typeof optionId !== 'undefined') deleteOptionAtId(questionId, optionId);
  };

  const questionTypeSelector = (selected: number, questionId: number) => {
    return (
      <QuestionTypeSelector
        theme={theme}
        name="questionType"
        onChange={(event) => handleChangeQuestionType(event, questionId)}
        value={selected}
      >
        <QuestionTypeOption theme={theme} value={QuestionType.LONG_ANSWER}>
          장문형
        </QuestionTypeOption>
        <QuestionTypeOption theme={theme} value={QuestionType.SHORT_ANSWER}>
          단답형
        </QuestionTypeOption>
        <QuestionTypeOption theme={theme} value={QuestionType.SINGLE_CHOICE}>
          객관식
        </QuestionTypeOption>
      </QuestionTypeSelector>
    );
  };

  const longAnswerForm = (questionId: number) => {
    return (
      <QuestionContainer
        ref={(element) => {
          questionRefs.current[questionId] = element as HTMLDivElement;
        }}
        theme={theme}
        key={questionId}
      >
        <QuestionTitleInput
          theme={theme}
          onChange={(event) => handleChangeQuestion(event, questionId)}
          name="title"
          value={questionList[questionId].title || ''}
        />
        {questionTypeSelector(QuestionType.LONG_ANSWER, questionId)}
        <DeleteQuestionButton
          theme={theme}
          name="deleteQuestion"
          onClick={(event) => handleClickButton(event, questionId)}
        >
          X
        </DeleteQuestionButton>
        <QuestionDescriptionInput
          theme={theme}
          onChange={(event) => handleChangeQuestion(event, questionId)}
          name="description"
          value={questionList[questionId].description || ''}
        />

        <AnswerLable theme={theme}>장문형 답변이 입력됩니다</AnswerLable>
        <br />

        <AddQuestionButton theme={theme} name="addQuestion" onClick={(event) => handleClickButton(event, questionId)}>
          +
        </AddQuestionButton>
      </QuestionContainer>
    );
  };

  const shortAnswerForm = (questionId: number) => {
    return (
      <QuestionContainer
        ref={(element) => {
          questionRefs.current[questionId] = element as HTMLDivElement;
        }}
        theme={theme}
        key={questionId}
      >
        <QuestionTitleInput
          theme={theme}
          onChange={(event) => handleChangeQuestion(event, questionId)}
          name="title"
          value={questionList[questionId].title || ''}
        />
        {questionTypeSelector(QuestionType.SHORT_ANSWER, questionId)}
        <DeleteQuestionButton
          theme={theme}
          name="deleteQuestion"
          onClick={(event) => handleClickButton(event, questionId)}
        >
          X
        </DeleteQuestionButton>
        <QuestionDescriptionInput
          theme={theme}
          onChange={(event) => handleChangeQuestion(event, questionId)}
          name="description"
          value={questionList[questionId].description || ''}
        />

        <AnswerLable theme={theme}>단답형 답변이 입력됩니다</AnswerLable>
        <br />

        <AddQuestionButton theme={theme} name="addQuestion" onClick={(event) => handleClickButton(event, questionId)}>
          +
        </AddQuestionButton>
      </QuestionContainer>
    );
  };

  const optionsForm = (questionId: number) => {
    const tmpOptions = questionList[questionId].questionOptions;
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

  const choiceForm = (questionId: number) => {
    return (
      <QuestionContainer
        ref={(element) => {
          questionRefs.current[questionId] = element as HTMLDivElement;
        }}
        theme={theme}
        key={questionId}
      >
        <QuestionTitleInput
          theme={theme}
          onChange={(event) => handleChangeQuestion(event, questionId)}
          name="title"
          value={questionList[questionId].title || ''}
        />
        {questionTypeSelector(QuestionType.SINGLE_CHOICE, questionId)}
        <DeleteQuestionButton
          theme={theme}
          name="deleteQuestion"
          onClick={(event) => handleClickButton(event, questionId)}
        >
          X
        </DeleteQuestionButton>

        <QuestionDescriptionInput
          theme={theme}
          onChange={(event) => handleChangeQuestion(event, questionId)}
          name="description"
          value={questionList[questionId].description || ''}
        />

        {optionsForm(questionId)}
        <AddOptionButton theme={theme} name="addOption" onClick={(event) => handleClickButton(event, questionId)}>
          문항 추가하기
        </AddOptionButton>
        <br />

        <AddQuestionButton theme={theme} name="addQuestion" onClick={(event) => handleClickButton(event, questionId)}>
          +
        </AddQuestionButton>
      </QuestionContainer>
    );
  };

  const showQuestionForm = (questionType: number, questionId: number) => {
    switch (questionType) {
      case QuestionType.LONG_ANSWER:
        return longAnswerForm(questionId);
      case QuestionType.SHORT_ANSWER:
        return shortAnswerForm(questionId);
      default:
        return choiceForm(questionId);
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
          <SurveyTitleInput
            theme={theme}
            onChange={handleChangeSurveyData}
            name="title"
            value={surveyData?.title || ''}
          />
          <SurveyDescriptionInput
            theme={theme}
            onChange={handleChangeSurveyData}
            name="description"
            value={surveyData?.description || ''}
          />
          <SurveyCertificationsContainer theme={theme}>
            <SelectedCertificationsContainer theme={theme}>
              <GuideLabel>필수 인증 목록 : </GuideLabel>
              {requiredCertificationList.map((auth: number) => (
                <SelectedCertification theme={theme} key={auth}>
                  {CertificationType[auth]}
                </SelectedCertification>
              ))}
            </SelectedCertificationsContainer>
            {NumberUtils.range(0, 6).map((index: number) => (
              <CertificationPicker theme={theme} key={index} htmlFor={`${index}`}>
                <CheckBox
                  id={`${index}`}
                  checked={requiredCertificationList.includes(index)}
                  onChange={(e) => handleChangeCheck(e, index)}
                />
                <CertificationLabel theme={theme}>{CertificationType[index]}</CertificationLabel>
              </CertificationPicker>
            ))}
          </SurveyCertificationsContainer>
          <SurveyDateContainer>
            <GuideLabel>설문조사 기간 : </GuideLabel>
            <SurveyDateInput
              theme={theme}
              onChange={handleChangeSurveyData}
              name="startedDate"
              value={`${surveyData?.startedDate}` || ''}
            />
            <GuideLabel> ~ </GuideLabel>
            <SurveyDateInput
              theme={theme}
              onChange={handleChangeSurveyData}
              name="endedDate"
              value={`${surveyData?.endedDate}` || ''}
            />
          </SurveyDateContainer>

          <AddQuestionButton theme={theme} name="addQuestion" onClick={(event) => handleClickButton(event, -1)}>
            +
          </AddQuestionButton>
        </SurveyDataContainer>
        {questionList.map((question: QuestionCreateRequest) =>
          showQuestionForm(question.questionType, question.questionNo)
        )}
        <SubmitButton theme={theme} onClick={handleSubmit}>
          완료하기
        </SubmitButton>
      </BodyContainer>
    </Container>
  );
}
