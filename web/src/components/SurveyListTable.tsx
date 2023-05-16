import React from 'react';

import styled, { DefaultTheme } from 'styled-components';

import { SurveyAbstractResponse } from '../types/response/Survey';
import { dateFormatUpToMinute } from '../utils/dateFormat';
import CertificationIconList from './CertificationIconList';

const ListTable = styled.table`
  display: flex;
  flex-direction: column;
  padding: 3vh 5vw 1vh 5vw;
  background-color: ${(props) => props.theme.colors.container};
`;

const ListHead = styled.thead``;

const ListBody = styled.tbody``;

const ListRow = styled.tr`
  display: flex;
  flex-direction: row;
`;

const Item = styled.td`
  height: 22px;
  margin: 2px;
  padding: 18px;
  padding-bottom: 19px;
  font-size: 17px;
  font-weight: bold;
  border-radius: 5px;
  color: ${(props) => props.theme.colors.default};
  background-color: ${(props) => props.theme.colors.background};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const HeadItem = styled.th`
  margin: 2px;
  padding: 18px;
  font-size: 17px;
  font-weight: bold;
  text-align: center;
  color: ${(props) => props.theme.colors.default};
`;

const Title = styled(Item)`
  min-width: 15vh;
  flex: 1;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.colors.btnhover};
  }
`;

const EndDate = styled(Item)`
  min-width: 150px;
  width: 13vw;
  text-align: center;

  @media screen and (max-width: 900px) {
    display: none;
  }
`;

const HeadTitle = styled(HeadItem)`
  min-width: 15vh;
  flex: 1;
`;

const HeadAuthList = styled(HeadItem)`
  min-width: 100px;
  width: 20vw;
`;

const HeadEndDate = styled(HeadItem)`
  min-width: 150px;
  width: 13vw;

  @media screen and (max-width: 900px) {
    display: none;
  }
`;

interface SurveyListTableProps {
  surveys: SurveyAbstractResponse[];
  setSelectedSurveyIndex: (arg: number) => void;
  setPreviewModalOpen: (arg: boolean) => void;
  theme: DefaultTheme;
}

export default function SurveyListTable({
  surveys,
  setSelectedSurveyIndex,
  setPreviewModalOpen,
  theme,
}: SurveyListTableProps) {
  const handleButtonClick = (index: number) => {
    setSelectedSurveyIndex(index);
    setPreviewModalOpen(true);
  };

  return (
    <ListTable theme={theme}>
      <ListHead>
        <ListRow>
          <HeadTitle theme={theme}>설문 제목</HeadTitle>
          <HeadAuthList theme={theme}>필수인증</HeadAuthList>
          <HeadEndDate theme={theme}>설문 종료일</HeadEndDate>
        </ListRow>
      </ListHead>

      <ListBody>
        {surveys.map((survey: SurveyAbstractResponse, index: number) => (
          <ListRow key={survey.surveyId} theme={theme}>
            <Title role="button" onClick={() => handleButtonClick(index)} theme={theme}>
              {survey.title}
            </Title>
            <Item>
              <CertificationIconList certificationList={survey.certificationTypes} theme={theme} />
            </Item>
            <EndDate theme={theme}>{dateFormatUpToMinute(`${survey.endedDate}`)}</EndDate>
          </ListRow>
        ))}
      </ListBody>
    </ListTable>
  );
}
