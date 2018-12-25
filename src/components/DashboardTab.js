import React from 'react';
import { NavLink } from 'react-router-dom';
export default class DashboardData extends React.Component {

    render() {
        return (
            <div className="container">
                <nav>
                    <ul>
                        
                        <li><NavLink to="/dashboard" activeClassName = "selected">Products</NavLink></li>
                        <li><NavLink to="/dashboard" activeClassName = "selected">Records</NavLink></li>
                        <li><NavLink to="#">Categories</NavLink></li>
                    </ul>
                </nav>
                {<NavLink to="/create-product"><input type="button" className="confirm checkout" value="New"></input> </NavLink>}
            </div>
        );
    }
}





