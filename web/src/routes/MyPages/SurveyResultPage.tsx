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
  transition: transform 0.2s ease-in-out;
`;

const ChartImage = styled(Icons.CHART)`
  margin-right: auto;
  width: 100vw;
  height: 100%;
  border-radius: 20px;
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
  z-index: 1;
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
  width: 100%;
  align-items: center;
  border: ${(props) => props.theme.borderResultList};
  border-radius: ${(props) => props.theme.borderRadius};
  background-color: ${(props) => props.theme.colors.opposite};
  box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.4);
  pointer-events: none;
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
  const [resultClickFirst, setResultClickFirst] = useState<boolean>(false);
  const [resultClickSecond, setResultClickSecond] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const handleClick = (ClickNumber: number) => {
    if (ClickNumber === 1) {
      setResultClickFirst(!resultClickFirst);
    } else if (ClickNumber === 2) {
      setResultClickSecond(!resultClickSecond);
    }
  };

  return (
    <Container theme={theme}>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <SurveyResultContainer theme={theme}>
        <Form onSubmit={handleSubmit}>
          <SurVeyResultPageTitle style={{ marginBottom: '5vh' }} theme={theme} onClick={() => navigate('../mypage')}>
            마이페이지 &gt; 설문 결과 조회
          </SurVeyResultPageTitle>

          <ListBoxContainer theme={theme}>
            <ListBox
              theme={theme}
              onClick={() => handleClick(1)}
              style={{
                zIndex: resultClickFirst ? 1 : 'auto',
              }}
            >
              <FontText theme={theme}>test1</FontText>
              <TwoArrow style={{ transform: resultClickFirst ? 'rotate(90deg)' : 'rotate(0deg)' }} />
            </ListBox>
            <ResultBox
              style={{
                marginTop: '1.5vh',
                opacity: resultClickFirst ? 1 : 0,
                transition: 'opacity 0.4s ease-in-out',
                position: 'absolute',
                top: '100%',
                zIndex: resultClickFirst ? 1 : -1,
              }}
              theme={theme}
            >
              <ChartImage />
            </ResultBox>
          </ListBoxContainer>

          <ListBoxContainer theme={theme}>
            <ListBox
              theme={theme}
              style={{
                cursor: resultClickFirst ? 'auto' : 'pointer',
              }}
              onClick={!resultClickFirst ? () => handleClick(2) : undefined}
            >
              <FontText theme={theme}>test2</FontText>
              <TwoArrow theme={theme} style={{ transform: resultClickSecond ? 'rotate(90deg)' : 'rotate(0deg)' }} />
            </ListBox>
            <ResultBox
              style={{
                marginTop: '1.5vh',
                opacity: resultClickSecond ? 1 : 0,
                transition: 'opacity 0.4s ease-in-out',
                position: 'absolute',
                top: '100%',
                zIndex: resultClickSecond ? 1 : -1,
              }}
              theme={theme}
            >
              <ChartImage theme={theme} />
            </ResultBox>
          </ListBoxContainer>
        </Form>
      </SurveyResultContainer>
    </Container>
  );
}
