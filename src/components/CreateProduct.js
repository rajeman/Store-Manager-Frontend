import React from 'react';
import Header from './Header';
import Footer from './Footer';
import ProductCreateForm from './ProductCreateForm';

export default class CreateProduct extends React.Component {

    render() {

        return (
            <div>
                <Header />
                <ProductCreateForm />
                <Footer />
            </div>
        );

    }
}