export interface HeaderState {
  isLoggedIn: boolean;
  isSubPageOpen: boolean;
}

export const setLoggedIn = (payload: boolean) => ({
  type: 'SET_LOGGED_IN',
  payload: !payload,
});

export const setSubPageOpen = (payload: boolean) => ({
  type: 'SETSUBPAGE',
  payload: !payload,
});

export type HeaderAction = ReturnType<typeof setLoggedIn> | ReturnType<typeof setSubPageOpen>;
