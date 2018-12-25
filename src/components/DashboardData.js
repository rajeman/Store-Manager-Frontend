
import React from 'react';
import ProductItems from './ProductItems';
import DashboardTab from './DashboardTab';
import Records from './Records';
import ProductDetails from './ProductDetails';
export default class DashboardData extends React.Component {

    render() {
        return (
            <div className="attendant-content">
                <DashboardTab />
                {/*<ProductItems /> */}
        {/* <Records /> */}
                <ProductDetails />
            </div>
        );
    }
}



