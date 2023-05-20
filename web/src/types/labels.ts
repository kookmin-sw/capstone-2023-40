export enum AuthLabel {
  NONE = '제한없음',
  KAKAO = '카카오계정',
  NAVER = '네이버계정',
  GOOGLE = '구글계정',
  WEBMAIL = '학교웹메일',
  DRIVER_LICENSE = '운전면허',
  IDENTITY_CARD = '신분증',
}

export type AuthLabelKey = keyof typeof AuthLabel;

export type LogLevel = 'ERROR' | 'WARN' | 'INFO';
