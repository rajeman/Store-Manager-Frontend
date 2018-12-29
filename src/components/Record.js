import React from 'react';
import { getFormattedTime } from '../helpers/time';
export default class Record extends React.Component {

    render() {
        //console.log(this.props.sale);
        const { sale } = this.props
        //console.log(sale);
        return (
                        <tr>
                            <td>{sale.user_id}</td>
                            <td>{sale.user_name}</td>
                            <td>{sale.order_id}</td>
                            <td>{getFormattedTime(sale.time_checked_out)}</td>
                            <td>{sale.order_quantity}</td>
                            <td>{sale.order_price}</td>
                        </tr>
        );
    }
}

