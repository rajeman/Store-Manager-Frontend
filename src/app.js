import React from 'react';
import ReactDOM from 'react-dom';
import SignUp from './components/SignUp';
import 'normalize.css/normalize.css';
import './styles/styles.scss';



const template = (
    <div>
    <h1>Page Title</h1>
    <p>This is my page</p>
    </div>
);
ReactDOM.render(<SignUp />, document.getElementById('app'));

 