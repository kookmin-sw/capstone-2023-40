import React, { useState, useEffect } from 'react';

import styled from 'styled-components';

// import axios from '../../api/axios';
// import requests from '../../api/request';
import Header from '../../components/Header';
import { useTheme } from '../../hooks/useTheme';
import { QuestionCreateRequest, QuestionType } from '../../types/request/Question';
import { QuestionOptionCreateRequest } from '../../types/request/QuestionOption';
import { SurveyCreateRequest, CertificationType } from '../../types/request/Survey';
import { NumberUtils } from '../../utils/NumberUtils';

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
  border-left: 16px solid ${(props) => props.theme.colors.primary};
  padding: 1.2vh 2vw 1.2vh 2vw;
  color: ${(props) => props.theme.colors.default};
  background-color: ${(props) => props.theme.colors.background};
`;

const SurveyDataContainer = styled(ItemContainer)``;

const TextInput = styled.input.attrs({ type: 'text' })`
  padding: 1.2vh 1.5vw 1.2vh 1.5vw;
  border: ${(props) => props.theme.border};
  border-radius: ${(props) => props.theme.borderRadius};

  font-weight: 900;
  color: ${(props) => props.theme.colors.default};
  background-color: ${(props) => props.theme.colors.container};
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

const SurveyDateInput = styled.input.attrs({ type: 'datetime-local' })`
  width: 32vw;
  margin-bottom: 25px;
  margin-left: 10vw;
`;

const SurveyCertificationsContainer = styled.div`
  width: 76vw;
  padding: 1.2vh 1.5vw 1.2vh 1.5vw;
  margin-bottom: 25px;
  font-size: 18px;
  font-weight: 900;
`;

const SelectedCertificationsContainer = styled.span``;

const SelectedCertification = styled.label`
  margin: 5px;
  border-radius: ${(props) => props.theme.borderRadius};
  padding: 1.2vh 1.5vw 1.2vh 1.5vw;
  background-color: red;
`;

const CertificationPicker = styled.div``;

const CheckBox = styled.input.attrs({ type: 'checkbox' })``;

const CertificationLabel = styled.label``;

const QuestionContainer = styled(ItemContainer)``;

const QuestionTypeSelector = styled.select`
  padding: 1.2vh 1.5vw 1.2vh 1.5vw;
  border: ${(props) => props.theme.border};
  border-radius: ${(props) => props.theme.borderRadius};
  font-size: 18px;
  font-weight: 900;
  color: ${(props) => props.theme.colors.default};
  background-color: ${(props) => props.theme.colors.container};
  width: 15vw;
  margin-left: 3vw;
`;

const QuestionTypeOption = styled.option``;

const QuestionTitleInput = styled(TextInput).attrs({ type: 'text' })`
  width: 57vw;
  margin-top: 7px;
  margin-bottom: 25px;
`;

const QuestionDescriptionInput = styled(TextInput).attrs({ type: 'text' })`
  width: 57vw;
  margin-top: 7px;
  margin-bottom: 25px;
`;

const AnswerLable = styled.label``;

const OptionContainer = styled.div``;

const OptionInput = styled.input.attrs({ type: 'text' })``;

const Button = styled.button``;

const AddQuestionButton = styled(Button)``;

const AddOptionButton = styled(Button)``;

const DeleteQuestionButton = styled(Button)``;

const DeleteOptionButton = styled(Button)``;

const SubmitButton = styled(Button).attrs({ type: 'submit' })``;

// TODO: Drag and drop questions order
export default function SurveyFormPage() {
  const [theme, toggleTheme] = useTheme();
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
      title: '',
      description: '',
      questionType: QuestionType.LONG_ANSWER,
      questionNo: questionId + 1,
      isRequired: true,
    };

    newQuestionList.splice(questionId + 1, 0, newQuestion);
    setQuestionList(newQuestionList);
  };

  const deleteQuestionAtId = (questionId: number) => {
    for (let i = questionId + 1; i < questionList.length; i += 1) {
      questionList[i] = { ...questionList[i], questionNo: i - 1 };
    }
    const newQuestionList = [...questionList];
    newQuestionList.splice(questionId, 1);
    setQuestionList(newQuestionList);
  };

  const addOptionAtBottom = (questionId: number) => {
    let newOptions = questionList[questionId].questionOptions;
    const newOption: QuestionOptionCreateRequest = {
      option: '',
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
          장문형 질문
        </QuestionTypeOption>
        <QuestionTypeOption theme={theme} value={QuestionType.SHORT_ANSWER}>
          단답형 질문
        </QuestionTypeOption>
        <QuestionTypeOption theme={theme} value={QuestionType.SINGLE_CHOICE}>
          객관식 질문
        </QuestionTypeOption>
      </QuestionTypeSelector>
    );
  };

  const longAnswerForm = (questionId: number) => {
    return (
      <QuestionContainer theme={theme} key={questionId}>
        <QuestionTitleInput
          theme={theme}
          onChange={(event) => handleChangeQuestion(event, questionId)}
          name="title"
          value={questionList[questionId].title || ''}
        />
        <QuestionDescriptionInput
          theme={theme}
          onChange={(event) => handleChangeQuestion(event, questionId)}
          name="description"
          value={questionList[questionId].description || ''}
        />
        {questionTypeSelector(QuestionType.LONG_ANSWER, questionId)}
        <AnswerLable theme={theme}>장문형 텍스트</AnswerLable>
        <AddQuestionButton theme={theme} name="addQuestion" onClick={(event) => handleClickButton(event, questionId)}>
          ➕
        </AddQuestionButton>
        <DeleteQuestionButton
          theme={theme}
          name="deleteQuestion"
          onClick={(event) => handleClickButton(event, questionId)}
        >
          🗑️
        </DeleteQuestionButton>
      </QuestionContainer>
    );
  };

  const shortAnswerForm = (questionId: number) => {
    return (
      <QuestionContainer theme={theme} key={questionId}>
        <QuestionTitleInput
          theme={theme}
          onChange={(event) => handleChangeQuestion(event, questionId)}
          name="title"
          value={questionList[questionId].title || ''}
        />
        <QuestionDescriptionInput
          theme={theme}
          onChange={(event) => handleChangeQuestion(event, questionId)}
          name="description"
          value={questionList[questionId].description || ''}
        />
        {questionTypeSelector(QuestionType.SHORT_ANSWER, questionId)}
        <AnswerLable theme={theme}>단답형 텍스트</AnswerLable>
        <AddQuestionButton theme={theme} name="addQuestion" onClick={(event) => handleClickButton(event, questionId)}>
          ➕
        </AddQuestionButton>
        <DeleteQuestionButton
          theme={theme}
          name="deleteQuestion"
          onClick={(event) => handleClickButton(event, questionId)}
        >
          🗑️
        </DeleteQuestionButton>
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
            🗑️
          </DeleteOptionButton>
        </OptionContainer>
      ));
    }
    return <AnswerLable theme={theme}>옵션을 추가해 주세요</AnswerLable>;
  };

  const choiceForm = (questionId: number) => {
    return (
      <QuestionContainer theme={theme} key={questionId}>
        <QuestionTitleInput
          theme={theme}
          onChange={(event) => handleChangeQuestion(event, questionId)}
          name="title"
          value={questionList[questionId].title || ''}
        />
        <QuestionDescriptionInput
          theme={theme}
          onChange={(event) => handleChangeQuestion(event, questionId)}
          name="description"
          value={questionList[questionId].description || ''}
        />
        {questionTypeSelector(QuestionType.SINGLE_CHOICE, questionId)}

        {optionsForm(questionId)}
        <AddOptionButton name="addOption" onClick={(event) => handleClickButton(event, questionId)}>
          ➕
        </AddOptionButton>
        <br />
        <AddQuestionButton name="addQuestion" onClick={(event) => handleClickButton(event, questionId)}>
          ➕
        </AddQuestionButton>
        <DeleteQuestionButton name="deleteQuestion" onClick={(event) => handleClickButton(event, questionId)}>
          🗑️
        </DeleteQuestionButton>
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
              {requiredCertificationList.map((auth: number) => (
                <SelectedCertification theme={theme} key={auth}>
                  {CertificationType[auth]}
                </SelectedCertification>
              ))}
            </SelectedCertificationsContainer>
            {NumberUtils.range(0, 6).map((index: number) => (
              <CertificationPicker theme={theme} key={index}>
                <CheckBox
                  checked={requiredCertificationList.includes(index)}
                  onChange={(e) => handleChangeCheck(e, index)}
                />
                <CertificationLabel theme={theme}>{CertificationType[index]}</CertificationLabel>
              </CertificationPicker>
            ))}
          </SurveyCertificationsContainer>
          <SurveyDateInput
            theme={theme}
            onChange={handleChangeSurveyData}
            name="startedDate"
            value={`${surveyData?.startedDate}` || ''}
          />
          <SurveyDateInput
            theme={theme}
            onChange={handleChangeSurveyData}
            name="endedDate"
            value={`${surveyData?.endedDate}` || ''}
          />
          <AddQuestionButton theme={theme} name="addQuestion" onClick={(event) => handleClickButton(event, -1)}>
            ➕
          </AddQuestionButton>
        </SurveyDataContainer>
        {questionList.map((question: QuestionCreateRequest) =>
          showQuestionForm(question.questionType, question.questionNo)
        )}
      </BodyContainer>
      <SubmitButton theme={theme} onClick={handleSubmit}>
        완료하기
      </SubmitButton>
    </Container>
  );
}
