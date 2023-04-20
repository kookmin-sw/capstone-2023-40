import { QuestionType } from '../types/request/Question';
import { SurveyCreateRequest } from '../types/request/Survey';
import { ValidationErrorMessage, InputCheckResult } from '../types/userInputCheck';

const validateStartDate = (start: Date, current: Date): boolean => {
  const dateDiff = start.getTime() - current.getTime();

  if (Math.abs(dateDiff) < 60000) {
    if (start.getMinutes() >= current.getMinutes()) return true;
    return false;
  }

  if (dateDiff < 0) return false;

  return true;
};

const validateEndDate = (start: Date, end: Date): boolean => {
  const dateDiff = end.getTime() - start.getTime();

  if (dateDiff <= 0) return false;

  if (dateDiff < 60000) return false;

  return true;
};

export default function SurveyFormValidation(surveyData: SurveyCreateRequest): InputCheckResult {
  const errorIndex = -1;
  const currentDate = new Date();
  const startedDate = surveyData.startedDate !== '' ? new Date(surveyData.startedDate) : null;
  const endedDate = surveyData.endedDate !== '' ? new Date(surveyData.endedDate) : null;

  // Check survey title and description is not empty
  if (surveyData.title.length === 0 || surveyData.description.length === 0) {
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
    if (!validateEndDate(startedDate, endedDate)) {
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
    const { questions } = surveyData;

    // Check question title and description is not empty
    if (questions[i].title.length === 0 || questions[i].description.length === 0) {
      return {
        message: ValidationErrorMessage.EMPTY_INPUT,
        index: i,
      };
    }

    if (
      questions[i].questionType === QuestionType.SINGLE_CHOICE ||
      questions[i].questionType === QuestionType.MULTIPLE_CHOICE
    ) {
      const options = questions[i].questionOptions;

      // Check selective question has least 1 option
      if (typeof options === 'undefined' || options.length === 0) {
        return {
          message: ValidationErrorMessage.NO_OPTION,
          index: i,
        };
      }

      // Check selective question option is not empty
      for (let j = 0; j < options.length; j += 1) {
        if (options[j].option.length === 0) {
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
}
