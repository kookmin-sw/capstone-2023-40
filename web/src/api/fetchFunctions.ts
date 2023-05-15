import { QueryFunctionContext } from '@tanstack/react-query';

import { SurveyPageResponse, SurveyResponse } from '../types/response/Survey';
import axios from './axios';
import { requests } from './request';

/**
 * Get survey page with axios instance
 *
 * @param {{ queryKey }} ['surveyPage', pageNumber]
 * @returns {Promise<SurveyPageResponse>}
 */
export const fetchSurveyList = async ({ queryKey }: QueryFunctionContext): Promise<SurveyPageResponse> => {
  const { data } = await axios.get<SurveyPageResponse>(`${requests.getSurveyPage}${queryKey[1]}`);

  return data;
};

/**
 * Get each survey data with axios instance
 *
 * @param {{ queryKey }} ['survey', surveyId]
 * @returns {Promise<SurveyResponse>}
 */
export const fetchSurveyData = async ({ queryKey }: QueryFunctionContext): Promise<SurveyResponse> => {
  const { data } = await axios.get<SurveyResponse>(requests.getSurvey + queryKey[1]);

  return data;
};
