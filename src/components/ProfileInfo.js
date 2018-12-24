import React from 'react';


export default class ProfileInfo extends React.Component {

    render() {

        return (
            <div className="profile-info">
                <div className="profile-photo-container"></div>
                <div className="label">Name:</div>
                <div className="details">Jax Bishop</div>
                <div className="label">Email:</div>
                <div className="details">bishopjack@gmail.com</div>
                <div className="label">Job Title:</div>
                <div className="details">Admin</div>
                <div className="label">Last logged in:</div>
                <div className="details">09-Oct-18 4:07pm</div>
            </div>
        );

    }
}