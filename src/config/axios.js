import * as nativeAxios from 'axios';

const BASE_URL = 'https://www.alphavantage.co';

const createAxios = () => {
    return nativeAxios.create({
        baseURL: BASE_URL
    });
};

export default createAxios()
