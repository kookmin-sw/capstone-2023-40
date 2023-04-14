import { QuestionCreateRequest, QuestionType } from '../../types/request/Question';
import { QuestionOptionCreateRequest } from '../../types/request/QuestionOption';
import { SurveyCreateRequest } from '../../types/request/Survey';

interface Props {
  surveyData: SurveyCreateRequest;
}

interface InputCheckResult {
  message: string;
  errorIndex: number | Array<number> | null;
}

export const InputCheck = ({ surveyData }: Props): InputCheckResult => {
  if (surveyData.questions.length === 0) {
    return {
      message: 'NO_QUESTION',
      errorIndex: null,
    };
  }

  const nums: Array<number> = [];
  surveyData.questions.forEach((item: QuestionCreateRequest) => {
    if (item.questionType === QuestionType.SINGLE_CHOICE || item.questionType === QuestionType.MULTIPLE_CHOICE) {
      if (typeof item.questionOptions === 'undefined') nums.push(item.questionNo);
      else if (item.questionOptions?.length === 0) nums.push(item.questionNo);
    }
  });

  if (nums.length !== 0) {
    return {
      message: 'NO_OPTION',
      errorIndex: nums,
    };
  }

  return {
    message: 'OK',
    errorIndex: null,
  };
};
