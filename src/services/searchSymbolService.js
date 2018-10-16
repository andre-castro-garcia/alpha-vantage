import request from '../config/axios'
import { alphaVantageKey } from '../config/alphaVantageKey';

export const searchSymbolInfo = (payload) =>
    request.get(`/query?function=SYMBOL_SEARCH&keywords=${payload.searchTerm}&apikey=${alphaVantageKey}`);

export const searchQuoteInfo = (payload) =>
    request.get(`/query?function=GLOBAL_QUOTE&symbol=${payload.symbol}&apikey=${alphaVantageKey}`);

export const searchIntradayInfo = (payload) =>
    request.get(`/query?function=TIME_SERIES_INTRADAY&symbol=${payload.symbol}&interval=5min&apikey=${alphaVantageKey}`);
