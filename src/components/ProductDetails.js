import React from 'react';

export default class ProductDetails extends React.Component {

    render() {
        return (

            <div className="items-box">
                <div class="product-details" id="product">
                    <img src={require("../images/item1.jpg")} />
                    <div class="quant-avail"></div>
                    <div class="min-invent"></div>
                    <div class="name-description detailed-description"></div>
                    <div class="price detailed-price">
                        $<span class="actual-price"></span> per item
                                </div>
                    <input type="button" class="confirm modify" id="modify" value="Modify"></input>
                    <input type="button" class="delete" value="Delete" onclick="displayDialog();"></input>
                </div>

            </div>

        );
    }
}

