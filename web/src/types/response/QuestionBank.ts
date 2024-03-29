import { BaseTime } from './BaseTime';
import { QuestionOptionResponse } from './QuestionOption';

export interface QuestionBankResponse extends BaseTime {
  questionBankId: number;
  title: string;
  description: string;
  isRequired: boolean;
  questionType: QuestionType;
  questionOptions: Array<QuestionOptionResponse> | null;
}

enum QuestionType {
  SINGLE_CHOICE,
  MULTIPLE_CHOICES,
  SHORT_ANSWER,
  LONG_ANSWER,
}
