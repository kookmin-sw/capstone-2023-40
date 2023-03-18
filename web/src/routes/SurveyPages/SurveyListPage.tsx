import React, { useState, useEffect } from 'react';

import { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import axios from '../../api/axios';
import requests from '../../api/request';
import Header from '../../components/Header';
import Pagination from '../../components/Pagination';
import { useTheme } from '../../hooks/useTheme';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${(props) => props.theme.colors.container};
`;

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
  justify-content: center;
`;

const Item = styled.td`
  margin: 2px;
  padding: 2vh;
  font-size: 1.7vh;
  font-weight: bold;
  border-radius: 5px;
  color: ${(props) => props.theme.colors.default};
  background-color: ${(props) => props.theme.colors.header};
`;

const HeadItem = styled.th`
  margin: 2px;
  padding: 2vh;
  font-size: 2vh;
  font-weight: bold;
  text-align: center;
  color: ${(props) => props.theme.colors.default};
`;

const Title = styled(Item)`
  min-width: 15vh;
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover {
    background-color: ${(props) => props.theme.colors.btnhover};
  }
`;

const Authlist = styled(Item)`
  min-width: 160px;
  width: 20vw;
`;

const EndDate = styled(Item)`
  min-width: 150px;
  width: 13vw;
  text-align: center;

  @media screen and (max-width: 900px) {
    display: none;
    }
  } 
`;

const HeadTitle = styled(HeadItem)`
  min-width: 15vh;
  flex: 1;
`;

const HeadAuthList = styled(HeadItem)`
  min-width: 160px;
  width: 20vw;
`;

const HeadEndDate = styled(HeadItem)`
  min-width: 150px;
  width: 13vw;
  
  @media screen and (max-width: 900px) {
    display: none;
    }
  } 
`;

const Auth = styled.label`
  font-size: 11px;
  color: black;
  padding: 5px;
  border-radius: 7px;
  margin: 3px;
`;

const Kakao = styled(Auth)`
  background-color: #f7e600;
`;
const Google = styled(Auth)`
  background-color: #ea4335;
`;
const Webmail = styled(Auth)`
  background-color: #f3943e;
`;
const Id = styled(Auth)`
  background-color: #edd8d3;
`;
const MobilePhone = styled(Auth)`
  background-color: #a1daf7;
`;
const DriverLicense = styled(Auth)`
  background-color: #34a853;
`;
const AuthNone = styled(Auth)`
  background-color: #b3b2b2;
`;

const AuthSummary = styled.span`
  font-size: 13px;
`;

interface Survey {
  survey_id: string;
  author: number;
  title: string;
  description: string;
  created_date: string;
  ended_date: string;
  required_authentications: Array<string>;
}

export default function SurveyListPage() {
  const [theme, toggleTheme] = useTheme();
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [page, setPage] = useState<number>(1);
  const navigate = useNavigate();

  const fetchSurveyData = async (): Promise<void> => {
    const request: AxiosResponse<Survey[]> = await axios.get<Survey[]>(requests.fetchSurveyListPage + page);
    setSurveys(request.data);
  };

  const makeAuthLabel = (auth: string) => {
    switch (auth) {
      case 'KAKAO':
        return <Kakao key={auth}>카카오계정</Kakao>;
      case 'GOOGLE':
        return <Google key={auth}>구글계정</Google>;
      case 'WEBMAIL':
        return <Webmail key={auth}>학교인증</Webmail>;
      case 'ID':
        return <Id key={auth}>신분증</Id>;
      case 'MOBILE_PHONE':
        return <MobilePhone key={auth}>휴대폰인증</MobilePhone>;
      case 'DRIVER_LICENSE':
        return <DriverLicense key={auth}>운전면허</DriverLicense>;
      default:
        return <AuthNone key={auth}>제한없음</AuthNone>;
    }
  };

  useEffect(() => {
    fetchSurveyData();
  }, [page]);

  return (
    <Container theme={theme}>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <ListTable theme={theme}>
        <ListHead>
          <ListRow>
            <HeadTitle theme={theme}>설문 제목</HeadTitle>
            <HeadAuthList theme={theme}>필수인증</HeadAuthList>
            <HeadEndDate theme={theme}>설문 종료일</HeadEndDate>
          </ListRow>
        </ListHead>

        <ListBody>
          {surveys.map((survey) => (
            <ListRow key={survey.survey_id} theme={theme}>
              <Title onClick={() => navigate(`/survey/${survey.survey_id}`)} theme={theme}>
                {survey.title}
              </Title>
              <Authlist theme={theme}>
                {survey.required_authentications.length === 0
                  ? makeAuthLabel('')
                  : survey.required_authentications.slice(0, 2).map((auth) => makeAuthLabel(auth))}
                {survey.required_authentications.length > 2 ? (
                  <AuthSummary>{` ... +${survey.required_authentications.length - 2}`}</AuthSummary>
                ) : null}
              </Authlist>
              <EndDate theme={theme}>{survey.ended_date.substring(0, 10)}</EndDate>
            </ListRow>
          ))}
        </ListBody>
        {/* TODO: Show something when no data */}
      </ListTable>
      <Pagination currentPage={page} numOfTotalPage={13} numOfPageToShow={4} setPage={setPage} theme={theme} />
    </Container>
  );
}
