import { ProfileState, ProfileAction } from '../types/profile';

const initalState: ProfileState = {
  point: '0',
  email: 'test@gmail.com',
  password: 'asdf1234!',
  name: 'jsontest',
  phoneNumber: '010-1234-5678',
  address: '서울특별시 성북구 정릉동 국민대학교 기숙사',
};

const initialAction: ProfileAction = {
  type: 'CHANGE_POINT',
  payload: '0',
};

export const profileReducer = (
  state: ProfileState = initalState,
  action: ProfileAction = initialAction
): ProfileState => {
  switch (action.type) {
    case 'CHANGE_POINT':
      return { ...state, password: action.payload };
    case 'CHANGE_PASSWORD':
      return { ...state, password: action.payload };
    case 'CHANGE_PHONE_NUMBER':
      return { ...state, phoneNumber: action.payload };
    case 'CHANGE_ADDRESS':
      return { ...state, address: action.payload };
    default:
      return state;
  }
};
