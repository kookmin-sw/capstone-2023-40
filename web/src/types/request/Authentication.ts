export interface UserRegisterRequest {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  address?: string;
  profileImage?: string;
}

export interface UserLoginRequest {
  email: string;
  password: string;
}
