import { BaseTime } from './BaseTime';
import { QuestionOptionResponse } from './QuestionOption';

export interface QuestionBankResponse extends BaseTime {
  questionBankId: string;
  title: string;
  description: string;
  questionType: QuestionType;
  questionOptions: Array<QuestionOptionResponse>;
}

enum QuestionType {
  SINGLE_CHOICE,
  MULTIPLE_CHOICE,
  SHORT_ANSWER,
  LONG_ANSWER,
}
