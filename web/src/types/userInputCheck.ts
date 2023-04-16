export enum ValidationErrorMessage {
  OK,
  NO_QUESTION,
  NO_OPTION,
  EARLY_START,
  EARLY_END,
}

export interface InputCheckResult {
  message: ValidationErrorMessage;
  index: number;
}
