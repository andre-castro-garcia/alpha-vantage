import { put, call, takeEvery, all } from 'redux-saga/effects';
import { searchSymbolInfo } from '../../../services/searchSymbolService';
import { ACTION_TYPES } from '../../../store/reducers/searchReducer';

const {
    SEARCH_SYMBOL_REQUEST,
    SEARCH_SYMBOL_SUCCESS,
    SEARCH_SYMBOL_ERROR
} = ACTION_TYPES;

export function *searchSymbol(payload) {
    try {
        const response = yield call(searchSymbolInfo, payload);
        yield put({ type: SEARCH_SYMBOL_SUCCESS, payload: response })
    } catch (err) {
        yield put({ type: SEARCH_SYMBOL_ERROR, payload: err })
    }
}

export function *watchSearchSymbol() {
    yield all([
        takeEvery(SEARCH_SYMBOL_REQUEST, searchSymbol)
    ])
}
