import { combineReducers } from 'redux';

import SearchReducer from './searchReducer';
import SearchQuoteReducer from './searchQuoteReducer';
import SearchIntradayReducer from './searchIntradayReducer';

export const rootReducer = combineReducers({
    SearchReducer,
    SearchQuoteReducer,
    SearchIntradayReducer
});
