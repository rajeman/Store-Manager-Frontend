import React from 'react';
import { connect } from 'react-redux';
import { history } from '../routers/AppRouter';
import paths from '../helpers/paths';
import ProductItems from './ProductItems';
import DashboardTab from './DashboardTab';
import Records from './Records';
import ProductDetails from './ProductDetails';
import Cart from './Cart';
import OrderDetails from './OrderDetails';

class DashboardData extends React.Component {
  render() {
    const { pathname } = history.location;
    const { urlPath, id } = this.props.navigation;
    return (
      <div className="attendant-content">
        <DashboardTab pathname={pathname} />
        {pathname === paths.products && <ProductItems />}
        {pathname === paths.records && <Records />}
        {pathname === paths.cart && <Cart />}
        {urlPath != undefined && urlPath.includes('/records/') && id && <OrderDetails id={id} />}
        {urlPath != undefined && urlPath.includes('/products/') && id && <ProductDetails id={id} />}
      </div>
    );
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(DashboardData);


