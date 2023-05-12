import React, { useEffect, useState } from 'react';

import { AxiosError, AxiosResponse } from 'axios';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import axios from '../../api/axios';
import { requests } from '../../api/request';
import Header from '../../components/Header';
import SurveyPageSkeleton from '../../components/Skeleton/SurveyPageSkeleton';
import SurveyParticipateForm from '../../components/SurveyParticipateForm/SurveyParticipateForm';
import { useTheme } from '../../hooks/useTheme';
import { SurveyResponse } from '../../types/response/Survey';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${(props) => props.theme.colors.container};
`;

// TODO: disable submit button after click
export default function SurveyPage() {
  const { id } = useParams();
  const [theme, toggleTheme] = useTheme();
  const [surveyData, setSurveyData] = useState<SurveyResponse>();

  const fetchSurveyData = async () => {
    try {
      const request: AxiosResponse<SurveyResponse> = await axios.get<SurveyResponse>(requests.getSurvey + id);

      setSurveyData(request.data);
    } catch (error) {
      const { name } = error as unknown as AxiosError;
      // TODO: handle error while fetching data
    }
  };

  useEffect(() => {
    fetchSurveyData();
  }, []);

  return (
    <Container theme={theme}>
      <Header theme={theme} toggleTheme={toggleTheme} />
      {typeof surveyData === 'undefined' ? (
        <SurveyPageSkeleton theme={theme} />
      ) : (
        <SurveyParticipateForm surveyData={surveyData} theme={theme} />
      )}
    </Container>
  );
}
