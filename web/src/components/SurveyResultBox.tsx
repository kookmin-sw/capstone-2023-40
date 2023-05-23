import React, { useState } from 'react';

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled, { DefaultTheme } from 'styled-components';

import { Icons } from '../assets/svg/index';
import { ChartData } from '../types/response/Survey';

const ChartImage = styled(Icons.CHART)`
  margin-right: auto;
  width: 100vw;
  height: 100%;
  border-radius: 20px;
`;

const SurveyResultContainer = styled.div`
  width: 10vw;
  height: 10vh;
  border-radius: ${(props) => props.theme.borderRadius};
  background-color: ${(props) => props.theme.colors.container};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const SurveyResultTitle = styled.span`
  text-align: left;
  font-size: 5vh;
  font-weight: 900;
  color: ${(props) => props.theme.colors.default};
`;

const FontText = styled.span`
  margin-top: 5px;
  text-align: left;
  font-size: 1.3vh;
  font-weight: 600;
  color: ${(props) => props.theme.colors.default};
`;

interface SurveyResultProps {
  theme: DefaultTheme;
}

export default function SurveyResultBox({ theme }: SurveyResultProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [surveyTitle, setSurveyTitle] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };
  const updateSurveyResult = (data: any) => {
    setSurveyTitle(data.results.toString());
  };

  return (
    <SurveyResultContainer theme={theme}>
      <Form onSubmit={handleSubmit}>
        <ChartImage />
      </Form>
    </SurveyResultContainer>
  );
}
