import React, { useState, useEffect } from 'react';

import { AxiosError, AxiosResponse } from 'axios';
import styled from 'styled-components';

import axios from '../../api/axios';
import { requests } from '../../api/request';
import Header from '../../components/Header';
import { SurveyPreviewModal } from '../../components/Modal';
import Pagination from '../../components/Pagination';
import SurveyListSkeleton from '../../components/Skeleton/SurveyListSkeleton';
import SurveyListTable from '../../components/SurveyListTable';
import { useTheme } from '../../hooks/useTheme';
import { SurveyAbstractResponse, SurveyPageResponse } from '../../types/response/Survey';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${(props) => props.theme.colors.container};
`;

export default function SurveyListPage() {
  const [theme, toggleTheme] = useTheme();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [abortController, setAbortController] = useState<AbortController>(new AbortController());
  const [surveys, setSurveys] = useState<SurveyAbstractResponse[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [previewModalOpen, setPreviewModalOpen] = useState<boolean>(false);
  const [selectedSurveyIndex, setSelectedSurveyIndex] = useState<number>(0);

  const fetchSurveyList = async (abortSignal: AbortSignal): Promise<void> => {
    setIsLoading(true);
    try {
      const request: AxiosResponse<SurveyPageResponse> = await axios.get<SurveyPageResponse>(
        `${requests.getSurveyPage}${page}`,
        { signal: abortSignal }
      );

      setSurveys(request.data.surveys);
      setTotalPages(request.data.totalPages);
      setIsLoading(false);
    } catch (error) {
      const { name } = error as unknown as AxiosError;
      if (name !== 'CanceledError') {
        setSurveys([]);
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    if (isLoading) {
      abortController.abort();
    }
    const controller = new AbortController();
    const { signal } = controller;
    setAbortController(controller);
    fetchSurveyList(signal);
  }, [page]);

  return (
    <Container theme={theme}>
      <Header theme={theme} toggleTheme={toggleTheme} />

      {isLoading ? (
        <SurveyListSkeleton numOfSurveyRow={10} theme={theme} />
      ) : (
        <SurveyListTable
          theme={theme}
          surveys={surveys}
          setSelectedSurveyIndex={setSelectedSurveyIndex}
          setPreviewModalOpen={setPreviewModalOpen}
        />
      )}

      {!isLoading && surveys.length !== 0 && (
        <Pagination
          currentPage={page}
          numOfTotalPage={totalPages}
          numOfPageToShow={5}
          setPage={setPage}
          theme={theme}
        />
      )}

      {previewModalOpen && (
        <SurveyPreviewModal
          surveyItem={surveys[selectedSurveyIndex]}
          setPreviewModalOpen={setPreviewModalOpen}
          theme={theme}
        />
      )}
    </Container>
  );
}
