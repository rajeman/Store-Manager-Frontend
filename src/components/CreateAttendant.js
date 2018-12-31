import React from 'react';
import { connect } from 'react-redux';
import { fetchUser } from '../actions/auth';
import Header from './Header';
import Footer from './Footer';
import AttendantCreateForm from './AttendantCreateForm';
import NotFoundPage from './NotFoundPage';


class CreateAttendant extends React.Component {
    componentDidMount(){
        this.props.dispatch(fetchUser());
    }
    render() {
        const { level } = this.props.auth.userDetails;
        if(level === 1){
            return (
                <NotFoundPage />
            )
        }
        return level === 2 ? (
            <div id = "cover">
                <Header />
                <AttendantCreateForm />
                <Footer />
            </div>
        ) : <div></div>

    }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(CreateAttendant); 

