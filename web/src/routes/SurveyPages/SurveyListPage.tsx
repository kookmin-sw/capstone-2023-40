import React, { useState } from 'react';

import { QueryFunctionContext, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import axios from '../../api/axios';
import { requests } from '../../api/request';
import RectangleButton from '../../components/Button/RectangleButton';
import Header from '../../components/Header';
import { SurveyPreviewModal } from '../../components/Modal';
import Pagination from '../../components/Pagination';
import SurveyListSkeleton from '../../components/Skeleton/SurveyListSkeleton';
import SurveyListTable from '../../components/SurveyListTable';
import { useTheme } from '../../hooks/useTheme';
import { SurveyPageResponse } from '../../types/response/Survey';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${(props) => props.theme.colors.container};
`;

const ListContainer = styled.div``;

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

const fetchSurveyList = async ({ queryKey }: QueryFunctionContext) => {
  const { data } = await axios.get<SurveyPageResponse>(`${requests.getSurveyPage}${queryKey[1]}`);

  return data;
};

export default function SurveyListPage() {
  const navigate = useNavigate();
  const [theme, toggleTheme] = useTheme();
  const [page, setPage] = useState<number>(1);
  const [previewModalOpen, setPreviewModalOpen] = useState<boolean>(false);
  const [selectedSurveyIndex, setSelectedSurveyIndex] = useState<number>(0);

  // FIXME: cacheTime and staleTime is appropriate?
  const { data, isLoading, isError, error } = useQuery<SurveyPageResponse>(['surveyPage', page], fetchSurveyList, {
    cacheTime: 9000,
    staleTime: 60000,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  if (isError) {
    // TODO: 에러 종류에 따라서 다른 알림 표시
    const { response } = error as AxiosError;

    if (response!.data === '존재하지 않는 페이지입니다.') {
      return (
        <Container theme={theme}>
          <Header theme={theme} toggleTheme={toggleTheme} />
          <Notification theme={theme}>
            <Label theme={theme}>😥 참여가능한 설문이 없습니다...</Label>
            <br />
            <RectangleButton
              text="설문 만들러 가기"
              width="250px"
              backgroundColor={theme.colors.primary}
              hoverColor={theme.colors.prhover}
              handleClick={() => navigate('/survey/form')}
              theme={theme}
            />
          </Notification>
        </Container>
      );
    }
    return (
      <Container theme={theme}>
        <Header theme={theme} toggleTheme={toggleTheme} />
        <Notification theme={theme}>
          <Label theme={theme}>😥 로그인이 만료 되었습니다...</Label>
          <br />
          <RectangleButton
            text="로그인 하러 가기"
            width="250px"
            backgroundColor={theme.colors.primary}
            hoverColor={theme.colors.prhover}
            handleClick={() => navigate('/login')}
            theme={theme}
          />
        </Notification>
      </Container>
    );
  }

  return (
    <Container theme={theme}>
      <Header theme={theme} toggleTheme={toggleTheme} />
      {isLoading ? (
        <SurveyListSkeleton numOfSurveyRow={8} theme={theme} />
      ) : (
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
      )}
    </Container>
  );
}
