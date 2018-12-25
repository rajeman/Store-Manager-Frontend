import React from 'react';
import ReactDOM from 'react-dom';
import Dashboard from './components/Dashboard'
import CreateProduct from './components/CreateProduct';
import Login from './components/Login';
import ModifyProduct from './components/ModifyProduct';
import CreateAttendant from './components/CreateAttendant';
import 'normalize.css/normalize.css';
import './styles/styles.scss';



const template = (
    <div>
    <h1>Page Title</h1>
    <p>This is my page</p>
    </div>
);
ReactDOM.render(<Login />, document.getElementById('app'));

 