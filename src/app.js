import React from 'react';
import ReactDOM from 'react-dom';
import Login from './components/Login'
import 'normalize.css/normalize.css';
import './styles/styles.scss';



//console.log(testtingg)
const Layout = () => {
    return (
        <div>
        <Login />
        </div>
    );
};

const template = (
    <div>
    <h1>Page Title</h1>
    <p>This is my page</p>
    </div>
);
ReactDOM.render(<Layout />, document.getElementById('app'));

 