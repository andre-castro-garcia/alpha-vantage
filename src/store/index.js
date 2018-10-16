import { createStore, applyMiddleware, compose } from 'redux';
import { rootReducer } from './reducers';

let store = null;

export function configureStore(sagaMiddleware) {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    if (store === null) {
        store = createStore(
            rootReducer,
            composeEnhancers(
                applyMiddleware(sagaMiddleware)
            ));

        if (process.env.NODE_ENV === 'development') {
            window.__store = store
        }
    }
    return store
}
