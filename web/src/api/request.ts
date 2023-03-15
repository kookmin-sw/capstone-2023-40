interface ApiRequests {
  healtCheck: string;
  fetchSurveyListAll: string;
  fetchSurvey: string;
  fetchSurveyListPage: string;
}
const requests: ApiRequests = {
  healtCheck: '/',
  fetchSurveyListAll: '/api/survey/all',
  fetchSurvey: '/api/survey/',
  fetchSurveyListPage: '/api/survey?page=',
};

export default requests;
