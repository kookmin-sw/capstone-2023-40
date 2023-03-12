interface ApiRequests {
  fetchSurveyList: string;
}
const requests: ApiRequests = {
  fetchSurveyList: '/api/v1/survey-lists',
};

export default requests;
