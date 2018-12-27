import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

class DashboardData extends React.Component {

    render() {
        const {auth} = this.props;
        return (
            <div className="container">
                <nav>
                    <ul>
                        
                        <li><NavLink to="/dashboard#products" activeClassName = "selected">Products</NavLink></li>
                        <li><NavLink to="/dashboard#records" activeClassName = "selected">Records</NavLink></li>
                        {auth.level === 2 ? <li><NavLink to="#">Categories</NavLink></li> : <li><NavLink to="/dashboard#cart" activeClassName = "selected">Cart</NavLink></li> }
                    </ul>
                </nav>
                {auth.level === 2 && <NavLink to="/create-product"><input type="button" className="confirm checkout" value="New"></input> </NavLink>}
            </div>
        );
    }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(DashboardData); 






