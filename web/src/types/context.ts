import { AxiosResponse } from 'axios';

import { UserLoginRequest, UserRegisterRequest } from './request';
import { UserResponse } from './response/User';

export interface AuthProviderProps {
  children: React.ReactNode;
}

export interface AuthContextType {
  user?: AxiosResponse<UserResponse>;
  error?: any;
  isLoggedIn?: boolean;
  login: (body: UserLoginRequest) => void;
  register: (body: UserRegisterRequest) => void;
  logout: () => void;
}
