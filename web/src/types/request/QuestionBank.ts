import { QuestionOptionUpdateRequest } from './QuestionOption';

export interface QuestionBankUpdateRequest {
  questionBankId: string;
  title: string;
  description: string;
  questionType: QuestionType;
  isRequired: boolean;
  questionNo: number;
  questionOptions: Array<QuestionOptionUpdateRequest>;
}

enum QuestionType {
  SINGLE_CHOICE,
  MULTIPLE_CHOICE,
  SHORT_ANSWER,
  LONG_ANSWER,
}
