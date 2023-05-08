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

/**
 * if we complete logged in this service, userData update in userInformatonReducer
 * @param data : UserInformation list [point, email, name, phoneNumber, address, profileImage]
 * @param password : Save password for updating information on My Page
 * @param dispatch : Function for updating information on react-redux
 */
export const setUserInformation = (data: any, password: string, dispatch = useDispatch()) => {
  dispatch(setUserPoint('0'));
  dispatch(setUserEmail(data.email));
  dispatch(setUserPassword(password));
  dispatch(setUserName(data.name));
  dispatch(setPhoneNumber(data.phoneNumber));
  dispatch(setUserAddress(data.address === null ? '주소를 입력해주세요' : data.address));
  dispatch(setUserProfileImage('https://images2.alphacoders.com/130/1306410.png'));
  console.log(data);
};

// if we logout in this service, initialize userData in local.
export const clearUserInformation = (dispatch = useDispatch()) => {
  dispatch(setUserEmail(''));
  dispatch(setUserPassword(''));
  dispatch(setUserName(''));
  dispatch(setPhoneNumber(''));
  dispatch(setUserAddress(''));
  dispatch(setUserPoint(''));
  dispatch(setUserProfileImage(''));
};
