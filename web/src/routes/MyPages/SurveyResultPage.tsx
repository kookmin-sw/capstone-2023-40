import React, { useEffect, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import axios from '../../api/axios';
import { fetchSurveyResultList } from '../../api/fetchFunctions';
import { requests } from '../../api/request';
import { Icons } from '../../assets/svg/index';
import ErrorPage from '../../components/ErrorPage';
import Header from '../../components/Header';
import LoadingForm from '../../components/LoadingForm';
import SurveyResultBox from '../../components/SurveyResultBox';
import { useTheme } from '../../hooks/useTheme';
import { SurveyResultData, SurveyResultListResponse, SurveyResultResponse } from '../../types/response/Survey';
import { updateUserInformation } from '../../utils/UserUtils';

const TwoArrow = styled(Icons.TWOARROW).attrs({
  width: 24,
  height: 24,
})`
  margin-left: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  padding: 1.5vh;
  border-radius: 30px;
  transition: transform 0.2s ease-in-out;
`;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${(props) => props.theme.colors.container};
`;

const ListBoxContainer = styled.div`
  position: relative;
  margin-bottom: 1vh;
  background-color: ${(props) => props.theme.colors.container};
  border: ${(props) => props.theme.borderResultList};
  border-radius: ${(props) => props.theme.borderRadius};
  background-color: ${(props) => props.theme.colors.opposite};
`;

const SurveyResultContainer = styled.div`
  padding: 5vw;
  min-width: 40vh;
  height: 80vh;
  background-color: ${(props) => props.theme.colors.container};
`;

const ListBox = styled.div`
  z-index: 1;
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  border: ${(props) => props.theme.borderResultList};
  border-radius: ${(props) => props.theme.borderRadius};
  background-color: ${(props) => props.theme.colors.opposite};
  box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.4);
  cursor: pointer;
`;

const ResultBox = styled.div`
  height: 40vh;
  width: 91%;
  max-width: 91%;
  flex-direction: row;
  align-items: center;
  box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.4);
  pointer-events: none;
  margin-top: 1.5vh;
  transition: opacity 0.4s ease-in-out;
  position: absolute;
  padding: 4vw;
  top: 100%;
  border: ${(props) => props.theme.borderResultList};
  border-radius: ${(props) => props.theme.borderRadius};
  background-color: ${(props) => props.theme.colors.opposite};
`;

const SurveyForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const SurVeyResultPageTitle = styled.div`
  flex-direction: row;
  margin-bottom: 2vh;
`;

const MypageText = styled.span`
  text-align: left;
  font-size: calc(2vh + 2vmin);
  font-weight: 900;
  color: ${(props) => props.theme.colors.default};
  cursor: pointer;
`;

const SurveyResultText = styled.span`
  text-align: left;
  font-size: calc(2vh + 2vmin);
  font-weight: 900;
  color: ${(props) => props.theme.colors.default};
`;

const FontText = styled.span`
  text-align: left;
  font-size: calc(1vh + 1.4vmin);
  font-weight: 900;
  margin-left: 3vw;
  min-width: 80px;
  max-width: 100vw;
  width: 100%;
  color: ${(props) => props.theme.colors.default};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export default function SurveyResultPage() {
  const [theme, toggleTheme] = useTheme();
  const [isSurveyResultClicked, setIsSurveyResultClicked] = useState([false]);
  const [isEmptySurveyResult, setIsEmptySurveyResult] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const handleClick = async (item: SurveyResultListResponse, index: number) => {
    setIsSurveyResultClicked((state) => ({
      ...state,
      [index]: !state[index],
    }));
    axios
      .get<SurveyResultResponse>(`${requests.getSurveyResultData}${item.surveyId}`)
      .then((res) => {
        if (res.status === 200 && res.data.results !== undefined) {
          const resultData: SurveyResultData[] = res.data.results;
        } else {
          setIsEmptySurveyResult(true);
        }
      })
      .catch((error) => {
        console.log(error.requests.status);
      });
  };

  const { data, isLoading, isError, error } = useQuery<SurveyResultListResponse[]>(
    ['SurveyResultList'],
    fetchSurveyResultList,
    {
      cacheTime: 5 * 60 * 1000, // 5 minutes
      staleTime: 20 * 1000, // 20 seconds
      retry: 1,
      refetchOnWindowFocus: false,
    }
  );

  if (isLoading) {
    return <LoadingForm />;
  }

  if (isError || data === undefined || data.length === 0) {
    return (
      <ErrorPage
        labelText="앗! 아직 설문을 만들지 않았어요."
        buttonText="설문 만들러 가기"
        navigateRoute="/survey/form"
        theme={theme}
        toggleTheme={toggleTheme}
      />
    );
  }

  if (isEmptySurveyResult) {
    return (
      <ErrorPage
        labelText="😥 앗! 아직 설문결과가 없어요."
        buttonText="뒤로 가기"
        navigateRoute="../mypage/survey-result/:id"
        theme={theme}
        toggleTheme={toggleTheme}
      />
    );
  }

  return (
    <Container theme={theme}>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <SurveyResultContainer theme={theme}>
        <SurveyForm onSubmit={handleSubmit}>
          <SurVeyResultPageTitle style={{ marginBottom: '5vh' }} theme={theme}>
            <MypageText theme={theme} onClick={() => updateUserInformation(dispatch, navigate)}>
              마이페이지
            </MypageText>
            <SurveyResultText theme={theme}> &gt; 설문 결과 조회</SurveyResultText>
          </SurVeyResultPageTitle>
          {data?.map((item, index) => (
            <ListBoxContainer key={item.surveyId} theme={theme}>
              <ListBox theme={theme} onClick={() => handleClick(item, index)}>
                <FontText theme={theme}>{item.title}</FontText>
                <TwoArrow
                  style={{
                    transform: isSurveyResultClicked[index] ? 'rotate(90deg)' : 'rotate(0deg)',
                  }}
                />
              </ListBox>

              <ResultBox
                theme={theme}
                style={{
                  opacity: isSurveyResultClicked[index] ? 1 : 0,
                  zIndex: isSurveyResultClicked[index] ? 1 : -1,
                }}
              >
                <SurveyResultBox theme={theme} />
              </ResultBox>
            </ListBoxContainer>
          ))}
        </SurveyForm>
      </SurveyResultContainer>
    </Container>
  );
}
