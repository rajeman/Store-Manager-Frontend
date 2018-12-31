import React from 'react';
import { connect } from 'react-redux';
import { fetchUser } from '../actions/auth';
import ButtonNewAttendant from './ButtonNewAttendant';


class ProfileInfo extends React.Component {
    componentDidMount() {
       this.props.dispatch(fetchUser());
    }
    render() {
            const {userDetails} = this.props.auth;
        return userDetails != undefined && (
            <div className="profile-info">
                <div className="profile-photo-container"></div>
                <div className="label">Name:</div>
                <div className="details">{userDetails.username}</div>
                <div className="label">Email:</div>
                <div className="details">{userDetails.email}</div>
                <div className="label">Job Title:</div>
                <div className="details">{userDetails.level === 2 ? 'Admin' : 'Attendant'}</div>
                <div className="label">Last logged in:</div>
                <div className="details">09-Oct-18 4:07pm</div>
                {userDetails.level === 2 && <ButtonNewAttendant />}
            </div>
        );

    }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(ProfileInfo); 
