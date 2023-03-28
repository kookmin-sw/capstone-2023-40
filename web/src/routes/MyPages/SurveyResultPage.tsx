import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { Icons } from '../../assets/svg/index';
import Header from '../../components/Header';
import { useTheme } from '../../hooks/useTheme';

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
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
`;

const ChartImage = styled(Icons.CHART)`
  width: 100vw;
  height: 100%;
  border-radius: 20px;
`;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${(props) => props.theme.colors.container};
`;

const SurveyResultContainer = styled.div`
  padding: 5vw;
  margin-left: calc(10vh - 5vmin);
  margin-right: calc(10vh - 5vmin);
  margin-top: calc(3vw - 2vmin);
  min-width: 40vh;
  height: 80vh;
  background-color: ${(props) => props.theme.colors.container};
`;

const ListBox = styled.div`
  display: flex;
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
  align-items: center;
  border: ${(props) => props.theme.borderResultList};
  border-radius: ${(props) => props.theme.borderRadius};
  background-color: ${(props) => props.theme.colors.opposite};
  box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.4);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const SurVeyResultPageTitle = styled.span`
  text-align: left;
  font-size: calc(2vh + 2vmin);
  font-weight: 900;
  margin-bottom: 2vh;
  color: ${(props) => props.theme.colors.default};
  cursor: pointer;
`;

const FontText = styled.span`
  text-align: left;
  font-size: calc(1vh + 1.4vmin);
  font-weight: 900;
  margin-left: 3vw;
  min-width: 80px;
  max-width: 20vw;
  width: 140px;
  color: ${(props) => props.theme.colors.default};
`;

export default function MyPage() {
  const [theme, toggleTheme] = useTheme();
  const [resultClick, setResultClick] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const handleClick = () => {
    console.log(resultClick);
    setResultClick(!resultClick);
  };

  return (
    <Container theme={theme}>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <SurveyResultContainer theme={theme}>
        <Form onSubmit={handleSubmit}>
          <SurVeyResultPageTitle style={{ marginBottom: '5vh' }} theme={theme} onClick={() => navigate('../mypage')}>
            마이페이지 &gt; 설문 결과 조회
          </SurVeyResultPageTitle>
          <ListBox theme={theme} onClick={() => handleClick()}>
            <FontText theme={theme}>test</FontText>
            <TwoArrow style={{ transform: resultClick ? 'rotate(90deg)' : 'rotate(0deg)' }} />
          </ListBox>
          <ResultBox
            style={{
              marginTop: '1.5vh',
              opacity: resultClick ? 1 : 0,
              transition: 'opacity 0.4s ease-in-out',
            }}
          >
            <ChartImage />
          </ResultBox>
        </Form>
      </SurveyResultContainer>
    </Container>
  );
}
