const initialState = {
    isFetching: false,
    isFetched: false,
    isError: false,
    isSuccess: false,
    data: {}
};

export const ACTION_TYPES = {
    SEARCH_SYMBOL_REQUEST: 'SEARCH_SYMBOL_REQUEST',
    SEARCH_SYMBOL_SUCCESS: 'SEARCH_SYMBOL_SUCCESS',
    SEARCH_SYMBOL_ERROR: 'SEARCH_SYMBOL_ERROR'
};

export const searchSymbolInfo = payload => ({
    type: ACTION_TYPES.SEARCH_SYMBOL_REQUEST,
    searchTerm: payload
});

const searchReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ACTION_TYPES.SEARCH_SYMBOL_REQUEST:
            return {
                ...state,
                isFetching: true
            };
        case ACTION_TYPES.SEARCH_SYMBOL_SUCCESS:
            return {
                ...state,
                data: payload.data,
                isFetching: false,
                isFetched: true,
                isError: false,
                isSuccess: true
            };
        case ACTION_TYPES.SEARCH_SYMBOL_ERROR:
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

export default searchReducer;
