import React from 'react';

import { connect } from 'react-redux';
import { withProps, compose } from 'recompose';
import numeral from 'numeral';
import Intraday from '../intraday';

const enhance = compose(
    connect(
        ({ SearchQuoteReducer }) => ({ SearchQuoteReducer })
    ),
    withProps(({ SearchQuoteReducer }) => ({
        data: SearchQuoteReducer.data,
        isFetching: SearchQuoteReducer.isFetching,
        isSuccess: SearchQuoteReducer.isSuccess,
        isError: SearchQuoteReducer.isError
    }))
);

const dailyVariation = (quote) => {
    let change = numeral(quote["Global Quote"]["09. change"]);
    return change._value > 0;
};

export const Quote = enhance(({ data, isFetching, isSuccess, isError }) =>
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
            <table style={{width:"100%"}}>
                <tbody>
                <tr>
                    <td>
                        <h1>{data.quote["Global Quote"]["01. symbol"]}</h1>
                    </td>
                </tr>
                <tr>
                    <td>open</td><td>{numeral(data.quote["Global Quote"]["02. open"]).format('$0,0.00')}</td>
                </tr>
                <tr>
                    <td>previous close</td><td>{numeral(data.quote["Global Quote"]["08. previous close"]).format('$0,0.00')}</td>
                </tr>
                <tr>
                    <td>high</td><td>{numeral(data.quote["Global Quote"]["03. high"]).format('$0,0.00')}</td>
                </tr>
                <tr>
                    <td>low</td><td>{numeral(data.quote["Global Quote"]["04. low"]).format('$0,0.00')}</td>
                </tr>
                <tr>
                    <td>price</td><td>{numeral(data.quote["Global Quote"]["05. price"]).format('$0,0.00')}</td>
                </tr>
                <tr>
                    <td>last trading day</td><td>{new Date(data.quote["Global Quote"]["07. latest trading day"]).toUTCString()}</td>
                </tr>
                <tr>
                    <td colSpan={2}>
                        <Intraday variation={dailyVariation(data.quote)} intraday={data.intraday}/>
                    </td>
                </tr>
                </tbody>
            </table>
        }
    </div>
);
