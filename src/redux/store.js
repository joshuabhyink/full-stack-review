import {createStore, applyMiddleware} from 'redux'
import userReducer from './userReducer'
import promiseMiddleware from 'redux-promise-middleware'

export default createStore(userReducer, applyMiddleware(promiseMiddleware))