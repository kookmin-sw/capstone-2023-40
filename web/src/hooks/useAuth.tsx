import React, { ReactNode, useContext, useEffect, useMemo, useState } from 'react';

import { AxiosError, AxiosResponse } from 'axios';
import { useLocation } from 'react-router-dom';

import axios from '../api/axios';
import { requests } from '../api/request';
import { AuthContext } from '../contexts/AuthContext';
import { UserLoginRequest, UserRegisterRequest } from '../types/request/Authentication';
import { UserResponse } from '../types/response/User';
import { isEmptyString } from '../utils/validate';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AxiosResponse<UserResponse>>();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [error, setError] = useState<any>();
  const location = useLocation();

  useEffect(() => {
    if (error) setError(null);
  }, [location.pathname]);

  async function login(body: UserLoginRequest) {
    if (isEmptyString(body.email) || isEmptyString(body.password)) {
      alert('아이디 또는 비밀번호를 확인해주세요.');
      return;
    }

    await axios
      .post(requests.login, body)
      .then((_user: AxiosResponse<UserResponse>) => {
        setUser(_user);
        setIsLoggedIn(true);
      })
      .catch((_error: AxiosError) => setError(_error))
      .finally(() => {});
  }

  async function register(body: UserRegisterRequest) {
    await axios
      .post(requests.register, body)
      .then((_user: AxiosResponse<UserResponse>) => {
        setUser(_user);
      })
      .catch((_error: AxiosError) => {
        setError(_error);
      })
      .finally(() => {});
  }

  async function logout() {
    await axios
      .get(requests.logout)
      .then((_user: AxiosResponse<UserResponse>) => {
        setUser(undefined);
        setIsLoggedIn(false);
      })
      .catch((_error: AxiosError) => {
        setError(_error);
      })
      .finally(() => {});
  }

  const value = useMemo(
    () => ({
      user,
      error,
      isLoggedIn,
      login,
      register,
      logout,
    }),
    [user, error, isLoggedIn, login, register, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default function useAuth() {
  return useContext(AuthContext);
}
