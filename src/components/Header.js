import React from 'react';

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
						<li><a href="./admin.html">Home</a></li>
						<li><a href="#">About</a></li>
						<li><a href="#">Services</a></li>
					</ul>
				</nav>
			</div>
		   </header>
        );

    }
}