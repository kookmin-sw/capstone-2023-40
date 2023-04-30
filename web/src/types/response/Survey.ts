import { BaseTime } from './BaseTime';
import { QuestionBankResponse } from './QuestionBank';

export interface SurveyResponse extends BaseTime {
  surveyId: string;
  authorId: number;
  title: string;
  description: string;
  startedDate: Date | string;
  endedDate: Date | string;
  questions: Array<QuestionBankResponse>;
  certificationTypes: Array<CertificationType>;
}

export interface SurveyAbstractResponse extends BaseTime {
  surveyId: string;
  authorId: number;
  title: string;
  description: string;
  startedDate: Date | string;
  endedDate: Date | string;
  certificationTypes: Array<CertificationType>;
}

export interface SurveyPageResponse extends BaseTime {
  surveys: SurveyAbstractResponse[];
  page: number;
  totalSurveys: number;
  totalPages: number;
}

enum CertificationType {
  KAKAO,
  NAVER,
  GOOGLE,
  WEBMAIL,
  DRIVER_LICENSE,
  MOBILE_PHONE,
}
