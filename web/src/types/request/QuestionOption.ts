export interface QuestionOptionCreateRequest {
  option: string;
  description: string;
}

export interface QuestionOptionUpdateRequest {
  optionId: number;
  option: string;
  description: string;
}
