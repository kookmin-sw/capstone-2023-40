import React from 'react';

import styled from 'styled-components';

import Header from '../../components/Header';
import SurveyCreateForm from '../../components/SurveyCreateForm/SurveyCreateForm';
import { useTheme } from '../../hooks/useTheme';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${(props) => props.theme.colors.background};
`;

const TitleContainer = styled.div`
  padding: 3vh 8vw 0vh 8vw;
`;

const Title = styled.span`
  font-size: 30px;
  font-weight: 600;
  color: ${(props) => props.theme.colors.default};
`;

// TODO: Drag and drop questions order
export default function SurveyFormPage() {
  const [theme, toggleTheme] = useTheme();

  return (
    <Container theme={theme}>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <TitleContainer theme={theme}>
        <Title theme={theme}>설문조사 작성</Title>
      </TitleContainer>
      <SurveyCreateForm theme={theme} />
    </Container>
  );
}
