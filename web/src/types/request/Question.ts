import { QuestionOptionCreateRequest } from './QuestionOption';

export interface QuestionCreateRequest {
  title: string;
  description: string;
  questionType: QuestionType;
  questionNo: number;
  isRequired: boolean;
  questionOptions?: Array<QuestionOptionCreateRequest>;
}

enum QuestionType {
  SINGLE_CHOICE,
  MULTIPLE_CHOICE,
  SHORT_ANSWER,
  LONG_ANSWER,
}
