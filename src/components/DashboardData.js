import React from 'react';
import { connect } from 'react-redux';
import ProductItems from './ProductItems';
import DashboardTab from './DashboardTab';
import Records from './Records';
import ProductDetails from './ProductDetails';
import Cart from './Cart';
import OrderDetails from './OrderDetails';

class DashboardData extends React.Component {
       
    render() {
            console.log(this.props.navigation.hash);
        return (
            <div className="attendant-content">
                <DashboardTab />
                {(this.props.navigation.hash === "#products" || this.props.navigation.hash === undefined)  && <ProductItems /> }
                {this.props.navigation.hash === "#records" &&  <Records /> }
                {this.props.navigation.hash === "#cart" &&  <Cart /> }
            </div>
        );
    }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(DashboardData); 


