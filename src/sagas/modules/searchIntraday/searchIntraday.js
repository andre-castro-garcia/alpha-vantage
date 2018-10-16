import { put, call, takeEvery, all } from 'redux-saga/effects';
import { searchIntradayInfo } from '../../../services/searchSymbolService';
import { ACTION_TYPES } from '../../../store/reducers/searchIntradayReducer';

const {
    SEARCH_INTRADAY_REQUEST,
    SEARCH_INTRADAY_SUCCESS,
    SEARCH_INTRADAY_ERROR
} = ACTION_TYPES;

export function *searchIntraday(payload) {
    try {
        const response = yield call(searchIntradayInfo, payload);
        yield put({ type: SEARCH_INTRADAY_SUCCESS, payload: response });
    } catch (err) {
        yield put({ type: SEARCH_INTRADAY_ERROR, payload: err })
    }
}

export function *watchSearchIntraday() {
    yield all([
        takeEvery(SEARCH_INTRADAY_REQUEST, searchIntraday)
    ])
}
