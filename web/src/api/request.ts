interface ApiRequests {
  /**
   * Authentication
   */
  register: string;
  login: string;
  /**
   * User
   */
  getUserProfile: string;
  updateUserProfile: string;
  deleteUser: string;
  /**
   * Survey
   */
  getSurvey: string;
  createSurvey: string;
  updateSurvey: string;
  deleteSurvey: string;
  submitSurvey: string;
}

const requests: ApiRequests = {
  /**
   * Authentication
   */
  register: '/api/auth/register',
  login: '/api/auth/login',
  /**
   * User
   */
  getUserProfile: '/api/users',
  updateUserProfile: '/api/users/profile',
  deleteUser: '/api/users',
  /**
   * Survey
   */
  getSurvey: '/api/surveys/',
  createSurvey: '/api/surveys',
  updateSurvey: '/api/surveys/',
  deleteSurvey: '/api/surveys/',
  submitSurvey: '/api/surveys/submit',
};

export default requests;
