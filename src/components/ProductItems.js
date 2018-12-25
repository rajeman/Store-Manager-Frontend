import React from 'react';
import Product from './Product'

export default class ProductItems extends React.Component {

    render() {
        return (
            <div className="container">
                <div className="wrapper">
                    <div className="items-box">
                        <Product />
                    </div>
                </div>
            </div>
        );
    }
}