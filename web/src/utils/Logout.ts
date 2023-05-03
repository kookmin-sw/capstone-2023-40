import { useDispatch } from 'react-redux';

import {
  setUserEmail,
  setUserAddress,
  setUserName,
  setUserPassword,
  setUserPoint,
  setPhoneNumber,
  setUserProfileImage,
} from '../types/user';

export default function HandleLogout(dispatch = useDispatch()) {
  dispatch(setUserEmail(''));
  dispatch(setUserPassword(''));
  dispatch(setUserName(''));
  dispatch(setPhoneNumber(''));
  dispatch(setUserAddress(''));
  dispatch(setUserPoint(''));
  dispatch(setUserProfileImage(''));
}
