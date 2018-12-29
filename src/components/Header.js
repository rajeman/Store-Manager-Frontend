import React from 'react';
import { NavLink } from 'react-router-dom';
import { history } from '../routers/AppRouter';
import Signout from './Signout';

export default class Header extends React.Component {

    render() {
		
        return (
            <header>
			<div className = "container">
				<div id="website-logo">
					<h1>Store Manager</h1> 
				</div>			
				<nav>
					<ul>
						<li> <NavLink to = "/dashboard/products"></NavLink>Home</li>
						<li><a href="#">About</a></li>
						<li><a href="#">Services</a></li> 
						{ history.location.pathname && history.location.pathname.includes('/dashboard/') && <Signout /> }
					</ul>
				</nav>
			</div>
		   </header>
        );

    }
}

