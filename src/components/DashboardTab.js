import React from 'react';
import { connect } from 'react-redux';
import { NavLink, Link, withRouter } from 'react-router-dom';
import { history } from '../routers/AppRouter';
import paths from '../helpers/paths';

class DashboardData extends React.Component {

  render() {
    const { auth } = this.props;
    const { pathname } = this.props;
    return (
      <div className="container">
        <nav>
          <ul>
            <li><a><NavLink to={paths.products}><span className={pathname.includes(paths.products) ? 'selected' : 'clickable'}>Products</span></NavLink></a></li>
            <li><a><NavLink to={paths.records}><span className={pathname.includes(paths.records) ? 'selected' : 'clickable'}>Records</span></NavLink></a></li>
            {auth.userDetails.level === 1 && <li ><a><NavLink to={paths.cart}><span className={pathname.includes(paths.cart) ? 'selected' : 'clickable'}>Cart</span></NavLink></a></li>}
          </ul>
        </nav>
        {auth.userDetails.level === 2 && pathname.includes(paths.products) && <input type="button" className="confirm checkout" value="New" onClick={() => {
          history.push(paths.createProduct);
        }}></input>}

      </div>
    );
  }
}

const mapStateToProps = (state) => state;

export default withRouter(connect(mapStateToProps, {})(DashboardData));






