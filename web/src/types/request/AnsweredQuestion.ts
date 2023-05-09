export interface AnsweredQuestion {
  questionBankId: number;
  singleChoice?: number;
  multipleChoices?: Array<number>;
  shortAnswer?: string;
  longAnswer?: string;
}
