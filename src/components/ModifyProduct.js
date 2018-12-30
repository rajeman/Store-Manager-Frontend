import React from 'react';
import Header from './Header';
import Footer from './Footer';
import ProductModifyForm from './ProductModifyForm';

export default class ModifyProduct extends React.Component {

    render() {

        return (
            <div id="cover">
                <Header />
                <ProductModifyForm />
                <Footer />
            </div>
        );

    }
}