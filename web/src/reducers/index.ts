import { combineReducers } from 'redux';

import { authReducer } from './auth';
import { formReducer } from './form';
import headerReducer from './header';
import { userInfoReducer } from './userInfo';

const rootReducer = combineReducers({
  header: headerReducer,
  form: formReducer,
  auth: authReducer,
  userInfo: userInfoReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
