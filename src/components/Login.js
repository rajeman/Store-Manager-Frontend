import React from 'react';
import Header from './Header';
import Footer from './Footer'
import LoginForm from './LoginForm'

export default class Login extends React.Component {

    render() {
        return (
            <div id="cover">
                <Header />
                <LoginForm />
                <Footer />
            </div>
        );

    }
}
