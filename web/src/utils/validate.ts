import { AnsweredQuestion } from '../types/request';
import { QuestionType } from '../types/request/Question';
import { SurveyCreateRequest } from '../types/request/Survey';
import { QuestionBankResponse } from '../types/response/QuestionBank';
import { ValidationErrorMessage, InputCheckResult } from '../types/userInputCheck';

/**
 * Check if input text is empty string.
 *
 * @param {string} text String type text
 * @returns {boolean} Result of checking empty string
 */
export const isEmptyString = (text: string): boolean => {
  return text === '';
};

/**
 * Check if input text is empty string.
 *
 * @param {Array<T>} arr Generic type array
 * @returns {boolean} Result of checking empty list
 */
export const isEmptyArray = <T>(arr: Array<T>): boolean => {
  return arr.length === 0;
};

/**
 * Validate email format.
 *
 * @param {string} email Email text
 * @returns {boolean} Result of validation
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return emailRegex.test(email);
};

/**
 * Validate password format. It **should contain** numeric string with Capital letter
 * and special character included.
 * From minimum 8 to maximum 25 characters.
 *
 * @param {string} password Password text
 * @returns {boolean} Result of validation
 */
export const validatePassword = (password: string): boolean => {
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
  return passwordRegex.test(password);
};

/**
 * Validate phone number format. It **should match** E.164 format.
 * See {@Link https://en.wikipedia.org/wiki/E.164}
 *
 * @param {string} phoneNumber Phone number text
 * @returns {boolean} Result of validation
 */
export const validatePhoneNumber = (phoneNumber: string): boolean => {
  const phoneRegex = /^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/;
  return phoneRegex.test(phoneNumber);
};

/**
 * Validate start date is same or later than current date
 *
 * @param {Date} startDate Start date
 * @param {Date} currentDate Current date
 * @returns {boolean} Result of validation
 */
export const validateStartDate = (startDate: Date, currentDate: Date): boolean => {
  const dateDiff = startDate.getTime() - currentDate.getTime();

  if (dateDiff < 0) return false;

  return true;
};

/**
 * Validate end date is least 1 minute later than start date
 *
 * @param {Date} startDate Start date
 * @param {Date} endDate End date
 * @param {number} minPeriod Minimum survey period by minutes
 * @returns {boolean} Result of validation
 */
export const validateEndDate = (startDate: Date, endDate: Date, minPeriod: number): boolean => {
  const dateDiff = endDate.getTime() - startDate.getTime();

  if (dateDiff <= 0) return false;

  if (dateDiff < 60000 * minPeriod) return false;

  return true;
};

/**
 * Validate survey data
 * 1) Check all inputs are filled
 * 2) Validate start date
 * 3) Validate end date
 * 4) Check survey contain at least 1 question
 * 5) Check selective question contain at least 1 option
 *
 * @param {SurveyCreateRequest} surveyData Survey data
 * @returns {InputCheckResult} Validate result message and error question index(-1 means SurveyDataForm)
 */
export const validateSurveyData = (surveyData: SurveyCreateRequest): InputCheckResult => {
  const errorIndex = -1;
  const currentDate = new Date();
  const startedDate = surveyData.startedDate !== '' ? new Date(surveyData.startedDate) : null;
  const endedDate = surveyData.endedDate !== '' ? new Date(surveyData.endedDate) : null;

  // Check survey title and description is not empty
  if (isEmptyString(surveyData.title) || isEmptyString(surveyData.description)) {
    return {
      message: ValidationErrorMessage.EMPTY_INPUT,
      index: errorIndex,
    };
  }

  // Check survey date is not empty and valid
  if (startedDate !== null && endedDate !== null) {
    if (!validateStartDate(startedDate, currentDate)) {
      return {
        message: ValidationErrorMessage.EARLY_START,
        index: errorIndex,
      };
    }
    if (!validateEndDate(startedDate, endedDate, 1)) {
      return {
        message: ValidationErrorMessage.EARLY_END,
        index: errorIndex,
      };
    }
  } else {
    return {
      message: ValidationErrorMessage.EMPTY_INPUT,
      index: errorIndex,
    };
  }

  const { questions } = surveyData;

  // Check survey has least 1 question
  if (isEmptyArray(questions)) {
    return {
      message: ValidationErrorMessage.NO_QUESTION,
      index: errorIndex,
    };
  }

  // Check each questions
  for (let i = 0; i < surveyData.questions.length; i += 1) {
    // Check question title and description is not empty
    if (isEmptyString(questions[i].title) || isEmptyString(questions[i].description)) {
      return {
        message: ValidationErrorMessage.EMPTY_INPUT,
        index: i,
      };
    }

    if (
      questions[i].questionType === QuestionType.SINGLE_CHOICE ||
      questions[i].questionType === QuestionType.MULTIPLE_CHOICES
    ) {
      const options = questions[i].questionOptions;

      // Check selective question has least 1 option
      if (typeof options === 'undefined' || isEmptyArray(options)) {
        return {
          message: ValidationErrorMessage.NO_OPTION,
          index: i,
        };
      }

      // Check selective question option is not empty
      for (let j = 0; j < options.length; j += 1) {
        if (isEmptyString(options[j].option)) {
          return {
            message: ValidationErrorMessage.EMPTY_INPUT,
            index: i,
          };
        }
      }
    }
  }

  return {
    message: ValidationErrorMessage.OK,
    index: errorIndex,
  };
};

/**
 * 한개의 질문에 대한 답변을 검증
 * 1) 답변이 아직 'undefined'일 경우 질문의 'isRequired' 옵션에 따라 리턴
 * 2) 필수로 응답할 필요 없는 질문의 경우 기본적으로 'true'
 * 2-1) 'LONG_ANSWER'의 경우는 글자수가 10이 넘는지 확인
 * 3) 필수 응답 질문의 경우 답변이 비어있으면 'false'
 * 3-1) 'LONG_ANSWER'의 경우는 글자수가 10이 넘는지 확인
 *
 * @param {AnsweredQuestion} answer
 * @param {QuestionBankResponse} question
 * @returns {boolean}
 */
export const validateSurveyAnswer = (answer: AnsweredQuestion, question: QuestionBankResponse): boolean => {
  if (typeof answer === 'undefined') {
    return !question.isRequired;
  }

  let tmpQuestionType: number | string;
  if (typeof answer.questionType === 'undefined') {
    tmpQuestionType = -1;
  } else if (typeof answer.questionType === 'string') {
    tmpQuestionType = QuestionType[answer.questionType];
  } else {
    tmpQuestionType = answer.questionType;
  }

  // 필수로 응답해야 하는 질문이 아닌 경우
  if (!answer.isRequired) {
    if (tmpQuestionType === QuestionType.LONG_ANSWER) {
      if (answer.longAnswer?.trim() !== '' && answer.longAnswer!.trim().length < 10) return false;
    }
    return true;
  }

  // 필수로 응답해야 하는 질문일 경우
  switch (tmpQuestionType) {
    case QuestionType.MULTIPLE_CHOICES:
      if (answer.multipleChoices?.length === 0) return false;
      break;
    case QuestionType.SINGLE_CHOICE:
      if (typeof answer.singleChoice === 'undefined') return false;
      break;
    case QuestionType.LONG_ANSWER:
      if (answer.longAnswer!.trim().length < 10) return false;
      break;
    case QuestionType.SHORT_ANSWER:
      if (answer.shortAnswer?.trim() === '') return false;
      break;
    default:
      break;
  }

  return true;
};
