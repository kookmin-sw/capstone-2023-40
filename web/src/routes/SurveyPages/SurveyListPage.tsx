import React, { useState, useEffect } from 'react';

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

export default function SurveyListPage() {
  const [theme, toggleTheme] = useTheme();
  const [surveys, setSurveys] = useState([]);

  const fetchSurveyData = async () => {
    const request = await axios.get(requests.fetchSurveyList);
    setSurveys(request.data);
    return request;
  };

  useEffect(() => {
    fetchSurveyData();
  }, []);

  return (
    <Container>
      <Header theme={theme} toggleTheme={toggleTheme} />
    </Container>
  );
}
