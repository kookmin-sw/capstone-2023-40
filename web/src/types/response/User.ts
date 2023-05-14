import { BaseTime } from './BaseTime';

export interface UserResponse extends BaseTime {
  userId: number;
  email: string;
  name: string;
  phoneNumber: string;
  address: string;
  profileImage: string;
}

export interface UserAuthListResponse extends UserAuthInformation {
  kakaoCertificationInfo: null | Array<UserAuthInformation>;
  naverCertificationInfo: null | Array<UserAuthInformation>;
  googleCertificationInfo: null | Array<UserAuthInformation>;
  webMailCertificationInfo: null | Array<UserAuthInformation>;
  driverLicenseCertificationInfo: null | Array<UserAuthInformation>;
  identityCardCertificationInfo: null | Array<UserAuthInformation>;
}

export interface UserAuthInformation {
  isCertificated: boolean;
  expirationDate: Date | string;
}
