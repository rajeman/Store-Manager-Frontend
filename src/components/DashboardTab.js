import React from 'react';

export default class DashboardData extends React.Component {

    render() {
        return (
            <div className="container">
                <nav>
                    <ul>
                        <li><a href="#"><span className="selected">Products</span></a></li>
                        <li><a href="./admin-records.html">Records</a></li>
                        <li><a href="#">Categories</a></li>
                    </ul>
                </nav>
                {<input type="button" className="confirm checkout" value="New" onclick="window.location.href='./create-product.html';"></input>}
            </div>
        );
    }
}





