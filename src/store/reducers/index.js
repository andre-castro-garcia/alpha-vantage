import { combineReducers } from 'redux';

import searchReducer from './searchReducer';
import SearchQuoteReducer from './searchQuoteReducer';

export const rootReducer = combineReducers({
    searchReducer,
    SearchQuoteReducer
});
