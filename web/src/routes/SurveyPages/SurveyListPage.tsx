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
  ${(props) => props.theme.colors.container};
`;

const ListContainer = styled.div`
  width: 90vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 5vw;
  background-color: ${(props) => props.theme.colors.container};
`;

const ListColumn = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const Item = styled.div`
  margin: 2px;
  padding: 19px;
  font-size: 17px;
  font-weight: bold;
  border-radius: 5px;
  color: ${(props) => props.theme.colors.default};
  background-color: ${(props) => props.theme.colors.header};
`;

const HeadItem = styled.div`
  margin: 2px;
  padding: 19px;
  font-size: 17px;
  font-weight: bolder;
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

const Auth = styled(Item)`
  min-width: 70px;
  width: 17vw;
`;

const EndDate = styled(Item)`
  min-width: 70px;
  width: 13vw;
  text-align: center;
`;

const HeadTitle = styled(HeadItem)`
  min-width: 15vh;
  flex: 1;
`;

const HeadAuth = styled(HeadItem)`
  min-width: 70px;
  width: 17vw;
`;

const HeadEndDate = styled(HeadItem)`
  min-width: 70px;
  width: 13vw;
`;

interface Survey {
  author_id: string;
  title: string;
  created_at: string;
  started_at: string;
  ended_at: string;
  must_auth_list: Array<string>;
  survey_id: number;
}

export default function SurveyListPage() {
  const [theme, toggleTheme] = useTheme();
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const navigate = useNavigate();

  const fetchSurveyData = async (): Promise<AxiosResponse<Survey[]>> => {
    const request: AxiosResponse<Survey[]> = await axios.get<Survey[]>(requests.fetchSurveyList);
    setSurveys(request.data);
    return request;
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
          <HeadAuth theme={theme}>필수인증</HeadAuth>
          <HeadEndDate theme={theme}>설문 종료일</HeadEndDate>
        </ListColumn>

        {surveys.map((survey) => (
          <ListColumn key={survey.survey_id} theme={theme}>
            <Title onClick={() => navigate(`/survey/${survey.survey_id}`)} theme={theme}>
              {survey.title}
            </Title>
            <Auth theme={theme}>{survey.must_auth_list}</Auth>
            <EndDate theme={theme}>{survey.ended_at}</EndDate>
          </ListColumn>
        ))}
      </ListContainer>
    </Container>
  );
}
