import { useDispatch } from 'react-redux';

import {
  setUserEmail,
  setUserPassword,
  setUserName,
  setUserAddress,
  setUserPoint,
  setPhoneNumber,
  setUserProfileImage,
} from '../types/user';

export const setUserInformation = (data: any, password: string, dispatch = useDispatch()) => {
  dispatch(setUserPoint('0'));
  dispatch(setUserEmail(data.email));
  dispatch(setUserPassword(password));
  dispatch(setUserName(data.name));
  dispatch(setPhoneNumber(data.phoneNumber));
  dispatch(setUserAddress(data.address === null ? '주소를 입력해주세요' : data.address));
  dispatch(setUserProfileImage('https://images2.alphacoders.com/130/1306410.png'));
};

export const clearUserInformation = (dispatch = useDispatch()) => {
  dispatch(setUserEmail(''));
  dispatch(setUserPassword(''));
  dispatch(setUserName(''));
  dispatch(setPhoneNumber(''));
  dispatch(setUserAddress(''));
  dispatch(setUserPoint(''));
  dispatch(setUserProfileImage(''));
};
