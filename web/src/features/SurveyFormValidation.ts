import { QuestionType } from '../types/request/Question';
import { SurveyCreateRequest } from '../types/request/Survey';
import { ValidationErrorMessage, InputCheckResult } from '../types/userInputCheck';

export default function SurveyFormValidation(surveyData: SurveyCreateRequest): InputCheckResult {
  let errorIndex = -1;
  const currentDate = new Date();
  const startedDate = new Date(surveyData.startedDate);
  const endedDate = new Date(surveyData.endedDate);

  if (startedDate < currentDate) {
    return {
      message: ValidationErrorMessage.EARLY_START,
      index: errorIndex,
    };
  }

  if (endedDate < startedDate) {
    return {
      message: ValidationErrorMessage.EARLY_END,
      index: errorIndex,
    };
  }

  if (surveyData.questions.length === 0) {
    return {
      message: ValidationErrorMessage.NO_QUESTION,
      index: errorIndex,
    };
  }

  for (let i = 0; i < surveyData.questions.length; i += 1) {
    if (
      surveyData.questions[i].questionType === QuestionType.SINGLE_CHOICE ||
      surveyData.questions[i].questionType === QuestionType.MULTIPLE_CHOICE
    ) {
      if (
        typeof surveyData.questions[i].questionOptions === 'undefined' ||
        surveyData.questions[i].questionOptions?.length === 0
      ) {
        errorIndex = surveyData.questions[i].questionNo;
        break;
      }
    }
  }

  if (errorIndex !== -1) {
    return {
      message: ValidationErrorMessage.NO_OPTION,
      index: errorIndex,
    };
  }

  return {
    message: ValidationErrorMessage.OK,
    index: errorIndex,
  };
}
