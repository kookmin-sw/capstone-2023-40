interface ApiRequests {
  healthCheck: string;
  fetchSurveyListAll: string;
  fetchSurvey: string;
  fetchSurveyListPage: string;
}
const requests: ApiRequests = {
  healthCheck: '/',
  fetchSurveyListAll: '/api/survey/all',
  fetchSurvey: '/api/survey/',
  fetchSurveyListPage: '/api/survey?page=',
};

export default requests;
