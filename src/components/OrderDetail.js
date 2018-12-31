import React from 'react';
import { history } from '../routers/AppRouter';
export default class OrderDetail extends React.Component {

    render() {
        //console.log(this.props.sale);
        const { detail } = this.props
        //console.log(sale);
        return (
                        <tr>
                            <td>{detail.product_id}</td>
                            <td>{detail.product_name}</td>
                            <td>{detail.product_quantity}</td>
                            <td>{detail.product_price}</td>
                            <td>{detail.total_price}</td>
                        </tr>
        );
    }
}

