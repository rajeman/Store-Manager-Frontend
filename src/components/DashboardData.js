
import React from 'react';
import ProductItems from './ProductItems';
import DashboardTab from './DashboardTab';
import Records from './Records';
import ProductDetails from './ProductDetails';
import Cart from './Cart';
import OrderDetails from './OrderDetails';
export default class DashboardData extends React.Component {

    render() {
        return (
            <div className="attendant-content">
                <DashboardTab />
                {/*<ProductItems /> */}
        {/* <Records /> */}
        {/*<ProductDetails /> */}
        {/*<OrderDetails />*/}
        <Cart />
            </div>
        );
    }
}



