import React from 'react';

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import styled, { DefaultTheme } from 'styled-components';

import { setLoggedIn } from '../types/header';
import { updateUserInformation } from '../utils/UserUtils';
import RectangleButton from './Button/RectangleButton';
import Header from './Header';

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

const ErrorContainer = styled.div`
  padding: 5vw;
  min-width: 40vh;
  height: 80vh;
  flex-direction: column;
  background-color: ${(props) => props.theme.colors.container};
`;

const ErrorPageTitle = styled.div`
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

interface ErrorPageProps {
  labelText: string;
  buttonText: string;
  navigateRoute: string;
  theme: DefaultTheme;
  toggleTheme: () => void;
}

export default function ErrorPage({ labelText, buttonText, navigateRoute, theme, toggleTheme }: ErrorPageProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = () => {
    if (labelText === '로그인이 만료 되었어요.') {
      dispatch(setLoggedIn(false));
    }
    navigate(`${navigateRoute}`);
  };

  return (
    <Container theme={theme}>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <ErrorContainer theme={theme}>
        {labelText === '😥 앗! 아직 설문을 만들지 않았어요.' && (
          <ErrorPageTitle style={{ marginBottom: '5vh' }} theme={theme}>
            <MypageText theme={theme} onClick={() => updateUserInformation(dispatch, navigate)}>
              마이페이지
            </MypageText>
            <SurveyResultText theme={theme}> &gt; 설문 결과 조회</SurveyResultText>
          </ErrorPageTitle>
        )}
        <Notification theme={theme}>
          <Label theme={theme}>{labelText}</Label>
          <br />
          <RectangleButton
            text={buttonText}
            textColor="white"
            width="250px"
            backgroundColor={theme.colors.primary}
            hoverColor={theme.colors.prhover}
            handleClick={handleClick}
            theme={theme}
          />
        </Notification>
      </ErrorContainer>
    </Container>
  );
}
