export enum AuthLabel {
  KAKAO = '카카오계정',
  NAVER = '네이버계정',
  GOOGLE = '구글계정',
  ID = '신분증',
  MOBILE_PHONE = '휴대폰',
  DRIVER_LICENSE = '운전면허',
  WEBMAIL = '학교웹메일',
  NULL = '제한없음',
}

export type AuthLabelKey = keyof typeof AuthLabel;

export type LogLevel = 'ERROR' | 'WARN' | 'INFO';
