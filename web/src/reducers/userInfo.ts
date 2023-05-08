import { UserInformationState, UserInformationAction } from '../types/user';

const initalState: UserInformationState = {
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
    case 'CHANGE_POINT':
      return { ...state, point: action.payload };
    case 'CHANGE_EMAIL':
      return { ...state, email: action.payload };
    case 'CHANGE_PASSWORD':
      return { ...state, password: action.payload };
    case 'CHANGE_NAME':
      return { ...state, name: action.payload };
    case 'CHANGE_PHONE_NUMBER':
      return { ...state, phoneNumber: action.payload };
    case 'CHANGE_ADDRESS':
      return { ...state, address: action.payload };
    case 'CHANGE_PROFILEIMAGE':
      return { ...state, profileImage: action.payload };
    default:
      return state;
  }
};
