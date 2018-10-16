import { put, call, takeEvery, all } from 'redux-saga/effects';
import { searchQuoteInfo } from '../../../services/searchSymbolService';
import { ACTION_TYPES } from '../../../store/reducers/searchQuoteReducer';

const {
    SEARCH_QUOTE_REQUEST,
    SEARCH_QUOTE_SUCCESS,
    SEARCH_QUOTE_ERROR
} = ACTION_TYPES;

export function *searchQuote(payload) {
    try {
        const response = yield call(searchQuoteInfo, payload);
        yield put({ type: SEARCH_QUOTE_SUCCESS, payload: response });
    } catch (err) {
        yield put({ type: SEARCH_QUOTE_ERROR, payload: err })
    }
}

export function *watchSearchQuote() {
    yield all([
        takeEvery(SEARCH_QUOTE_REQUEST, searchQuote)
    ])
}
