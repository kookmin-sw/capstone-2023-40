import React, { useState, useEffect } from 'react';

import { AxiosError, AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import axios from '../../api/axios';
import requests from '../../api/request';
import CertificationList from '../../components/CertificationList';
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

const AuthList = styled(Item)`
  min-width: 100px;
  width: 20vw;
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
`;

interface SurveyItem {
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
  const [surveys, setSurveys] = useState<SurveyItem[]>([]);
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [abortController, setAbortController] = useState<AbortController>(new AbortController());
  const navigate = useNavigate();

  const fetchSurveyList = async (abortSignal: AbortSignal): Promise<void> => {
    setIsLoading(true);
    try {
      const request: AxiosResponse<SurveyItem[]> = await axios.get<SurveyItem[]>(requests.getSurvey + page, {
        signal: abortSignal,
      });
      setSurveys(request.data);
      setIsLoading(false);
    } catch (error) {
      const { name } = error as unknown as AxiosError;
      if (name !== 'CanceledError') {
        setSurveys([]);
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    if (isLoading) {
      abortController.abort();
    }
    const controller = new AbortController();
    const { signal } = controller;
    setAbortController(controller);
    fetchSurveyList(signal);
  }, [page]);

  // After get data from api server
  if (!isLoading) {
    if (surveys.length === 0) {
      return (
        <Container theme={theme}>
          <Header theme={theme} toggleTheme={toggleTheme} />
          <Notification theme={theme}>
            <Label theme={theme}>😥 참여가능한 설문이 없습니다...</Label>
            <br />
            <Button theme={theme} onClick={() => navigate('/survey/form')}>
              설문 만들러 가기
            </Button>
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
                <AuthList theme={theme}>
                  {survey.required_authentications.length === 0
                    ? CertificationList({ label: '', iconOption: true })
                    : survey.required_authentications.map((label) =>
                        CertificationList({ label: label, iconOption: true })
                      )}
                </AuthList>
                <EndDate theme={theme}>{survey.ended_date.substring(0, 10)}</EndDate>
              </ListRow>
            ))}
          </ListBody>
        </ListTable>

        <Pagination currentPage={page} numOfTotalPage={13} numOfPageToShow={5} setPage={setPage} theme={theme} />
      </Container>
    );
  }
  // Before get data from api server
  return (
    <Container theme={theme}>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <SurveyListSkeleton numOfSurveyRow={8} theme={theme} />
      <Pagination currentPage={page} numOfTotalPage={13} numOfPageToShow={5} setPage={setPage} theme={theme} />
    </Container>
  );
}
