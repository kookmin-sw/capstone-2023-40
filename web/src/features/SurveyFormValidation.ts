import { QuestionType } from '../types/request/Question';
import { SurveyCreateRequest } from '../types/request/Survey';
import { ValidationErrorMessage, InputCheckResult } from '../types/userInputCheck';

const isFutureAndPast = (future: Date, past: Date): boolean => {
  const dateDiff = future.getTime() - past.getTime();

  if (dateDiff <= -60000) {
    return false;
  }
  return true;
};

export default function SurveyFormValidation(surveyData: SurveyCreateRequest): InputCheckResult {
  const errorIndex = -1;
  const currentDate = new Date();
  const startedDate = surveyData.startedDate !== '' ? new Date(surveyData.startedDate) : null;
  const endedDate = surveyData.endedDate !== '' ? new Date(surveyData.endedDate) : null;

  // Check survey title and description is empty
  if (surveyData.title.length === 0 || surveyData.description.length === 0) {
    return {
      message: ValidationErrorMessage.EMPTY_INPUT,
      index: errorIndex,
    };
  }

  // Check survey date is empty and valid
  if (startedDate !== null && endedDate !== null) {
    if (!isFutureAndPast(startedDate, currentDate)) {
      return {
        message: ValidationErrorMessage.EARLY_START,
        index: errorIndex,
      };
    }
    if (endedDate <= startedDate) {
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

  // Check survey has least 1 question
  if (surveyData.questions.length === 0) {
    return {
      message: ValidationErrorMessage.NO_QUESTION,
      index: errorIndex,
    };
  }

  // Check each questions
  for (let i = 0; i < surveyData.questions.length; i += 1) {
    // Check question title and description is empty
    if (surveyData.questions[i].title.length === 0 || surveyData.questions[i].description.length === 0) {
      return {
        message: ValidationErrorMessage.EMPTY_INPUT,
        index: i,
      };
    }

    // Check selective question has least 1 option
    if (
      surveyData.questions[i].questionType === QuestionType.SINGLE_CHOICE ||
      surveyData.questions[i].questionType === QuestionType.MULTIPLE_CHOICE
    ) {
      if (
        typeof surveyData.questions[i].questionOptions === 'undefined' ||
        surveyData.questions[i].questionOptions?.length === 0
      ) {
        return {
          message: ValidationErrorMessage.NO_OPTION,
          index: i,
        };
      }
    }
  }

  return {
    message: ValidationErrorMessage.OK,
    index: errorIndex,
  };
}
