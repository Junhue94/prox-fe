import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import { formReducer } from './reducers/formReducer';

const composeEnhancers =
    process.env.NODE_ENV === 'development'
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
        : compose;

export default createStore(
    combineReducers({
        formReducer,
    }),
    composeEnhancers(applyMiddleware(thunk)),
);
