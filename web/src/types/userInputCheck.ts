export enum ErrorMessage {
  OK,
  NO_QUESTION,
  NO_OPTION,
  EARLY_START,
  EARLY_END,
}

export interface InputCheckResult {
  message: ErrorMessage;
  errorIndex: number;
}
