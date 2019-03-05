import React from 'react';
import ProfileInfo from './ProfileInfo';

export default class Dropdown extends React.Component {

  render() {
    return (
      <div className="dropdown">
        <img src={require('../images/icon-menu.png')} />
        <ProfileInfo />
      </div>
    );
  }
}

