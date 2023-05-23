import { QuestionOptionresultResponse } from './QuestionOption';

export interface AnsweredQuestionResponse {
  surveyId: string;
  surveyTitle: string;
  questions: Array<AnsweredQuestion>;
}

export interface AnsweredQuestion {
  answeredQuestionId: string;
  questionTitle: string;
  questionDescription: string;
  singleChoice: string;
  multipleChoices: Array<string>;
  shortAnswer: string;
  longAnswer: string;
}

export interface AnsweredQuestionResult {
  answeredQuestionId: string;
  questionTitle: string;
  questionDescription: string;
  questionType: string;
  questionNo: number;
  textAnswers: Array<string>;
  optionAnswers: Array<QuestionOptionresultResponse>;
}
