import { HeaderState, HeaderAction } from '../types/header';

const initialState: HeaderState = {
  isLoggedIn: false,
  isSubPageOpen: false,
};

const initialAction: HeaderAction = {
  type: 'SETSUBPAGE',
  payload: false,
};

/**
 * Check login status and Open status of SubPage
 *
 * @param {HeaderState} state State value of Check Login and Opened SubPage
 * @param {HeaderAction} action Action method for setLogin and setSubPageOpen
 * @returns {HeaderState} state Updated state value of Check Login and Opened SubPage
 */
export const headerReducer = (state: HeaderState = initialState, action: HeaderAction = initialAction): HeaderState => {
  switch (action.type) {
    case 'SET_LOGGED_IN':
      return { ...state, isLoggedIn: !state.isLoggedIn };
    case 'SETSUBPAGE':
      return { ...state, isSubPageOpen: !state.isSubPageOpen };
    default:
      return state;
  }
};
