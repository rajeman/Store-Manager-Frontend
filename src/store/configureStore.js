import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import productReducer from '../reducers/products';
import authReducer from '../reducers/auth';
import navigationReducer from '../reducers/navigation';
//import cartReducer from '../reducers/filters';

export default () => createStore(
    combineReducers({
        products: productReducer,
        auth: authReducer,
        navigation: navigationReducer
    }), applyMiddleware(thunk));




//redux steps
//1. create a configStore file and call createStore with the default state