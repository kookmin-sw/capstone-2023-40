import React, { useEffect, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { fetchSurveyData } from '../../api/fetchFunctions';
import ErrorPage from '../../components/ErrorPage';
import Header from '../../components/Header';
import SurveyPageSkeleton from '../../components/Skeleton/SurveyPageSkeleton';
import SurveyParticipateForm from '../../components/SurveyParticipateForm/SurveyParticipateForm';
import { useTheme } from '../../hooks/useTheme';
import { SurveyResponse } from '../../types/response/Survey';
import { responseErrorHandle } from '../../utils/responseErrorHandle';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${(props) => props.theme.colors.container};
`;

// TODO: disable submit button after click
export default function SurveyPage() {
  const { id } = useParams();
  const [theme, toggleTheme] = useTheme();
  const [errorLabel, setErrorLabel] = useState<string>('');
  const [errorButtonText, setErrorButtonText] = useState<string>('');
  const [errorNavigate, setErrorNavigate] = useState<string>('');
  const dispatch = useDispatch();

  const { data, isLoading, isError, error } = useQuery<SurveyResponse>(['survey', id], fetchSurveyData, {
    cacheTime: 15 * 60 * 1000, // 15 minutes
    staleTime: 10 * 60 * 1000, // 10 minutes
    retry: 1,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (isError) {
      const errorMessages: string[] = responseErrorHandle(error as AxiosError, dispatch);

      setErrorLabel(`😥 ${errorMessages[0]}..`);
      setErrorButtonText(errorMessages[1]);
      setErrorNavigate(errorMessages[2]);
    }
  }, [isError]);

  if (isError) {
    return (
      <ErrorPage
        labelText={errorLabel}
        buttonText={errorButtonText}
        navigateRoute={errorNavigate}
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
