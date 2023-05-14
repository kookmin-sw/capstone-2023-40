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
  box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.4);
  pointer-events: none;
  margin-top: 1.5vh;
  transition: opacity 0.4s ease-in-out;
  position: absolute;
  top: 100%;
  border: ${(props) => props.theme.borderResultList};
  border-radius: ${(props) => props.theme.borderRadius};
  background-color: ${(props) => props.theme.colors.opposite};
`;

const Form = styled.form`
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

export default function MyPage() {
  const [theme, toggleTheme] = useTheme();
  const [resultClickFirst, setResultClickFirst] = useState<boolean>(false);
  const [resultClickSecond, setResultClickSecond] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const handleClick = (ClickNumber: number) => {
    if (ClickNumber === 1 && !resultClickSecond) {
      setResultClickFirst(!resultClickFirst);
    } else if (ClickNumber === 2 && !resultClickFirst) {
      setResultClickSecond(!resultClickSecond);
    }
  };

  const resultList = [
    { id: 1, title: 'test1', resultClick: resultClickFirst },
    { id: 2, title: 'test2', resultClick: resultClickSecond },
  ];

  return (
    <Container theme={theme}>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <SurveyResultContainer theme={theme}>
        <Form onSubmit={handleSubmit}>
          <SurVeyResultPageTitle style={{ marginBottom: '5vh' }} theme={theme}>
            <MypageText theme={theme} onClick={() => navigate('../mypage')}>
              마이페이지
            </MypageText>
            <SurveyResultText theme={theme}> &gt; 설문 결과 조회</SurveyResultText>
          </SurVeyResultPageTitle>
          {resultList.map((item) => (
            <ListBoxContainer key={item.id} theme={theme}>
              <ListBox theme={theme} onClick={() => handleClick(item.id)}>
                <FontText theme={theme}>{item.title}</FontText>
                <TwoArrow style={{ transform: item.resultClick ? 'rotate(90deg)' : 'rotate(0deg)' }} />
              </ListBox>

              <ResultBox
                theme={theme}
                style={{
                  opacity: item.resultClick ? 1 : 0,
                  zIndex: item.resultClick ? 1 : -1,
                }}
              >
                <ChartImage />
              </ResultBox>
            </ListBoxContainer>
          ))}
        </Form>
      </SurveyResultContainer>
    </Container>
  );
}
