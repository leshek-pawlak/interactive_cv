// core
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import React from 'react'
// plugins
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
// reducers
import reducer from './reducers/index'
// containers
import Home from './containers/Home'
// support for old browsers
import 'babel-polyfill'
// logger for developers
const logger = createLogger({ collapsed: true })

const enhancer = compose(
    // Middleware you want to use in development:
    applyMiddleware(thunk, logger),
    // Required! Enable Redux DevTools with the monitors you chose
    // https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljdų
    window.devToolsExtension ? window.devToolsExtension() : f => f
)

// Add the reducer to your store
const store = createStore(reducer, {}, process.env.NODE_ENV !== 'production' ? enhancer : applyMiddleware(thunk))
// put react to #root div in the index.html file
ReactDOM.render((
    <Provider store={store}>
        <Home />
</Provider>), document.getElementById('root'))
