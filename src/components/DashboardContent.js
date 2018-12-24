
import React from 'react';
import ProfileInfo from './ProfileInfo';
import DashboardData from './DashboardData';

export default class DashboardContent extends React.Component {

    render() {
        return (
            <div className="cont">
<section>
    <div className="page-content">
        <ProfileInfo />
        <DashboardData />
    </div>
</section>	
</div>
        );
    }
}

