import { UserInfoState, UserInfoAction } from '../types/userInfo';

export const userInfoReducer = (state: UserInfoState, action: UserInfoAction): UserInfoState => {
  switch (action.type) {
    case 'CHANGE_POINT':
      return { ...state, password: action.payload };
    case 'CHANGE_PASSWORD':
      return { ...state, password: action.payload };
    case 'CHANGE_PHONE_NUMBER':
      return { ...state, phoneNumber: action.payload };
    case 'CHANGE_ADDRESS':
      return { ...state, address: action.payload };
    case 'SET_CHANGE_PASSWORD':
      return { ...state, passwordDisabled: action.payload };
    case 'SET_CHANGE_PHONE_NUMBER':
      return { ...state, phoneNumberDisabled: action.payload };
    case 'SET_CHANGE_ADDRESS':
      return { ...state, addressDisabled: action.payload };
    default:
      return state;
  }
};
