import React from 'react';

import { connect } from 'react-redux';
import { searchSymbolInfo } from '../../store/reducers/searchReducer';
import { searchQuoteInfo } from '../../store/reducers/searchQuoteReducer';
import { branch, renderComponent, withHandlers, withState, withProps, compose } from 'recompose';
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
    }),
    branch(({ isFetching }) => isFetching,
        renderComponent(() => (
            <div>Loading...</div>
        ))
    ),
    branch(({ isError }) => isError,
        renderComponent(() => (
            <div>Ops! an error occured.</div>
        ))
    ),
    branch(({ isSuccess, isFetching, data }) => isSuccess && !isFetching && _.isEmpty(data.bestMatches),
        renderComponent(() => (
            <div>Symbol not found.</div>
        ))
    )
);

export const Search = enhance(({ inputValue, data, onChange, searchSymbolInfoConnect,
                                   searchQuoteInfoConnect }) =>
    <div>
        <input onChange={onChange} type='text' value={inputValue}/>
        <button disabled={inputValue.length < 1} onClick={() => searchSymbolInfoConnect(inputValue)}>
            Search
        </button>
        <table>
            <tbody>
            {
                !_.isUndefined(data.bestMatches) && !_.isNull(data.bestMatches) &&
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
