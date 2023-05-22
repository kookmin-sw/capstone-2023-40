import { QuestionType } from './Question';

export interface AnsweredQuestion {
  questionBankId: number;
  isRequired: boolean;
  questionType: QuestionType;
  singleChoice?: number;
  multipleChoices?: Array<number>;
  shortAnswer?: string;
  longAnswer?: string;
}
