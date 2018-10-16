const initialState = {
    isFetching: false,
    isFetched: false,
    isError: false,
    isSuccess: false,
    intraday: {}
};

export const ACTION_TYPES = {
    SEARCH_INTRADAY_REQUEST: 'SEARCH_INTRADAY_REQUEST',
    SEARCH_INTRADAY_SUCCESS: 'SEARCH_INTRADAY_SUCCESS',
    SEARCH_INTRADAY_ERROR: 'SEARCH_INTRADAY_ERROR',
    RESET_INTRADAY_CHART: 'RESET_INTRADAY_CHART'
};

export const searchIntradayInfo = payload => ({
    type: ACTION_TYPES.SEARCH_INTRADAY_REQUEST,
    symbol: payload
});

export const resetIntradayInfo = () => ({
    type: ACTION_TYPES.RESET_INTRADAY_CHART
});

const SearchIntradayReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ACTION_TYPES.SEARCH_INTRADAY_REQUEST:
            return {
                ...state,
                isFetching: true
            };
        case ACTION_TYPES.SEARCH_INTRADAY_SUCCESS:
            return {
                ...state,
                intraday: payload.data,
                isFetching: false,
                isFetched: true,
                isError: false,
                isSuccess: true
            };
        case ACTION_TYPES.SEARCH_INTRADAY_ERROR:
            return {
                ...state,
                isFetching: false,
                isFetched: true,
                isError: true,
                isSuccess: false
            };
        case ACTION_TYPES.RESET_INTRADAY_CHART:
            return {
                ...initialState
            };
        default:
            return state;
    }
};

export default SearchIntradayReducer;
