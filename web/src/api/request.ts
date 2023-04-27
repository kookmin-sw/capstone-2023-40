import * as types from '../types/request';

/**
 * Declare API request snippets.
 */
export const requests = {
  /**
   * Register a new user.
   *
   * @method `POST`
   * @endpoint `/v1/auth/register`
   * @body {@link types.UserRegisterRequest} - The user information to register.
   */
  register: '/v1/auth/register',
  /**
   * Sign in with email and password.
   *
   * @method `POST`
   * @endpoint `/v1/auth/login`
   * @body {@link types.UserLoginRequest} - The email address and password of user to sign in.
   */
  login: '/v1/auth/login',
  /**
   * Sign out from currently signed in user. This will remove JSESSIONID from
   * API Server.
   *
   * @method `GET`
   * @endpoint `/v1/auth/logout`
   */
  logout: '/v1/auth/logout',
  /**
   * Get profile information of currently signed in user. This requires user
   * to be signed in.
   *
   * @method `GET`
   * @endpoint `/v1/users/profile`
   */
  getUserProfile: '/v1/users/profile',
  /**
   * Update profile information of currently signed in user. This requires user
   * to be signed in.
   *
   * @method `PATCH`
   * @endpoint `/v1/users/profile`
   * @body {@link types.UserUpdateRequest} - The user information to update.
   */
  updateUserProfile: '/v1/users/profile',
  /**
   * Delete currently signed in user. This requires user
   * to be signed in.
   *
   * @method `DELETE`
   * @endpoint `/v1/users`
   */
  deleteUser: '/v1/users',
  /**
   * Get paginated survey list. This requires user to be signed in.
   * You can set `pageNum` from 1(default). Page list size is fixed to 8.
   *
   * @method `GET`
   * @endpoint `/v1/surveys?page={pageNum}`
   */
  getSurvey: '/v1/surveys?page=',
  /**
   * Create a new survey with questions. This requires user to be signed in.
   *
   * @method `POST`
   * @endpoint `/v1/surveys`
   * @body {@link types.SurveyCreateRequest} - The survey information to create.
   */
  createSurvey: '/v1/surveys',
  /**
   * Update the survey of `surveyId`. This requires user to be signed in
   * and the author of `surveyId` should match with the requested `userId`.
   *
   * @method `PATCH`
   * @endpoint `/v1/surveys/:surveyId`
   * @body {@link types.SurveyUpdateRequest} - The survey information to update.
   */
  updateSurvey: '/v1/surveys/',
  /**
   * Delete the survey of `surveyId`. This requires user to be signed in
   * and the author of `surveyId` should match with the requested `userId`.
   *
   * @method `DELETE`
   * @endpoint `/v1/surveys/:surveyId`
   */
  deleteSurvey: '/v1/surveys/',
  /**
   * Submit answer of the survey of `surveyId`. This requires user to be signed in.
   *
   * @method `POST`
   * @endpoint `/v1/surveys/:surveyId`
   * @body {@link types.SurveySubmitRequest} - The survey information to submit.
   */
  submitSurvey: '/v1/surveys/submit/',
};
