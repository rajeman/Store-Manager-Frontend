import React from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import Footer from './Footer';
import Dropdown from './Dropdown';
import DashboardContent from './DashboardContent';
import { setNavigation } from '../actions/navigation';

class Dashboard extends React.Component {
    componentDidMount() {
        this.props.dispatch(setNavigation(this.props.location))
    }
    render() {        
        return (
            <div id = "cover">
                <Header>
                    <Dropdown />
                </Header>
                <DashboardContent />
                <Footer />   
            </div>
        );
    }
}

const mapStateToProps = (state) => state;


export default connect(mapStateToProps)(Dashboard); 