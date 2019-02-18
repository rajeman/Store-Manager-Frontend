import React from 'react';
import { history } from '../routers/AppRouter';
import paths from '../helpers/paths';


export default ({ product }) => (
  <div
className="item"
onClick = {() =>
                {
                  history.push(paths.products + `/${product.product_id}`)
                }}
            >
              <img src={require('../images/item1.jpg')} />
              <div className="quant-avail">
                  {product && product.product_quantity}
{' '}
available
</div>
              <div className="name-description">
                  {product && product.product_name}
                </div>
              <div className="price">
                    $
<span className="actual-price">{product && product.product_price}</span>
{' '}
per item
</div>
            </div>

);
