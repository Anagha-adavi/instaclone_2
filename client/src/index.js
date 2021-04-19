import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import AuthReducer from './store/reducers/authReducer';
import thunk from 'redux-thunk';
import PostReducer from './store/reducers/postReducer'

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const rootReducer=combineReducers({
    auth:AuthReducer,
    post:PostReducer
})

const store=createStore(rootReducer,composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
<Provider store={store}>
    <BrowserRouter>
        <App />
    </BrowserRouter>
</Provider>
, document.getElementById('root'));
registerServiceWorker();
