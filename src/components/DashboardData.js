
import React from 'react';
import ProductItems from './ProductItems'
import DashboardTab from './DashboardTab';
export default class DashboardData extends React.Component {

    render() {
        return (
            <div className="attendant-content">
                <DashboardTab />
                <ProductItems />
            </div>
        );
    }
}



