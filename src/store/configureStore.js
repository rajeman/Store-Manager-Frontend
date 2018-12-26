import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import productReducer from '../reducers/products';
//import cartReducer from '../reducers/filters';

export default () => createStore(productReducer, applyMiddleware(thunk));




//redux steps
//1. create a configStore file and call createStore with the default state