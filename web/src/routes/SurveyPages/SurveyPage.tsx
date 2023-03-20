import React, { useState, useEffect } from 'react';

import { AxiosResponse, AxiosError } from 'axios';
import { useParams } from 'react-router-dom';

import axios from '../../api/axios';
import requests from '../../api/request';

interface QuestionOption {
  option_number: number;
  text: string;
}

interface SurveyQuestion {
  question_id: number;
  type: string;
  title: string;
  description: string;
  options: Array<QuestionOption>;
}

interface SurveyData {
  survey_id: string;
  author: number;
  title: string;
  description: string;
  created_date: string;
  ended_date: string;
  required_authentications: Array<string>;
  questions: Array<SurveyQuestion>;
}
// TODO: over ended date while participant survey
export default function SurveyPage() {
  const { id } = useParams();
  const [surveyData, setSurveyData] = useState<SurveyData>();

  const fetchSurveyData = async () => {
    try {
      const request: AxiosResponse<SurveyData> = await axios.get<SurveyData>(requests.fetchSurvey + id);
      setSurveyData(request.data);
    } catch (error) {
      const { name } = error as unknown as AxiosError;
    }
  };

  useEffect(() => {
    fetchSurveyData();
  }, []);
  return (
    <div>
      <h1>{`${surveyData}`}</h1>
    </div>
  );
}
