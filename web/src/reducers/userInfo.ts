import { UserInformationState, UserInformationAction } from '../types/user';

const initalState: UserInformationState = {
  authorId: 0,
  point: '0',
  email: '',
  password: '',
  name: '',
  phoneNumber: '',
  address: '',
  profileImage: '',
};

const initialAction: UserInformationAction = {
  type: 'CHANGE_POINT',
  payload: '0',
};

/**
 * A reducer that manages state of user's authentication.
 *
 * @param {UserInformationState} state - Current state of user.
 * @param {UserInformationAction} action - Information of current user.
 * @returns {UserInformationState} Updated user's state
 */
export const userInformationReducer = (
  state: UserInformationState = initalState,
  action: UserInformationAction = initialAction
): UserInformationState => {
  switch (action.type) {
    case 'CHANGE_USERID':
      return { ...state, authorId: Number(action.payload) };
    case 'CHANGE_POINT':
      return { ...state, point: action.payload.toString() };
    case 'CHANGE_EMAIL':
      return { ...state, email: action.payload.toString() };
    case 'CHANGE_PASSWORD':
      return { ...state, password: action.payload.toString() };
    case 'CHANGE_NAME':
      return { ...state, name: action.payload.toString() };
    case 'CHANGE_PHONE_NUMBER':
      return { ...state, phoneNumber: action.payload.toString() };
    case 'CHANGE_ADDRESS':
      return { ...state, address: action.payload.toString() };
    case 'CHANGE_PROFILEIMAGE':
      return { ...state, profileImage: action.payload.toString() };
    default:
      return state;
  }
};
