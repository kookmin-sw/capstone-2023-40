import React from 'react';

import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { fetchSurveyData } from '../../api/fetchFunctions';
import ErrorPage from '../../components/ErrorPage';
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

  // FIXME: cacheTime and staleTime is appropriate?
  const { data, isLoading, isError, error } = useQuery<SurveyResponse>(['survey', id], fetchSurveyData, {
    cacheTime: 15 * 60 * 1000, // 15 minutes
    staleTime: 10 * 60 * 1000, // 10 minutes
    retry: 1,
    refetchOnWindowFocus: false,
  });

  if (isError) {
    // TODO: 에러 종류에 따라서 다른 알림 표시
    const { response } = error as AxiosError;

    return (
      <ErrorPage
        labelText="😥 잘못된 설문 입니다..."
        buttonText="설문 리스트로 돌아가기"
        navigateRoute="/survey"
        theme={theme}
        toggleTheme={toggleTheme}
      />
    );
  }

  return (
    <Container theme={theme}>
      <Header theme={theme} toggleTheme={toggleTheme} />
      {isLoading ? <SurveyPageSkeleton theme={theme} /> : <SurveyParticipateForm surveyData={data} theme={theme} />}
    </Container>
  );
}
