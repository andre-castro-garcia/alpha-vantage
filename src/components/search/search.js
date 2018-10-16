import React from 'react';

import { connect } from 'react-redux';
import { searchSymbolInfo } from '../../store/reducers/searchReducer';
import { searchQuoteInfo } from '../../store/reducers/searchQuoteReducer';
import { withHandlers, withState, withProps, compose } from 'recompose';
import _ from 'lodash';

const enhance = compose(
    connect(
        ({ SearchReducer }) => ({ SearchReducer }),
        {
            searchSymbolInfoConnect: searchSymbolInfo,
            searchQuoteInfoConnect: searchQuoteInfo
        }
    ),
    withProps(({ SearchReducer }) => ({
        data: SearchReducer.data,
        isFetching: SearchReducer.isFetching,
        isSuccess: SearchReducer.isSuccess,
        isError: SearchReducer.isError
    })),
    withState("inputValue", "setInputValue", ""),
    withHandlers({
        onChange: ({ setInputValue }) => event => {
            setInputValue(event.target.value)
        }
    })
);

export const Search = enhance(({ inputValue, data, isFetching, isSuccess, isError, onChange, searchSymbolInfoConnect,
                                   searchQuoteInfoConnect }) =>
    <div>
        <input onChange={onChange} type='text' value={inputValue}/>
        <button disabled={inputValue.length < 1} onClick={() => searchSymbolInfoConnect(inputValue)}>
            Search
        </button>
        {
            isFetching &&
            <div>Loading...</div>
        }
        {
            isError &&
            <div>Ops! an error occured.</div>
        }
        <table>
            <tbody>
            {
                isSuccess && !isFetching && _.isEmpty(data.bestMatches) &&
                    <tr><td>Symbol not found</td></tr>
            }
            {
                isSuccess && !isFetching &&
                    data.bestMatches.map((symbol, key) => {
                        return (
                            <tr key={key}>
                                <td>
                                    <button onClick={() => searchQuoteInfoConnect(symbol["1. symbol"])}>
                                        {symbol["1. symbol"]}
                                    </button>
                                </td>
                                <td>{symbol["2. name"]}</td>
                                <td>{symbol["4. region"]}</td>
                                <td>{symbol["7. timezone"]}</td>
                                <td>{symbol["8. currency"]}</td>
                            </tr>
                        )})
            }
            </tbody>
        </table>
    </div>
);
