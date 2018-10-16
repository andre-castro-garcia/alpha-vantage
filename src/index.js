import React from 'react';
import ReactDOM from 'react-dom';
import { rootSaga } from './sagas';
import dotenv from 'dotenv';

import { Provider } from 'react-redux';
import { configureStore } from './store';
import createSagaMiddleware from 'redux-saga';

import App from './App';

dotenv.config();

const sagaMiddleware = createSagaMiddleware();
const store = configureStore(sagaMiddleware);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('root'));
