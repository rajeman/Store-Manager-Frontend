import React from 'react';


export default props => (

  <div
className="item"
onClick={()=>{
        props.handleClick(props.item.product_id)
    }}
    >
      <img src={require('../images/item1.jpg')} />
      <div className="quant-avail">
          {props.item.product_quantity}
{' '}
in cart
</div>
      <div className="name-description">
          {props.item.product_name}
        </div>
      <div className="price">
            $
<span className="actual-price">{props.item.product_price}</span>
{' '}
per item
</div>
    </div>
);
