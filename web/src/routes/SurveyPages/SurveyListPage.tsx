import React, { useState, useEffect } from 'react';

import { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import axios from '../../api/axios';
import requests from '../../api/request';
import Header from '../../components/Header';
import { useTheme } from '../../hooks/useTheme';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${(props) => props.theme.colors.container};
`;

const ListContainer = styled.div`
  width: 90vw;
  height: 94vh;
  display: flex;
  flex-direction: column;
  padding: 3vh 5vw 3vh 5vw;
  background-color: ${(props) => props.theme.colors.container};
`;

const ListColumn = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const Item = styled.div`
  margin: 2px;
  padding: 2vh;
  font-size: 1.7vh;
  font-weight: bold;
  border-radius: 5px;
  color: ${(props) => props.theme.colors.default};
  background-color: ${(props) => props.theme.colors.header};
`;

const HeadItem = styled.div`
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
  const navigate = useNavigate();

  const fetchSurveyData = async (): Promise<AxiosResponse<Survey[]>> => {
    const request: AxiosResponse<Survey[]> = await axios.get<Survey[]>(requests.fetchSurveyListPage + 1);
    setSurveys(request.data);
    return request;
  };

  const makeAuthLabel = (auth: string) => {
    switch (auth) {
      case 'KAKAO':
        return <Kakao>카카오계정</Kakao>;
      case 'GOOGLE':
        return <Google>구글계정</Google>;
      case 'WEBMAIL':
        return <Webmail>학교인증</Webmail>;
      case 'ID':
        return <Id>신분증</Id>;
      case 'MOBILE_PHONE':
        return <MobilePhone>휴대폰인증</MobilePhone>;
      case 'DRIVER_LICENSE':
        return <DriverLicense>운전면허</DriverLicense>;
      default:
        return <AuthNone>Undefined</AuthNone>;
    }
  };
  useEffect(() => {
    fetchSurveyData();
  }, []);

  return (
    <Container theme={theme}>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <ListContainer theme={theme}>
        <ListColumn>
          <HeadTitle theme={theme}>설문 제목</HeadTitle>
          <HeadAuthList theme={theme}>필수인증</HeadAuthList>
          <HeadEndDate theme={theme}>설문 종료일</HeadEndDate>
        </ListColumn>

        {surveys.slice(0, 8).map((survey) => (
          <ListColumn key={survey.survey_id} theme={theme}>
            <Title onClick={() => navigate(`/survey/${survey.survey_id}`)} theme={theme}>
              {survey.title}
            </Title>
            <Authlist theme={theme}>
              {survey.required_authentications.length === 0 ? (
                <AuthNone>제한없음</AuthNone>
              ) : (
                survey.required_authentications.slice(0, 2).map((auth) => makeAuthLabel(auth))
              )}
              {survey.required_authentications.length > 2 ? (
                <AuthSummary>{` ... +${survey.required_authentications.length - 2}`}</AuthSummary>
              ) : null}
            </Authlist>
            <EndDate theme={theme}>{survey.ended_date.substring(0, 10)}</EndDate>
          </ListColumn>
        ))}
      </ListContainer>
    </Container>
  );
}
