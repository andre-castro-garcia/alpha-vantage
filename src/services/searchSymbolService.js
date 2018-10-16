import request from '../config/axios'

export const searchSymbolInfo = (payload) =>
    request.get(`/query?function=SYMBOL_SEARCH&keywords=${payload.searchTerm}&apikey=VZLZ58FTEXZW7QZ6`);
