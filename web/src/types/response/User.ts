import { BaseTime } from './BaseTime';

export interface UserResponse extends BaseTime {
  userId: number;
  email: string;
  name: string;
  phoneNumber: string;
  address: string;
  profileImage: string;
}
