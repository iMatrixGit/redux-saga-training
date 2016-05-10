import "babel-polyfill"

import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas'
import PostContainer from './PostContainer'
import reducer from './reducers'
require('./style.css');

const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducer,
    applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga, store.getState);

function render() {
  ReactDOM.render(
    <Provider store={store}>
        <PostContainer />
    </Provider>,
    document.getElementById('root')
  )
}

render();
