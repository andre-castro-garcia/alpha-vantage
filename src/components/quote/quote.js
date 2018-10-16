import React from 'react';

import { connect } from 'react-redux';
import { withProps, compose, lifecycle } from 'recompose';
import numeral from 'numeral';

import { searchIntradayInfo, resetIntradayInfo } from '../../store/reducers/searchIntradayReducer';
import Intraday from '../intraday';

const enhance = compose(
    connect(
        ({ SearchQuoteReducer }) => ({ SearchQuoteReducer }),
        {
            searchIntradayInfoConnect: searchIntradayInfo,
            resetIntradayInfoConnect: resetIntradayInfo
        }
    ),
    withProps(({ SearchQuoteReducer }) => ({
        quote: SearchQuoteReducer.quote,
        isFetching: SearchQuoteReducer.isFetching,
        isSuccess: SearchQuoteReducer.isSuccess,
        isError: SearchQuoteReducer.isError
    })),
    lifecycle({
        componentDidMount() { this.props.resetIntradayInfoConnect() },
        componentDidUpdate() { this.props.resetIntradayInfoConnect() }
    })
);

const dailyVariation = (quote) => {
    let change = numeral(quote["Global Quote"]["09. change"]);
    return change._value > 0;
};

export const Quote = enhance(({ quote, isFetching, isSuccess, isError, searchIntradayInfoConnect }) =>
    <div>
        {
            isFetching &&
            <div>Loading...</div>
        }
        {
            isError &&
            <div>Ops! an error occured.</div>
        }
        {
            isSuccess &&
            <table>
                <tbody>
                <tr>
                    <td>
                        <h1>{quote["Global Quote"]["01. symbol"]}</h1>
                    </td>
                </tr>
                <tr>
                    <td>open</td><td>{numeral(quote["Global Quote"]["02. open"]).format('$0,0.00')}</td>
                </tr>
                <tr>
                    <td>previous close</td><td>{numeral(quote["Global Quote"]["08. previous close"]).format('$0,0.00')}</td>
                </tr>
                <tr>
                    <td>high</td><td>{numeral(quote["Global Quote"]["03. high"]).format('$0,0.00')}</td>
                </tr>
                <tr>
                    <td>low</td><td>{numeral(quote["Global Quote"]["04. low"]).format('$0,0.00')}</td>
                </tr>
                <tr>
                    <td>price</td><td>{numeral(quote["Global Quote"]["05. price"]).format('$0,0.00')}</td>
                </tr>
                <tr>
                    <td>last trading day</td><td>{new Date(quote["Global Quote"]["07. latest trading day"]).toUTCString()}</td>
                </tr>
                <tr>
                    <td colSpan={2}>
                        <button onClick={() => searchIntradayInfoConnect(quote["Global Quote"]["01. symbol"])}>
                            show intraday chart
                        </button>
                        <Intraday variation={dailyVariation(quote)} symbol={quote["Global Quote"]["01. symbol"]}/>
                    </td>
                </tr>
                </tbody>
            </table>
        }
    </div>
);