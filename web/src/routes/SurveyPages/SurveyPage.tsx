import React from 'react';

import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import Header from '../../components/Header';
import SurveyParticipateForm from '../../components/SurveyParticipateForm/SurveyParticipateForm';
import { useTheme } from '../../hooks/useTheme';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${(props) => props.theme.colors.container};
`;

// TODO: disable submit button after click
export default function SurveyPage() {
  const { id } = useParams();
  const [theme, toggleTheme] = useTheme();

  return (
    <Container theme={theme}>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <SurveyParticipateForm surveyId={id || ''} theme={theme} />
    </Container>
  );
}
