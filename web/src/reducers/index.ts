import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { headerReducer } from './header';
import { surveyAuthReducer } from './survey';
import { userInformationReducer } from './userInfo';

/**
 * Maintaining all status through redux
 * To prevent state initialization with a refresh
 */
export const persistConfig = {
  key: 'root',
  storage,
};

/**
 * Root Reducer that combines reducers you assign
 *
 * You can add to otherReducer what you want otherState.
 * ex) auth: authReducer (you must implement authReducer..)
 */
export const rootReducer = combineReducers({
  header: headerReducer,
  surveyAuth: surveyAuthReducer,
  userInformation: userInformationReducer,
});

export const persistedReducer = persistReducer(persistConfig, rootReducer);

export type RootState = ReturnType<typeof persistedReducer>;
export default persistedReducer;
