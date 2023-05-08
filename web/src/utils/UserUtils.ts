import { useDispatch } from 'react-redux';

import {
  setAuthDriver,
  setAuthGoogle,
  setAuthIdentity,
  setAuthKakao,
  setAuthNaver,
  setAuthWebMail,
} from '../types/surveyAuth';
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
export const setUserInformation = (userdata: any, password: string, dispatch = useDispatch()) => {
  dispatch(setUserPoint('0'));
  dispatch(setUserEmail(userdata.email));
  dispatch(setUserPassword(password));
  dispatch(setUserName(userdata.name));
  dispatch(setPhoneNumber(userdata.phoneNumber));
  dispatch(setUserAddress(userdata.address === null ? '주소를 입력해주세요' : userdata.address));
  dispatch(setUserProfileImage('https://images2.alphacoders.com/130/1306410.png'));
};

// if we logout in this service, initialize userData in local.
export const clearUserInformation = (dispatch = useDispatch()) => {
  // initialize user information.
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
