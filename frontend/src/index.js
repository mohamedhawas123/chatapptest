import React, { Component } from 'react'
import ReactDOM  from 'react-dom'
import Chat from './containers/chat'
import WebSocketInstance from './websocket'
import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import {Provider} from 'react-redux';
import 'antd/dist/antd.css';
import authReducer from './store/reducers/auth'
import navReducer from './store/reducers/nav'

import thunk from 'redux-thunk';

import App from './App';

const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose


const rootReducer = combineReducers({
    auth: authReducer,
    nav: navReducer


})
const store = createStore(rootReducer, composeEnhances(
    applyMiddleware(thunk)
));




const app = (
    <Provider store={store}>
        <App />
    </Provider>
)

ReactDOM.render(app, document.getElementById("app"))