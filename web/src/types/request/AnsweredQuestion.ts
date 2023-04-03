export interface AnsweredQuestion {
  quesitonTitle: string;
  questionDescription: string;
  singleChoice?: string;
  multipleChoices?: Array<string>;
  shortAnswer?: string;
  longAnswer?: string;
}
