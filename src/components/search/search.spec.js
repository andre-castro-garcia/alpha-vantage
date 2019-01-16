import React from 'react';

import { render, fireEvent } from 'react-testing-library';
import { Provider } from 'react-redux';

import createSagaMiddleware from 'redux-saga';
import configureStore from 'redux-mock-store';

import { Search} from "./search";
import { searchTestData } from "./searchTestData";

import 'jest-dom/extend-expect';
import 'react-testing-library/cleanup-after-each';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

const mockStore = configureStore(middlewares);

const renderWithProvider = ({ store, component } = {}) => {
    return render(
        <Provider store={store}>{component}</Provider>
    );
};

const initialState = {
    searchReducer: {
        isFetching: false,
        isFetched: false,
        isError: false,
        isSuccess: false,
        data: {}
    }
};

describe('should render search component', () => {
    it('renders search and set a value', () => {
        const store = mockStore(initialState);
        const { container, queryByTestId } = renderWithProvider({
            store,
            component: (
                <Search />
            )
        });
        const input = container.querySelector('input[data-modal="input-search"]');
        fireEvent.change(input, { target: { value: "PETR" } });

        expect(container).toMatchSnapshot();
        expect(queryByTestId("button-search")).toBeInTheDocument();
    });
    it('renders correctly in initial state', () => {
        const store = mockStore(initialState);
        const { queryByTestId } = renderWithProvider({
            store,
            component: (
                <Search />
            )
        });
        expect(queryByTestId("input-search")).toBeInTheDocument();
        expect(queryByTestId("button-search")).toBeDisabled();
    });
    it('renders fetching state', () => {
        const store = mockStore({
            searchReducer: {
                isFetching: true
            }
        });
        const { container } = renderWithProvider({
            store,
            component: (
                <Search />
            )
        });
        expect(container).toMatchSnapshot();
    });
    it('renders error state', () => {
        const store = mockStore({
            searchReducer: {
                isError: true
            }
        });
        const { container } = renderWithProvider({
            store,
            component: (
                <Search />
            )
        });
        expect(container).toMatchSnapshot();
    });
    it('renders symbol not found state', () => {
        const store = mockStore({
            searchReducer: {
                isSuccess: true,
                isFetching: false,
                data: {}
            }
        });
        const { container } = renderWithProvider({
            store,
            component: (
                <Search />
            )
        });
        expect(container).toMatchSnapshot();
    });
    it('renders encountered symbols state', () => {
        const store = mockStore({
            searchReducer: {
                isSuccess: true,
                isFetching: false,
                data: searchTestData
            }
        });
        const { container, queryByTestId } = renderWithProvider({
            store,
            component: (
                <Search />
            )
        });
        expect(container).toMatchSnapshot();

        expect(queryByTestId("button-symbol-load")).toBeInTheDocument();
        expect(queryByTestId("symbol-name")).toBeInTheDocument();
        expect(queryByTestId("symbol-region")).toBeInTheDocument();
        expect(queryByTestId("symbol-timezone")).toBeInTheDocument();
        expect(queryByTestId("symbol-currency")).toBeInTheDocument();
    });
});
