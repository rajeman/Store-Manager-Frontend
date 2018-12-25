import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Dropdown from './Dropdown';
import DashboardContent from './DashboardContent'

export default class Dashboard extends React.Component {

    render() {
        return (
            <div >
                <Header>
                    <Dropdown />
                </Header>
                <DashboardContent />
                <Footer />
            </div>
        );
    }
}