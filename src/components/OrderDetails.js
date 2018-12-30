import React from 'react';
import { connect } from 'react-redux';
import { fetchSale } from '../actions/records';
import Record from './Record';
import OrderDetail from './OrderDetail';

 class OrderDetails extends React.Component {
    componentDidMount(){
        this.props.dispatch(fetchSale(this.props.id));
    }
    render() {
        //console.log(this.props.sales.sale);
        const { sale } = this.props.sales;
        console.log(sale);
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
                {sale[0] && <Record sale={sale[0]} key = {sale.order_id}/>}
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
                    {sale.map((detail) =>
                        (
                            <OrderDetail detail = {detail}/>
                        )
                    )}
                </table>
            </div>
        </div>

        );
    }
}

const mapStateToProps = (state) => state;

export default connect( mapStateToProps)(OrderDetails); 



