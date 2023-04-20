export enum ValidationErrorMessage {
  OK,
  NO_QUESTION,
  NO_OPTION,
  EARLY_START,
  EARLY_END,
  EMPTY_INPUT,
}

export interface InputCheckResult {
  message: ValidationErrorMessage;
  index: number;
}
