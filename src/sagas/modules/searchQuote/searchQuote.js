import { put, call, takeEvery, all } from 'redux-saga/effects';
import { searchQuoteInfo, searchIntradayInfo} from '../../../services/searchSymbolService';
import { ACTION_TYPES } from '../../../store/reducers/searchQuoteReducer';

const {
    SEARCH_QUOTE_REQUEST,
    SEARCH_QUOTE_SUCCESS,
    SEARCH_QUOTE_ERROR
} = ACTION_TYPES;

export function *searchQuote(payload) {
    try {
        let response = yield all({
            quote: call(searchQuoteInfo, payload),
            intraday: call(searchIntradayInfo, payload)
        });
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
