export interface QuestionOptionCreateRequest {
  option: string;
  description: string;
}

export interface QuestionOptionUpdateRequest {
  optionId: string;
  option: string;
  description: string;
}
