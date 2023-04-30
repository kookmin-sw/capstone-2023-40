import React, { useState, useEffect } from 'react';

import { AxiosError, AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import axios from '../../api/axios';
import { requests } from '../../api/request';
import RectangleButton from '../../components/Button/RectangleButton';
import CertificationList from '../../components/CertificationList';
import Header from '../../components/Header';
import { SurveyPreviewModal } from '../../components/Modal';
import Pagination from '../../components/Pagination';
import SurveyListSkeleton from '../../components/Skeleton/SurveyListSkeleton';
import { useTheme } from '../../hooks/useTheme';
import { CertificationType } from '../../types/request/Survey';
import { SurveyAbstractResponse } from '../../types/response/Survey';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${(props) => props.theme.colors.container};
`;

const ListTable = styled.table`
  display: flex;
  flex-direction: column;
  padding: 3vh 5vw 1vh 5vw;
  background-color: ${(props) => props.theme.colors.container};
`;

const ListHead = styled.thead``;

const ListBody = styled.tbody``;

const ListRow = styled.tr`
  display: flex;
  flex-direction: row;
`;

const Item = styled.td`
  height: 22px;
  margin: 2px;
  padding: 18px;
  padding-bottom: 19px;
  font-size: 17px;
  font-weight: bold;
  border-radius: 5px;
  color: ${(props) => props.theme.colors.default};
  background-color: ${(props) => props.theme.colors.background};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const HeadItem = styled.th`
  margin: 2px;
  padding: 18px;
  font-size: 17px;
  font-weight: bold;
  text-align: center;
  color: ${(props) => props.theme.colors.default};
`;

const Title = styled(Item)`
  min-width: 15vh;
  flex: 1;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.colors.btnhover};
  }
`;

const AuthList = styled(Item)`
  min-width: 100px;
  width: 20vw;
`;

const EndDate = styled(Item)`
  min-width: 150px;
  width: 13vw;
  text-align: center;

  @media screen and (max-width: 900px) {
    display: none;
  }
`;

const HeadTitle = styled(HeadItem)`
  min-width: 15vh;
  flex: 1;
`;

const HeadAuthList = styled(HeadItem)`
  min-width: 100px;
  width: 20vw;
`;

const HeadEndDate = styled(HeadItem)`
  min-width: 150px;
  width: 13vw;

  @media screen and (max-width: 900px) {
    display: none;
  }
`;

const Notification = styled.div`
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

export default function SurveyListPage() {
  const [theme, toggleTheme] = useTheme();
  const [surveys, setSurveys] = useState<SurveyAbstractResponse[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [enterModalOpen, setEnterModalOpen] = useState<boolean>(false);
  const [selectedSurveyIndex, setSelectedSurveyIndex] = useState<number>(0);
  const [abortController, setAbortController] = useState<AbortController>(new AbortController());
  const navigate = useNavigate();

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
        totalSurveys: 80,
        totalPages: 10,
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

  const handleButtonClick = (index: number) => {
    setSelectedSurveyIndex(index);
    setEnterModalOpen(true);
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

  // After get data from api server
  if (!isLoading) {
    if (surveys.length === 0) {
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
        <ListTable theme={theme}>
          <ListHead>
            <ListRow>
              <HeadTitle theme={theme}>설문 제목</HeadTitle>
              <HeadAuthList theme={theme}>필수인증</HeadAuthList>
              <HeadEndDate theme={theme}>설문 종료일</HeadEndDate>
            </ListRow>
          </ListHead>

          <ListBody>
            {surveys.map((survey: SurveyAbstractResponse, index: number) => (
              <ListRow key={survey.surveyId} theme={theme}>
                <Title role="button" onClick={() => handleButtonClick(index)} theme={theme}>
                  {survey.title}
                </Title>
                <AuthList theme={theme}>
                  {survey.certificationTypes.length === 0
                    ? CertificationList({ label: '', iconOption: true })
                    : survey.certificationTypes.map((label) =>
                        CertificationList({ label: CertificationType[label], iconOption: true })
                      )}
                </AuthList>
                <EndDate theme={theme}>{`${survey.endedDate}`}</EndDate>
              </ListRow>
            ))}
          </ListBody>
        </ListTable>

        <Pagination currentPage={page} numOfTotalPage={13} numOfPageToShow={5} setPage={setPage} theme={theme} />
        <RectangleButton
          text="설문 만들기"
          width="150px"
          backgroundColor={theme.colors.button}
          hoverColor={theme.colors.prhover}
          handleClick={() => navigate('/survey/form')}
          theme={theme}
        />

        {enterModalOpen && (
          <SurveyPreviewModal
            surveyItem={surveys[selectedSurveyIndex]}
            setEnterModalOpen={setEnterModalOpen}
            theme={theme}
          />
        )}
      </Container>
    );
  }
  // Before get data from api server
  return (
    <Container theme={theme}>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <SurveyListSkeleton numOfSurveyRow={8} theme={theme} />
    </Container>
  );
}
