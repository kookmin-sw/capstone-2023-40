import React from 'react';

import styled from 'styled-components';

import AlertModal from '../../components/AlertModal';
import Header from '../../components/Header';
import { useTheme } from '../../hooks/useTheme';

const Container = styled.div``;

export default function SurveyLoginRequiredPage() {
  const [theme, toggleTheme] = useTheme();

  return (
    <Container>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <AlertModal
        theme={theme}
        title="해당 설문에 참여하기 위해서는 아래의 인증이 필요합니다."
        level="INFO"
        text="설문 목록으로 돌아가기"
      />
    </Container>
  );
}
