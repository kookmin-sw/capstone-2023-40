import React from 'react';

import styled, { DefaultTheme } from 'styled-components';

import { SurveyCreateRequest } from '../../types/request/Survey';
import { NumberUtils } from '../../utils/NumberUtils';
import { PlusImage } from '../Button/ImageButtons';
import Certification from '../Certification';
import CertificationIconList from '../CertificationIconList';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const GuideLabel = styled.label`
  margin-left: 10px;
  margin-right: 10px;
  font-weight: 900;
  color: ${(props) => props.theme.colors.default};

  @media screen and (max-width: 650px) {
    margin-left: 2px;
    margin-right: 2px;
  }
`;

const TextInput = styled.input.attrs({ type: 'text', maxLength: 100 })`
  padding: 1.2vh 1.5vw 1.2vh 1.5vw;
  border: ${(props) => props.theme.border};
  border-radius: ${(props) => props.theme.borderRadius};
  font-weight: 900;
  color: ${(props) => props.theme.colors.text};
  background-color: ${(props) => props.theme.colors.inputBackground};
  cursor: text;

  ::placeholder {
    color: ${(props) => props.theme.colors.placeHolder};
  }
`;

const SurveyTitleInput = styled(TextInput)`
  margin-top: 7px;
  margin-bottom: 10px;
  font-size: 23px;
`;

const SurveyDescriptionInput = styled(TextInput)`
  margin-bottom: 25px;
  font-size: 18px;
`;

const SurveyCertificationsContainer = styled.div`
  width: 76vw;
  padding-bottom: 15px;
`;

const SelectedCertificationsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  height: 50px;
`;

const SurveyDateContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: baseline;
  flex-wrap: wrap;
`;

const SurveyDateInput = styled.input.attrs({ type: 'datetime-local' })`
  padding: 1.2vh 1.5vw 1.2vh 1.5vw;
  border: ${(props) => props.theme.border};
  border-radius: ${(props) => props.theme.borderRadius};
  font-weight: 900;
  color: ${(props) => props.theme.colors.default};
  background-color: ${(props) => props.theme.colors.container};
  margin-bottom: 10px;
`;

const List = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 0px;
`;

const ListItem = styled.li`
  list-style: none;
  margin: 3px;
`;

const CertificationLabel = styled.label`
  display: flex;
  align-items: center;
  font-weight: 900;
  color: ${(props) => props.theme.colors.default};
`;

const CheckBox = styled.input.attrs({ type: 'checkbox' })`
  appearance: none;
  width: 20px;
  height: 20px;
  border: ${(props) => props.theme.border};
  border-color: ${(props) => props.theme.colors.default};
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

interface SurveyDataFormProps {
  surveyData: SurveyCreateRequest;
  handleChangeSurveyData: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeCheck: (event: React.ChangeEvent<HTMLInputElement>, value: number) => void;
  handleClickButton: (name: string, questionId?: number, optionId?: number) => void;
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
      <SurveyTitleInput
        theme={theme}
        onChange={handleChangeSurveyData}
        id="title"
        value={surveyData?.title || ''}
        placeholder="설문지의 제목을 입력해주세요"
      />
      <SurveyDescriptionInput
        theme={theme}
        onChange={handleChangeSurveyData}
        id="description"
        value={surveyData?.description || ''}
        placeholder="설문지의 설명을 입력해주세요"
      />

      <SurveyCertificationsContainer theme={theme}>
        <SelectedCertificationsContainer theme={theme}>
          <GuideLabel theme={theme}>필수 인증 : </GuideLabel>
          <CertificationIconList
            width="65%"
            minWidth="100px"
            certificationList={surveyData.certificationTypes || []}
            theme={theme}
          />
        </SelectedCertificationsContainer>
        <List>
          {NumberUtils.range(1, 7).map((index: number) => {
            return (
              <ListItem key={index}>
                <CertificationLabel htmlFor={`certification${index}`} theme={theme}>
                  <CheckBox
                    id={`certification${index}`}
                    checked={surveyData.certificationTypes?.includes(index)}
                    onChange={(e) => handleChangeCheck(e, index)}
                    theme={theme}
                  />
                  {Certification({ label: index, iconOption: false })}
                </CertificationLabel>
              </ListItem>
            );
          })}
        </List>
      </SurveyCertificationsContainer>

      <SurveyDateContainer>
        <GuideLabel htmlFor="startedDate" theme={theme}>
          시작일 :{' '}
        </GuideLabel>
        <SurveyDateInput
          theme={theme}
          onChange={handleChangeSurveyData}
          id="startedDate"
          value={`${surveyData?.startedDate}` || ''}
        />
        <GuideLabel htmlFor="endedDate" theme={theme}>
          종료일 :{' '}
        </GuideLabel>
        <SurveyDateInput
          theme={theme}
          onChange={handleChangeSurveyData}
          id="endedDate"
          value={`${surveyData?.endedDate}` || ''}
        />
      </SurveyDateContainer>

      <ButtonContainer>
        <PlusImage data-testid="addQuestion" onClick={() => handleClickButton('addQuestion', -1)} theme={theme} />
      </ButtonContainer>
    </Container>
  );
}
