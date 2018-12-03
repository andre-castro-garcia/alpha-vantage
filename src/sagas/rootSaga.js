import { all, fork } from 'redux-saga/effects'
import { watchSearchSymbol } from './modules/searchSymbol';
import { watchSearchQuote } from './modules/searchQuote';

export function *rootSaga() {
    yield all([
        fork(watchSearchSymbol),
        fork(watchSearchQuote)
    ])
}
