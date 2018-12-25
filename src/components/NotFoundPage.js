import React from 'react';
import Header from './Header';
import Footer from './Footer';

export default class NotFoundPage extends React.Component {

    render() {

        return (
            <div>
                <Header />
                <p>404 The resource you requested is not on this server</p>
                <Footer />
            </div>
        );

    }
}