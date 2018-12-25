import React from 'react';

export default class OrderDetails extends React.Component {

    render() {
        return (
            <div class="container">						
            <div class="wrapper">
                <h2>Order Summary</h2>
                <table id = "orders-table">
                    <tr>
                        <th>Attendant ID</th>
                        <th>Attendant Name</th> 
                        <th>Order Id</th> 
                        <th>Time Created</th>
                        <th>Total Item</th>
                        <th>Order Price</th>
                    </tr>
                </table>
                <h2>Details</h2>
                <table id= "details-table" >
                    <tr>
                        <th>Product ID</th>
                        <th>Product Name</th> 
                        <th>Quantity</th> 
                        <th>Price per Product</th>
                        <th>Total Price</th>
                    </tr>
                </table>
            </div>
        </div>

        );
    }
}



