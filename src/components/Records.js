import React from 'react';

export default class Records extends React.Component {

    render() {
        return (
            <div class="container">
                <div class="wrapper">
                    <table id="orders-table">
                        <tr>
                            <th>Attendant ID</th>
                            <th>Attendant Name</th>
                            <th>Order Id</th>
                            <th>Time Created</th>
                            <th>Total Item</th>
                            <th>Order Price</th>
                        </tr>
                    </table>
                </div>
            </div>
        );
    }
}

