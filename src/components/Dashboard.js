import React from 'react';
import { connect } from 'react-redux';
import { history } from '../routers/AppRouter';
import Header from './Header';
import Footer from './Footer';
import Dropdown from './Dropdown';
import DashboardContent from './DashboardContent';
import { setNavigation } from '../actions/navigation';
import { getToken } from '../helpers/auth';

class Dashboard extends React.Component {
  componentDidMount() {
    this.props.dispatch(setNavigation({
      id: this.props.match.params.id,
      urlPath: this.props.match.path
    }));
  }
  render() {
    if (getToken('Authorization') === 'undefined') {
      history.push('/');
    }
    return (
      <div id="cover">
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
