import React from 'react';

import { QueryFunctionContext, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

import axios from '../../api/axios';
import { requests } from '../../api/request';
import RectangleButton from '../../components/Button/RectangleButton';
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

const Notification = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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

const fetchSurveyData = async ({ queryKey }: QueryFunctionContext) => {
  const { data } = await axios.get<SurveyResponse>(requests.getSurvey + queryKey[1]);

  return data;
};

// TODO: disable submit button after click
export default function SurveyPage() {
  const { id } = useParams();
  const [theme, toggleTheme] = useTheme();
  const navigate = useNavigate();

  // FIXME: cacheTime and staleTime is appropriate?
  const { data, isLoading, isError, error } = useQuery<SurveyResponse>(['survey', id], fetchSurveyData, {
    cacheTime: 3000,
    staleTime: 60000,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  if (isError) {
    // TODO: 에러 종류에 따라서 다른 알림 표시
    const { response } = error as AxiosError;

    return (
      <Container theme={theme}>
        <Header theme={theme} toggleTheme={toggleTheme} />
        <Notification theme={theme}>
          <Label theme={theme}>😥 잘못된 설문 입니다...</Label>
          <br />
          <RectangleButton
            text="설문 리스트로 돌아가기"
            width="250px"
            backgroundColor={theme.colors.primary}
            hoverColor={theme.colors.prhover}
            handleClick={() => navigate('/survey')}
            theme={theme}
          />
        </Notification>
      </Container>
    );
  }

  return (
    <Container theme={theme}>
      <Header theme={theme} toggleTheme={toggleTheme} />
      {isLoading ? <SurveyPageSkeleton theme={theme} /> : <SurveyParticipateForm surveyData={data} theme={theme} />}
    </Container>
  );
}
