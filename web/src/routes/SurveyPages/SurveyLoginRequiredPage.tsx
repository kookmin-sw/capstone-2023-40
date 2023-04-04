import React from 'react';

import styled from 'styled-components';

import Header from '../../components/Header';
import RequiredAuthModal from '../../components/Modal/RequiredAuthModal';
import { useTheme } from '../../hooks/useTheme';

const Container = styled.div``;

export default function SurveyLoginRequiredPage() {
  const [theme, toggleTheme] = useTheme();

  return (
    <Container>
      <Header theme={theme} toggleTheme={toggleTheme} />
    </Container>
  );
}
