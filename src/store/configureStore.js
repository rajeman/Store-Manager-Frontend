import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import productReducer from '../reducers/products';
import authReducer from '../reducers/auth';
import saleReducer from '../reducers/records';
import navigationReducer from '../reducers/navigation';
import attendantReducer from '../reducers/attendants';
import cartReducer from '../reducers/cart';

export default () => createStore(
  combineReducers({
    products: productReducer,
    auth: authReducer,
    navigation: navigationReducer,
    sales: saleReducer,
    attendants: attendantReducer,
    cart: cartReducer,
  }), applyMiddleware(thunk),
);
