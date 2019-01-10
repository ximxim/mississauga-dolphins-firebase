import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import reducers from './reducers';
import promise from './promise';
import rootSaga from './rootSaga';
import * as firebase from '../utils/firebase';

let store = {};

export default function configureStore() {
    firebase.initialize();
    const sagaMiddleware = createSagaMiddleware();

    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    store = createStore(
        reducers,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
        composeEnhancers(applyMiddleware(sagaMiddleware, promise)),
    );

    sagaMiddleware.run(rootSaga);

    return store;
}

export function getStore() {
    return store;
}
