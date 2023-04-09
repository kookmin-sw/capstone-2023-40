import React from 'react';

import styled, { DefaultTheme } from 'styled-components';

import { SurveyCreateRequest, CertificationType } from '../../types/request/Survey';
import { NumberUtils } from '../../utils/NumberUtils';

const Container = styled.div``;

const GuideLabel = styled.label`
  margin-left: 10px;
  margin-right: 10px;
  font-weight: 900;
  color: ${(props) => props.theme.colors.default};
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

const CertificationLabel = styled.span``;

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

interface SurveyDataFormProps {
  surveyData: SurveyCreateRequest;
  handleChangeSurveyData: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeCheck: (event: React.ChangeEvent<HTMLInputElement>, value: number) => void;
  handleClickButton: (event: React.MouseEvent<HTMLButtonElement>, questionId: number, optionId?: number) => void;
  theme: DefaultTheme;
}

export default function SurveyDataForm({
  surveyData,
  handleChangeSurveyData,
  handleChangeCheck,
  handleClickButton,
  theme,
}: SurveyDataFormProps) {
  return (
    <Container theme={theme}>
      <SurveyTitleInput theme={theme} onChange={handleChangeSurveyData} name="title" value={surveyData?.title || ''} />
      <SurveyDescriptionInput
        theme={theme}
        onChange={handleChangeSurveyData}
        name="description"
        value={surveyData?.description || ''}
      />
      <SurveyCertificationsContainer theme={theme}>
        <SelectedCertificationsContainer theme={theme}>
          <GuideLabel theme={theme}>필수 인증 목록 : </GuideLabel>
          {surveyData.certificationTypes?.map((auth: number) => (
            <SelectedCertification theme={theme} key={auth}>
              {CertificationType[auth]}
            </SelectedCertification>
          ))}
        </SelectedCertificationsContainer>
        {NumberUtils.range(0, 6).map((index: number) => (
          <CertificationPicker theme={theme} key={index} htmlFor={`${index}`}>
            <CheckBox
              id={`${index}`}
              checked={surveyData.certificationTypes?.includes(index)}
              onChange={(e) => handleChangeCheck(e, index)}
            />
            <CertificationLabel theme={theme}>{CertificationType[index]}</CertificationLabel>
          </CertificationPicker>
        ))}
      </SurveyCertificationsContainer>
      <SurveyDateContainer>
        <GuideLabel theme={theme}>설문조사 기간 : </GuideLabel>
        <SurveyDateInput
          theme={theme}
          onChange={handleChangeSurveyData}
          name="startedDate"
          value={`${surveyData?.startedDate}` || ''}
        />
        <GuideLabel theme={theme}> ~ </GuideLabel>
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
    </Container>
  );
}
