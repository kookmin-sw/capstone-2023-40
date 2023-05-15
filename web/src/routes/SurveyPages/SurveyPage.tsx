import React from 'react';

import { QueryFunctionContext, useQuery } from '@tanstack/react-query';
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

const fetchSurveyData = async ({ queryKey }: QueryFunctionContext) => {
  const { data } = await axios.get<SurveyResponse>(requests.getSurvey + queryKey[1]);

  return data;
};

// TODO: disable submit button after click
export default function SurveyPage() {
  const { id } = useParams();
  const [theme, toggleTheme] = useTheme();

  // FIXME: cacheTime and staleTime is appropriate?
  const { data, isLoading, isFetching } = useQuery<SurveyResponse>(['survey', id], fetchSurveyData, {
    cacheTime: 3000,
    staleTime: 60000,
  });

  return (
    <Container theme={theme}>
      <Header theme={theme} toggleTheme={toggleTheme} />
      {isLoading ? <SurveyPageSkeleton theme={theme} /> : <SurveyParticipateForm surveyData={data!} theme={theme} />}
    </Container>
  );
}
