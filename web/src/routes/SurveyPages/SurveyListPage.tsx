import React, { useState, useEffect } from 'react';

import { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import axios from '../../api/axios';
import requests from '../../api/request';
import Header from '../../components/Header';
import Pagination from '../../components/Pagination';
import SurveyListSkeleton from '../../components/Skeleton/SurveyListSkeleton';
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
  height: 22px;
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
  cursor: pointer;

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

const Notification = styled.div`
  text-align: center;
  margin-top: 35vh;
  padding: 10px;
`;

const Label = styled.label`
  font-size: 50px;
  font-weight: 700;
  color: ${(props) => props.theme.colors.default};
  text-align: center;

  @media screen and (max-width: 700px) {
    font-size: 30px;
    }
  } 
`;

const Button = styled.button`
  display: inline-flex;
  font-size: 20px;
  font-weight: 700;
  align-items: center;
  border-radius: 10px;
  border-style: none;
  height: 50px;
  padding: 20px;
  margin: 10px;
  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1), opacity 15ms linear 30ms,
    transform 270ms cubic-bezier(0, 0, 0.2, 1) 0ms;
  cursor: pointer;
  color: ${(props) => props.theme.colors.default};
  background-color: ${(props) => props.theme.colors.primary};

  &:hover {
    background-color: ${(props) => props.theme.colors.prhover};
  }
  @media screen and (max-width: 700px) {
    font-size: 18px;
    }
  } 
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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFetch, setIsFetch] = useState<boolean>(false);
  const navigate = useNavigate();

  const fetchSurveyData = async (): Promise<void> => {
    setIsLoading(true);
    // TODO: More detailed error handling is needed.
    try {
      const request: AxiosResponse<Survey[]> = await axios.get<Survey[]>(requests.fetchSurveyListPage + page);
      setSurveys(request.data);
    } catch {
      setSurveys([]);
    }
    setIsLoading(false);
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
    setIsFetch(false);
    fetchSurveyData();
    setIsFetch(true);
  }, [page]);

  // After get data from api server
  if (!isLoading && isFetch) {
    if (surveys.length === 0) {
      return (
        <Container theme={theme}>
          <Header theme={theme} toggleTheme={toggleTheme} />
          <Notification theme={theme}>
            <Label theme={theme}>😥 참여가능한 설문이 없습니다...</Label>
            <br />
            <Button theme={theme}>설문 만들러 가기</Button>
          </Notification>
        </Container>
      );
    }
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
        </ListTable>

        <Pagination currentPage={page} numOfTotalPage={13} numOfPageToShow={4} setPage={setPage} theme={theme} />
      </Container>
    );
  }
  // Before get data from api server
  return (
    <Container theme={theme}>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <SurveyListSkeleton theme={theme} />
      <Pagination currentPage={page} numOfTotalPage={13} numOfPageToShow={4} setPage={setPage} theme={theme} />
    </Container>
  );
}
