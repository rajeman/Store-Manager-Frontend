import React from 'react';
import Header from './Header';
import Footer from './Footer';
import AttendantCreateForm from './AttendantCreateForm';

export default class CreateAttendant extends React.Component {

    render() {

        return (
            <div>
                <Header />
                <AttendantCreateForm />
                <Footer />
            </div>
        );

    }
}