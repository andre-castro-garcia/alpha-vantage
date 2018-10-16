import { all, fork } from 'redux-saga/effects'
import { watchSearchSymbol } from './modules/searchSymbol';

export function *rootSaga() {
    yield all([
        fork(watchSearchSymbol)
    ])
}
