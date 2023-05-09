import { AnsweredQuestion } from './AnsweredQuestion';
import { QuestionCreateRequest } from './Question';
import { QuestionBankUpdateRequest } from './QuestionBank';

export enum CertificationType {
  KAKAO,
  NAVER,
  GOOGLE,
  WEBMAIL,
  DRIVER_LICENSE,
  MOBILE_PHONE,
}

export interface SurveyCreateRequest {
  title: string;
  description: string;
  startedDate: Date | string;
  endedDate: Date | string;
  certificationTypes?: Array<CertificationType>;
  questions: Array<QuestionCreateRequest>;
}

export interface SurveyUpdateRequest {
  surveyId: string;
  title?: string;
  description?: string;
  startedDate?: Date;
  endedDate?: Date;
  certificationTypes?: Array<CertificationType>;
  questions?: Array<QuestionBankUpdateRequest>;
}

export interface SurveySubmitRequest {
  surveyId: string;
  answers: Array<AnsweredQuestion>;
  certificationTypes: Array<CertificationType>;
}
