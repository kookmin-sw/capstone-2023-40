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
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5));
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
`;

interface Survey {
  author_id: number;
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
    <Container>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <ul>
        {surveys.map((survey) => (
          <li key={survey.survey_id}>
            {survey.title} ({survey.must_auth_list})
          </li>
        ))}
      </ul>
    </Container>
  );
}
