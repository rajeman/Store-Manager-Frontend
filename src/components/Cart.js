import React from 'react';

export default class Cart extends React.Component {

    render() {
        return (
            <div className="container">
                <div className="wrapper">
                    <div class="container">
                        <div class="wrapper">
                            <span class="tip">Click on item to remove</span>
                            <input type="button" class="confirm checkout" value="checkout" onclick="doCheckout();"></input>
                            <div class="items-box">
                                <div class="item" onclick="gotoProductAttendant()">
                                    <img src={require('../images/item1.jpg')} />
                                    <div class="quant-avail">
                                    </div>
                                    <div class="name-description">
                                    </div>
                                    <div class="price">
                                        $<span class="actual-price"></span> per item
                            </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}



