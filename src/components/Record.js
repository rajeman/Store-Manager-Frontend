import React from 'react';
import { history } from '../routers/AppRouter';
import { getFormattedTime } from '../helpers/time';
export default class Record extends React.Component {

  render() {
    const { sale } = this.props
    return (
      <tr onClick={() => {
        history.push(`/dashboard/records/${sale.time_checked_out}`)
      }
      }>
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

