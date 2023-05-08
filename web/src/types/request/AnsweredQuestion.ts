export interface AnsweredQuestion {
  questionTitle: string;
  questionDescription: string;
  singleChoice?: string;
  multipleChoices?: Array<string>;
  shortAnswer?: string;
  longAnswer?: string;
}
