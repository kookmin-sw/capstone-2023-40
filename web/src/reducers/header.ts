type HeaderState = {
  isLogin: boolean;
  isSubPageOpen: boolean;
};

const initialState: HeaderState = {
  isLogin: true,
  isSubPageOpen: false,
};

type Action = { type: 'SET_LOGIN' } | { type: 'SET_SUB_PAGE' };

export default function headerReducer(action: Action, state = initialState): HeaderState {
  switch (action.type) {
    case 'SET_LOGIN':
      return { ...state, isLogin: !state.isLogin };
    case 'SET_SUB_PAGE':
      return { ...state, isSubPageOpen: !state.isSubPageOpen };
    default:
      return state;
  }
}
