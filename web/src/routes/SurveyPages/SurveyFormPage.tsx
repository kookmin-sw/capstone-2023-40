import React, { useState, useEffect } from 'react';

import styled from 'styled-components';

import axios from '../../api/axios';
import requests from '../../api/request';
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
  width: 32vw;
  margin-bottom: 25px;
  margin-left: 10vw;
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

const QuestionTyp = styled.option``;

const TitleInput = styled(Input)`
  width: 57vw;
  margin-top: 7px;
  margin-bottom: 25px;
`;

const Answer = styled.label``;

const MultipleChoiceContainer = styled.div``;

const MultipleChoiceInput = styled.input``;

const Button = styled.button``;

const AddButton = styled(Button)``;

const DeleteButton = styled(Button)``;

export default function SurveyFormPage() {
  const [theme, toggleTheme] = useTheme();
  const [questionList, setQuestionList] = useState<QuestionCreateRequest[]>([]);
  const [requiredAuthentications, setRequiredAuthentications] = useState<CertificationType[]>([]);
  const [authIsChecked, setAuthIsChecked] = useState<boolean>(false);
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
        certificationTypes: requiredAuthentications,
        questions: questionList,
      });
    }
  }, [questionList]);

  useEffect(() => {
    if (typeof surveyData !== 'undefined') {
      setSurveyData({
        ...surveyData,
        certificationTypes: requiredAuthentications,
        questions: questionList,
      });
    }
  }, [requiredAuthentications]);

  useEffect(() => {
    console.log(surveyData);
  }, [surveyData]);

  const handleStringInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (typeof surveyData !== 'undefined') {
      setSurveyData({
        ...surveyData,
        [name]: value,
      });
    }
  };

  const handleQuestionChange = (
    event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>,
    questionId: number
  ) => {
    const { name, value } = event.target;
    questionList[questionId] = { ...questionList[questionId], [name]: value };
    setQuestionList([...questionList]);
  };

  const handleQuestionTypeChange = (
    event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>,
    questionId: number
  ) => {
    const { name, value } = event.target;
    questionList[questionId] = { ...questionList[questionId], [name]: +value };
    setQuestionList([...questionList]);
  };

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>, questionId: number, optionId: number) => {
    const { name, value } = event.target;
    const newOptions = questionList[questionId].questionOptions;
    if (newOptions) {
      newOptions[optionId] = { ...newOptions[optionId], [name]: value };
    }
    const newQuestionList = [...questionList];
    newQuestionList[questionId] = { ...newQuestionList[questionId], questionOptions: newOptions };
    setQuestionList(newQuestionList);
  };

  const handleRequiredAuthentications = (value: number, isChecked: boolean) => {
    if (isChecked) {
      setRequiredAuthentications((prev) => [...prev, value]);
    } else {
      setRequiredAuthentications(requiredAuthentications.filter((item) => item !== value));
    }
  };

  const handleCheckInputChange = (event: React.ChangeEvent<HTMLInputElement>, value: number) => {
    setAuthIsChecked(!authIsChecked);
    handleRequiredAuthentications(value, event.target.checked);
  };

  const handleSubmit = () => {
    // TODO: put questionList and requiredAuth to SurveyData

    console.log(surveyData);
  };

  const makeQuestionUnderIndex = (index: number) => {
    for (let i = index + 1; i < questionList.length; i += 1) {
      questionList[i] = { ...questionList[i], questionNo: i + 1 };
    }
    const newQuestionList = [...questionList];
    const newQuestion: QuestionCreateRequest = {
      title: '',
      description: '',
      questionType: QuestionType.LONG_ANSWER,
      questionNo: index + 1,
      isRequired: true,
    };

    newQuestionList.splice(index + 1, 0, newQuestion);
    setQuestionList(newQuestionList);
  };

  const deleteQuestionInIndex = (index: number) => {
    for (let i = index + 1; i < questionList.length; i += 1) {
      questionList[i] = { ...questionList[i], questionNo: i - 1 };
    }
    const newQuestionList = [...questionList];
    newQuestionList.splice(index, 1);
    setQuestionList(newQuestionList);
  };

  const addOptionBottom = (questionId: number) => {
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

  const deleteOptionInIndex = (questionId: number, optionId: number) => {
    const newOptions = questionList[questionId].questionOptions;
    if (newOptions) {
      newOptions.splice(optionId, 1);
    }

    const newQuestionList = [...questionList];
    newQuestionList[questionId] = { ...newQuestionList[questionId], questionOptions: newOptions };
    setQuestionList(newQuestionList);
  };

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>, questionId: number, optionId?: number) => {
    const { name } = event.target as HTMLInputElement;
    if (name === 'addQuestion') makeQuestionUnderIndex(questionId);
    else if (name === 'deleteQuestion') deleteQuestionInIndex(questionId);
    else if (name === 'addOption') addOptionBottom(questionId);
    else if (typeof optionId !== 'undefined') deleteOptionInIndex(questionId, optionId);
  };

  const questionTypeSelector = (selected: number, questionId: number) => {
    return (
      <QuestionTypeSelector
        name="questionType"
        onChange={(event) => handleQuestionTypeChange(event, questionId)}
        value={selected}
      >
        <QuestionTyp value={QuestionType.LONG_ANSWER}>장문형 질문</QuestionTyp>
        <QuestionTyp value={QuestionType.SHORT_ANSWER}>단답형 질문</QuestionTyp>
        <QuestionTyp value={QuestionType.SINGLE_CHOICE}>객관식 질문</QuestionTyp>
      </QuestionTypeSelector>
    );
  };

  const longAnswerForm = (questionId: number) => {
    return (
      <QuestionContainer key={questionId}>
        <TitleInput
          onChange={(event) => handleQuestionChange(event, questionId)}
          name="title"
          type="text"
          value={questionList[questionId].title || ''}
        />
        {questionTypeSelector(QuestionType.LONG_ANSWER, questionId)}
        <Answer>장문형 텍스트</Answer>
        <AddButton name="addQuestion" onClick={(event) => handleButtonClick(event, questionId)}>
          +
        </AddButton>
        <DeleteButton name="deleteQuestion" onClick={(event) => handleButtonClick(event, questionId)}>
          -
        </DeleteButton>
      </QuestionContainer>
    );
  };

  const shortAnswerForm = (questionId: number) => {
    return (
      <QuestionContainer key={questionId}>
        <TitleInput
          onChange={(event) => handleQuestionChange(event, questionId)}
          name="title"
          type="text"
          value={questionList[questionId].title || ''}
        />
        {questionTypeSelector(QuestionType.SHORT_ANSWER, questionId)}
        <Answer>단답형 텍스트</Answer>
        <AddButton name="addQuestion" onClick={(event) => handleButtonClick(event, questionId)}>
          +
        </AddButton>
        <DeleteButton name="deleteQuestion" onClick={(event) => handleButtonClick(event, questionId)}>
          -
        </DeleteButton>
      </QuestionContainer>
    );
  };

  const showOptions = (questionId: number) => {
    const tmpOptions = questionList[questionId].questionOptions;
    if (typeof tmpOptions !== 'undefined') {
      return NumberUtils.range(0, tmpOptions.length).map((index: number) => (
        <MultipleChoiceContainer key={index}>
          <MultipleChoiceInput
            onChange={(event) => handleOptionChange(event, questionId, index)}
            name="option"
            type="text"
            value={tmpOptions[index].option || ''}
          />
          <DeleteButton name="deleteOption" onClick={(event) => handleButtonClick(event, questionId, index)}>
            -
          </DeleteButton>
        </MultipleChoiceContainer>
      ));
    }
    return <div>옵션을 추가해 주세요</div>;
  };

  const multipleChoiceForm = (questionId: number) => {
    return (
      <QuestionContainer key={questionId}>
        <TitleInput
          onChange={(event) => handleQuestionChange(event, questionId)}
          name="title"
          type="text"
          value={questionList[questionId].title || ''}
        />
        {questionTypeSelector(QuestionType.SINGLE_CHOICE, questionId)}

        {showOptions(questionId)}
        <AddButton name="addOption" onClick={(event) => handleButtonClick(event, questionId)}>
          +
        </AddButton>
        <br />
        <AddButton name="addQuestion" onClick={(event) => handleButtonClick(event, questionId)}>
          +
        </AddButton>
        <DeleteButton name="deleteQuestion" onClick={(event) => handleButtonClick(event, questionId)}>
          -
        </DeleteButton>
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
        return multipleChoiceForm(questionId);
    }
  };

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
              {requiredAuthentications.map((auth: number) => (
                <SelectedAuth key={auth}>{CertificationType[auth]}</SelectedAuth>
              ))}
            </SelectedAuthList>
            {NumberUtils.range(0, 6).map((index: number) => (
              <AuthList key={index}>
                <AuthCheckBox
                  type="checkbox"
                  checked={requiredAuthentications.includes(index)}
                  onChange={(e) => handleCheckInputChange(e, index)}
                />
                <AuthLabel>{CertificationType[index]}</AuthLabel>
              </AuthList>
            ))}
          </SurveyRequireAuthContainer>
          <SurveyEndDateInput
            type="datetime-local"
            onChange={handleStringInputChange}
            name="startedDate"
            value={`${surveyData?.startedDate}` || ''}
          />
          <SurveyEndDateInput
            type="datetime-local"
            onChange={handleStringInputChange}
            name="endedDate"
            value={`${surveyData?.endedDate}` || ''}
          />
          <AddButton name="addQuestion" onClick={(event) => handleButtonClick(event, -1)}>
            +
          </AddButton>
        </SurveyDataContainer>
        {questionList.map((question: QuestionCreateRequest) =>
          showQuestionForm(question.questionType, question.questionNo)
        )}
      </BodyContainer>
      <Button type="submit" onClick={handleSubmit}>
        완료하기
      </Button>
    </Container>
  );
}
