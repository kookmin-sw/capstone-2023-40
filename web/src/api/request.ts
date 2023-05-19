import * as types from '../types/request';

/**
 * Declare API request snippets. This should follow
 * {@link https://api.thesurvey.kr/vi/swagger-ui/index.html}
 */
export const requests = {
  /**
   * Register a new user.
   *
   * @method `POST`
   * @endpoint `/auth/register`
   * @body {@link types.UserRegisterRequest} - The user information to register.
   */
  register: '/auth/register',
  /**
   * Sign in with email and password.
   *
   * @method `POST`
   * @endpoint `/auth/login`
   * @body {@link types.UserLoginRequest} - The email address and password of user to sign in.
   */
  login: '/auth/login',
  /**
   * Sign out from currently signed in user. This will remove JSESSIONID from
   * API Server.
   *
   * @method `GET`
   * @endpoint `/auth/logout`
   */
  logout: '/auth/logout',
  /**
   * Get profile information of currently signed in user. This requires user
   * to be signed in.
   *
   * @method `GET`
   * @endpoint `/users/profile`
   */
  getUserProfile: '/users/profile',
  /**
   * Update profile information of currently signed in user. This requires user
   * to be signed in.
   *
   * @method `PATCH`
   * @endpoint `/users/profile`
   * @body {@link types.UserUpdateRequest} - The user information to update.
   */
  updateUserProfile: '/users/profile',
  /**
   * Get Profile information of user certification list
   *
   * @method `GET`
   * @endpoint `/users/profile/certifications`
   */
  getUserAuthList: '/users/profile/certifications',
  /**
   * Update profile information of user certification list
   *
   * @method `PATCH`
   * @endpoint `/users/profile/certifications`
   */
  updateUserAuthList: '/users/profile/certifications',
  /**
   * Delete currently signed in user. This requires user
   * to be signed in.
   *
   * @method `DELETE`
   * @endpoint `/users`
   */
  deleteUser: '/users',
  /**
   * Get paginated survey list. This requires user to be signed in.
   * You can set `pageNum` from 1(default). Page list size is fixed to 8.
   *
   * @method `GET`
   * @endpoint `/surveys?page={pageNum}`
   */
  getSurveyPage: '/surveys?page=',
  /**
   * Get each survey. This requires user to be signed in.
   *
   * @method `GET`
   * @endpoint `/surveys/{pageNum}`
   */
  getSurvey: '/surveys/',
  /**
   * Create a new survey with questions. This requires user to be signed in.
   *
   * @method `POST`
   * @endpoint `/surveys`
   * @body {@link types.SurveyCreateRequest} - The survey information to create.
   */
  createSurvey: '/surveys',
  /**
   * Update the survey of `surveyId`. This requires user to be signed in
   * and the author of `surveyId` should match with the requested `userId`.
   *
   * @method `PATCH`
   * @endpoint `/surveys/:surveyId`
   * @body {@link types.SurveyUpdateRequest} - The survey information to update.
   */
  updateSurvey: '/surveys/',
  /**
   * Delete the survey of `surveyId`. This requires user to be signed in
   * and the author of `surveyId` should match with the requested `userId`.
   *
   * @method `DELETE`
   * @endpoint `/surveys/:surveyId`
   */
  deleteSurvey: '/surveys/',
  /**
   * Submit answer of the survey of `surveyId`. This requires user to be signed in.
   *
   * @method `POST`
   * @endpoint `/surveys/:surveyId`
   * @body {@link types.SurveySubmitRequest} - The survey information to submit.
   */
  submitSurvey: '/surveys/submit/',
};
