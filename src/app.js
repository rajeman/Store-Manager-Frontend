import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import AppRouter from './routers/AppRouter';
import 'react-toastify/dist/ReactToastify.css';
import configureStore from './store/configureStore';
import 'normalize.css/normalize.css';
import './styles/styles.scss';

const store = configureStore();
const App = (
  <Provider store={store}>
    <AppRouter />
    <ToastContainer autoClose={4000} pauseOnFocusLoss={false} />
  </Provider>
);

ReactDOM.render(App, document.getElementById('app'));

