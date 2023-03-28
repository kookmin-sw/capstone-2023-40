interface ApiRequests {
  healthCheck: string;
  fetchSurveyListAll: string;
  fetchSurvey: string;
  fetchSurveyListPage: string;
  postSurvey: string;
}

const requests: ApiRequests = {
  healthCheck: '/',
  fetchSurveyListAll: '/api/survey/all',
  fetchSurvey: '/api/survey/',
  fetchSurveyListPage: '/api/survey?page=',
  postSurvey: '/api/?????',
};

export default requests;
