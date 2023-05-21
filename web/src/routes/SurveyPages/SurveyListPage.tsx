import React, { useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import styled from 'styled-components';

import { fetchSurveyList } from '../../api/fetchFunctions';
import ErrorPage from '../../components/ErrorPage';
import Header from '../../components/Header';
import { SurveyPreviewModal } from '../../components/Modal';
import Pagination from '../../components/Pagination';
import SurveyListSkeleton from '../../components/Skeleton/SurveyListSkeleton';
import SurveyListTable from '../../components/SurveyListTable';
import { useTheme } from '../../hooks/useTheme';
import { SurveyPageResponse } from '../../types/response/Survey';
import { responseErrorHandle } from '../../utils/responseErrorHandle';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${(props) => props.theme.colors.container};
`;

const ListContainer = styled.div``;

export default function SurveyListPage() {
  const [theme, toggleTheme] = useTheme();
  const [page, setPage] = useState<number>(1);
  const [previewModalOpen, setPreviewModalOpen] = useState<boolean>(false);
  const [selectedSurveyIndex, setSelectedSurveyIndex] = useState<number>(0);

  const { data, isLoading, isError, error } = useQuery<SurveyPageResponse>(['surveyPage', page], fetchSurveyList, {
    cacheTime: 5 * 60 * 1000, // 5 minutes
    staleTime: 20 * 1000, // 20 seconds
    retry: 1,
    refetchOnWindowFocus: false,
  });

  if (isError) {
    const errorMessages: string[] = responseErrorHandle(error as AxiosError);

    return (
      <ErrorPage
        labelText={`😥 ${errorMessages[0]}..`}
        buttonText={errorMessages[1]}
        navigateRoute={errorMessages[2]}
        theme={theme}
        toggleTheme={toggleTheme}
      />
    );
  }

  if (isLoading) {
    return (
      <Container theme={theme}>
        <Header theme={theme} toggleTheme={toggleTheme} />
        <SurveyListSkeleton numOfSurveyRow={8} theme={theme} />
      </Container>
    );
  }

  if (data.surveys.length === 0) {
    return (
      <ErrorPage
        labelText="😥 참여 가능한 설문이 없습니다..."
        buttonText="설문 만들러 가기"
        navigateRoute="/survey/form"
        theme={theme}
        toggleTheme={toggleTheme}
      />
    );
  }

  return (
    <Container theme={theme}>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <ListContainer>
        <SurveyListTable
          theme={theme}
          surveys={data.surveys}
          setSelectedSurveyIndex={setSelectedSurveyIndex}
          setPreviewModalOpen={setPreviewModalOpen}
        />
        {previewModalOpen && (
          <SurveyPreviewModal
            surveyItem={data.surveys[selectedSurveyIndex]}
            setPreviewModalOpen={setPreviewModalOpen}
            theme={theme}
          />
        )}
        <Pagination
          currentPage={page}
          numOfTotalPage={data.totalPages}
          numOfPageToShow={5}
          setPage={setPage}
          theme={theme}
        />
      </ListContainer>
    </Container>
  );
}
