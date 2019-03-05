import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../actions/auth';

class Signout extends React.Component {
  render() {
    return (
      <li ><a href="" onClick={(e) => {
        e.preventDefault();
        this.props.dispatch(logout());
      }}>Signout</a></li>
    );
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Signout);
