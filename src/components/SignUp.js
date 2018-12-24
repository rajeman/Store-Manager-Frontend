import React from 'react';
import Header from './Header';
import Footer from './Footer';
import SignupForm from './SignupForm';

export default class Login extends React.Component {

    render() {

        return (
            <div id="cover" >
                <Header />
                <SignupForm />
                <Footer />
            </div>
        );

    }
}