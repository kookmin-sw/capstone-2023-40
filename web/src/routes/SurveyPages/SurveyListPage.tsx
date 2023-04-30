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
import { SurveyAbstractResponse } from '../../types/response/Survey';

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
      // const request: AxiosResponse<SurveyPageResponse> = await axios.get<SurveyPageResponse>(`${requests.getSurveyPage}?page=${page}`, {
      //   signal: abortSignal,
      // });
      const request = {
        surveys: [
          {
            surveyId: 'b4458690-3b83-4929-81b2-f6d27743dbb2',
            authorId: 3,
            title: '카카오 사용자분들 대상으로 한 설문조사입니다!',
            description: '간단한 설문조사입니다.',
            startedDate: '2023-04-30T15:54:00',
            endedDate: '2023-05-20T23:59:59',
            certificationTypes: [],
            createdDate: '2023-04-28T23:29:31',
            modifiedDate: '2023-04-30T00:02:39',
          },

          {
            surveyId: '34b2a64a-39a5-4c3f-9e93-5d4201e7f748',
            authorId: 3,
            title: '카카오 사용자분들 대상으로 한 설문조사입니다!',
            description: '간단한 설문조사입니다.',
            startedDate: '2023-04-30T15:54:00',
            endedDate: '2023-05-20T23:59:59',
            certificationTypes: [1, 2, 3, 4],
            createdDate: '2023-04-28T23:29:31',
            modifiedDate: '2023-04-30T00:02:13',
          },

          {
            surveyId: '1eb00f9e-438e-41ba-a647-6490f0c43b8b',
            authorId: 3,
            title: '카카오 사용자분들 대상으로 한 설문조사입니다!',
            description: '간단한 설문조사입니다.',
            startedDate: '2023-04-30T15:54:00',
            endedDate: '2023-05-20T23:59:59',
            certificationTypes: [0],
            createdDate: '2023-04-28T23:29:31',
            modifiedDate: '2023-04-30T00:01:04',
          },

          {
            surveyId: '768ac9c6-de4a-4c40-b21b-b2ba86c0fab5',
            authorId: 1,
            title: '(2) 카카오 사용자분들 대상으로 한 설문조사입니다!',
            description: '간단한 설문조사입니다.',
            startedDate: '2023-04-30T15:54:00',
            endedDate: '2023-05-20T23:59:59',
            certificationTypes: [1],
            createdDate: '2023-04-28T23:29:31',
            modifiedDate: '2023-04-29T00:11:26',
          },

          {
            surveyId: '6002842b-7fc5-415e-a280-b226f2b25baa',
            authorId: 3,
            title: '카카오 사용자분들 대상으로 한 설문조사입니다!',
            description: '간단한 설문조사입니다.',
            startedDate: '2023-04-30T15:54:00',
            endedDate: '2023-05-20T23:59:59',
            certificationTypes: [3],
            createdDate: '2023-04-28T23:29:31',
            modifiedDate: '2023-04-28T23:54:24',
          },

          {
            surveyId: '5219dd76-c208-47a2-bf3c-ad3d7faded15',
            authorId: 1,
            title: '카카오 사용자분들 대상으로 한 설문조사입니다!',
            description: '간단한 설문조사입니다.',
            startedDate: '2023-04-30T15:54:00',
            endedDate: '2023-05-20T23:59:59',
            certificationTypes: [4],
            createdDate: '2023-04-28T23:29:31',
            modifiedDate: '2023-04-28T23:29:31',
          },
        ],
        page: 1,
        totalSurveys: 6,
        totalPages: 5,
      };
      setSurveys(request.surveys);
      setTotalPages(request.totalPages);
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
