import { combineReducers } from 'redux';

import SearchReducer from './searchReducer';
import SearchQuoteReducer from './searchQuoteReducer';

export const rootReducer = combineReducers({
    SearchReducer,
    SearchQuoteReducer
});
