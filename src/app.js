import React from 'react';
import ReactDOM from 'react-dom';
import Dashboard from './components/Dashboard'
import 'normalize.css/normalize.css';
import './styles/styles.scss';



const template = (
    <div>
    <h1>Page Title</h1>
    <p>This is my page</p>
    </div>
);
ReactDOM.render(<Dashboard />, document.getElementById('app'));

 