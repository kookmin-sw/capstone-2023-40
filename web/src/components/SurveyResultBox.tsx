import React, { useState } from 'react';

import { Chart, ChartData, ChartOptions } from 'chart.js';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled, { DefaultTheme } from 'styled-components';

import { Icons } from '../assets/svg/index';
import { SurveyResultData } from '../types/response/Survey';

const ChartImage = styled(Icons.CHART)`
  margin-right: auto;
  width: 30vw;
  height: 100%;
  border-radius: 20px;
`;

const SurveyResultContainer = styled.div`
  width: 10vw;
  height: 10vh;
  border-radius: ${(props) => props.theme.borderRadius};
  background-color: ${(props) => props.theme.colors.opposite};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

interface SurveyResultProps {
  theme: DefaultTheme;
}



const dataset = {
  label: [''],
  data: [0],
  backgroundColor: [''],
}

const chartData: ChartData = {
  labels: [''],
  datasets: dataset,
};

export const addSurveyData = (surveyData: SurveyResultData[]) => {
  const resultOption = [''];
  const resultOptionData = [0];
  
  surveyData.forEach((result, index) => {
    chartData.labels?.push(result.questionTitle); // 라벨(질문 제목) 추가

    resultOption.push(result.optionAnswers[index].option);
    resultOptionData.push(result.optionAnswers[index].totalResponseCount);
  });

  const dataset: ChartDataset<keyof ChartTypeRegistry, (number | Point | [number, number] | BubbleDataPoint | null)[]> = {
    label: resultOption,
    data: resultOptionData,
    backgroundColor: 'rgba(75, 192, 192, 0.5)',
  };

  chartData.datasets.push(dataset); // 데이터셋에 추가
};

// 차트 옵션 설정
const chartOptions: ChartOptions = {
  responsive: true,
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

// Chart.js를 사용하여 차트 생성
const chart = new Chart('chartContainer', {
  type: 'bar',
  data: chartData,
  options: chartOptions,
});

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
      <Form onSubmit={handleSubmit} theme={theme}>
        <ChartImage />
      </Form>
    </SurveyResultContainer>
  );
}
