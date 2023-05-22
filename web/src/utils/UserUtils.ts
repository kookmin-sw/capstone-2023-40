import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

import axios from '../api/axios';
import { requests } from '../api/request';
import { UserResponse } from '../types/response/User';
import {
  setAuthDriver,
  setAuthGoogle,
  setAuthIdentity,
  setAuthKakao,
  setAuthNaver,
  setAuthWebMail,
} from '../types/surveyAuth';
import {
  setUserId,
  setUserEmail,
  setUserPassword,
  setUserName,
  setUserAddress,
  setUserPoint,
  setPhoneNumber,
  setUserProfileImage,
} from '../types/user';

/**
 * if we complete logged in this service, userData update in userInformatonReducer
 * @param data : UserInformation list [point, email, name, phoneNumber, address, profileImage]
 * @param password : Save password for updating information on My Page
 * @param dispatch : Function for updating information on react-redux
 */
export const setUserInformation = (userdata: any, password: string, dispatch = useDispatch()) => {
  dispatch(setUserId(userdata.authorId));
  dispatch(setUserPoint(userdata.point === undefined ? '0' : userdata.point));
  dispatch(setUserEmail(userdata.email));
  if (password !== 'passwordUndefined') {
    dispatch(setUserPassword(password));
  }
  dispatch(setUserName(userdata.name));
  dispatch(setPhoneNumber(userdata.phoneNumber));
  dispatch(setUserAddress(userdata.address === null ? '주소를 입력해주세요' : userdata.address));
  dispatch(setUserProfileImage('https://images2.alphacoders.com/130/1306410.png'));
};

// 마이페이지 이동시 사용자 정보 조회 및 업데이트.
export const updateUserInformation = async (dispatch = useDispatch(), navigate = useNavigate()) => {
  const res = await axios.get<UserResponse>(requests.getUserProfile);
  if (res.status === 200) {
    setUserInformation(res.data, 'passwordUndefined', dispatch);
    navigate('../../mypage');
  }
};

// if we logout in this service, initialize userData in local.
export const clearUserInformation = (dispatch = useDispatch()) => {
  // initialize user information.
  dispatch(setUserId(0));
  dispatch(setUserEmail(''));
  dispatch(setUserPassword(''));
  dispatch(setUserName(''));
  dispatch(setPhoneNumber(''));
  dispatch(setUserAddress(''));
  dispatch(setUserPoint(''));
  dispatch(setUserProfileImage(''));

  // initialize user authentication List
  dispatch(setAuthKakao(false));
  dispatch(setAuthGoogle(false));
  dispatch(setAuthNaver(false));
  dispatch(setAuthDriver(false));
  dispatch(setAuthIdentity(false));
  dispatch(setAuthWebMail(false));
};
