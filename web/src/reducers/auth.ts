import { AuthAction, AuthState } from '../types/auth';

const initialState: AuthState = {
  email: '',
  name: '',
  profileImage: '',
};

const initialAction: AuthAction = {
  type: 'PROFILE_IMAGE',
  payload: 'https://images2.alphacoders.com/130/1306410.png',
};

/**
 * A reducer that manages state of user's authentication.
 *
 * @param {AuthState} state - Current state of user.
 * @param {AuthAction} action - Information of current user.
 * @returns {AuthState} Updated user's state
 */
export const authReducer = (state: AuthState = initialState, action: AuthAction = initialAction): AuthState => {
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
