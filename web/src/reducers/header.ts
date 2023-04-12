import React from 'react';

const SETLOGIN = 'SETLOGIN' as const;
const SETSUBPAGE = 'SETSUBPAGE' as const;

export const setLogin = (payload: boolean) => ({
  type: SETLOGIN,
  payload: !payload,
});
export const setSubPageOpen = (payload: boolean) => ({
  type: SETSUBPAGE,
  payload: !payload,
});

export type HeaderAction = ReturnType<typeof setLogin> | ReturnType<typeof setSubPageOpen>;

export const initialAction: HeaderAction = {
  type: 'SETLOGIN',
  payload: false,
};

export interface HeaderState {
  isLogin: boolean;
  isSubPageOpen: boolean;
}
export const initialState: HeaderState = {
  isLogin: false,
  isSubPageOpen: false,
};

/**
 *
 * @param action
 * @param state
 * @returns
 */
export const headerReducer = (state: HeaderState = initialState, action: HeaderAction = initialAction): HeaderState => {
  switch (action.type) {
    case 'SETLOGIN':
      return { ...state, isLogin: !state.isLogin };
    case 'SETSUBPAGE':
      return { ...state, isSubPageOpen: !state.isSubPageOpen };
    default:
      return state;
  }
};
