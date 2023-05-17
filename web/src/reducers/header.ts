const SETLOGGEDIN = 'SETLOGGEDIN' as const;
const SETSUBPAGE = 'SETSUBPAGE' as const;

export const setLoggedIn = (payload: boolean) => ({
  type: SETLOGGEDIN,
  payload: !payload,
});

export const setSubPageOpen = (payload: boolean) => ({
  type: SETSUBPAGE,
  payload: !payload,
});

export type HeaderAction = ReturnType<typeof setLoggedIn> | ReturnType<typeof setSubPageOpen>;

export const initialAction: HeaderAction = {
  type: 'SETSUBPAGE',
  payload: false,
};

export interface HeaderState {
  isLoggedIn: boolean;
  isSubPageOpen: boolean;
}

export const initialState: HeaderState = {
  isLoggedIn: false,
  isSubPageOpen: false,
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
    case 'SETLOGGEDIN':
      return { ...state, isLoggedIn: !state.isLoggedIn };
    case 'SETSUBPAGE':
      return { ...state, isSubPageOpen: !state.isSubPageOpen };
    default:
      return state;
  }
};
