import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../actions/auth';
import { NavLink } from 'react-router-dom';

class Signout extends React.Component {
    
    render() {
           
        return (
            <li ><a href = "" onClick={(e) => {
                e.preventDefault();
                console.log(this.props);
                this.props.dispatch(logout());
            }}>Signout</a></li> 
        );
    }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Signout); 
