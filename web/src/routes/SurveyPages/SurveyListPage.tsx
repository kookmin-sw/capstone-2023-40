import React, { useState, useEffect } from 'react';

import { AxiosResponse } from 'axios';
import styled from 'styled-components';

import axios from '../../api/axios';
import requests from '../../api/request';
import Header from '../../components/Header';
import { useTheme } from '../../hooks/useTheme';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${(props) => props.theme.colors.container};
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
`;

const SurveyListContainer = styled.table``;
const SurveyListHead = styled.thead``;
const SurveyListBody = styled.tbody``;
const SurveyColumn = styled.tr``;

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
      <SurveyListContainer theme={theme}>
        <SurveyListHead theme={theme}>
          <SurveyColumn>
            <th>설문제목</th>
            <th>필수인증</th>
            <th>설문종료일</th>
          </SurveyColumn>
        </SurveyListHead>

        <SurveyListBody>
          {surveys.map((survey) => (
            <SurveyColumn key={survey.survey_id} theme={theme}>
              <td>{survey.title}</td>
              <td>{survey.must_auth_list}</td>
              <td>{survey.ended_at}</td>
            </SurveyColumn>
          ))}
        </SurveyListBody>
      </SurveyListContainer>
    </Container>
  );
}
