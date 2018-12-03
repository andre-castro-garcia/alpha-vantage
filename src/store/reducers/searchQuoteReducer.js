const initialState = {
    isFetching: false,
    isFetched: false,
    isError: false,
    isSuccess: false,
    data: {}
};

export const ACTION_TYPES = {
    SEARCH_QUOTE_REQUEST: 'SEARCH_QUOTE_REQUEST',
    SEARCH_QUOTE_SUCCESS: 'SEARCH_QUOTE_SUCCESS',
    SEARCH_QUOTE_ERROR: 'SEARCH_QUOTE_ERROR'
};

export const searchQuoteInfo = payload => ({
    type: ACTION_TYPES.SEARCH_QUOTE_REQUEST,
    symbol: payload
});

const SearchQuoteReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ACTION_TYPES.SEARCH_QUOTE_REQUEST:
            return {
                ...state,
                isFetching: true
            };
        case ACTION_TYPES.SEARCH_QUOTE_SUCCESS:
            return {
                ...state,
                data: { quote: payload.quote.data, intraday: payload.intraday.data },
                isFetching: false,
                isFetched: true,
                isError: false,
                isSuccess: true
            };
        case ACTION_TYPES.SEARCH_QUOTE_ERROR:
            return {
                ...state,
                isFetching: false,
                isFetched: true,
                isError: true,
                isSuccess: false
            };
        default:
            return state;
    }
};

export default SearchQuoteReducer;
