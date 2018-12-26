import React from 'react';




export default ({product}) =>  (
            <div className="item">
                <img src={require('../images/item1.jpg')} />
                <div className="quant-avail">
                    {product && product.product_quantity}
                            </div>
                <div className="name-description">
                {product && product.product_name}
                            </div>
                <div className="price">
                    $<span className="actual-price">{product && product.product_price}</span> per item
                            </div>
            </div>
    
);

