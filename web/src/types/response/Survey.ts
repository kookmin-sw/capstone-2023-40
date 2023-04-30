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

enum CertificationType {
  KAKAO,
  NAVER,
  GOOGLE,
  WEBMAIL,
  DRIVER_LICENSE,
  MOBILE_PHONE,
}
