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
  certificationInfolist: Array<UserAuthInformation>;
}

export interface UserAuthInformation {
  certificationName: string;
  isCertificated: boolean;
  expirationDate: Date | string;
}
