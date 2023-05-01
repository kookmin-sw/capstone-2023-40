import { UserAction, UserState } from '../types/user';

const initialState: UserState = {
  email: '',
  name: '',
  profileImage: '',
};

const initialAction: UserAction = {
  type: 'PROFILE_IMAGE',
  payload: 'https://images2.alphacoders.com/130/1306410.png',
};

/**
 * A reducer that manages state of user's authentication.
 *
 * @param {UserState} state - Current state of user.
 * @param {UserAction} action - Information of current user.
 * @returns {UserState} Updated user's state
 */
export const userReducer = (state: UserState = initialState, action: UserAction = initialAction): UserState => {
  switch (action.type) {
    case 'EMAIL':
      return { ...state, email: action.payload };
    case 'NAME':
      return { ...state, name: action.payload };
    case 'PROFILE_IMAGE':
      return { ...state, profileImage: action.payload };
    default:
      return state;
  }
};
