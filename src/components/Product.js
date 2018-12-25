import React from 'react';

export default class Product extends React.Component {

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

