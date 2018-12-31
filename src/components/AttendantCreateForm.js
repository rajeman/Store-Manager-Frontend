import React from 'react';
import { connect } from 'react-redux';
import { createAttendant } from '../actions/attendants'

class AttendantCreateForm extends React.Component {
    
    render() {
        const onFormSubmit = (e) => {
            //console.log(this.props);
             e.preventDefault();
             const name = e.target.elements.aname.value.trim();
             const email = e.target.elements.aemail.value.trim();
             this.props.dispatch(createAttendant(name, email));
         } 
        const { attendantCreateState, attendantCreateError} = this.props.attendants;
        return (
            <div className="cont">
                <section>
                    <div id="user-form">
                        <div className="container">
                            <form onSubmit = {onFormSubmit}>
                                <h3>New Attendant</h3>
                                <div>
                                    <label>Name:</label>
                                    <br />
                                    <input type="text" id="name" placeholder="Enter Attendant's Name" name="aname" pattern=".{3,}" required title="Name must be at least 3 characters"></input>
                                </div>
                                <div>
                                    <label>Email:</label>
                                    <br />
                                    <input type="email" id="email" placeholder="Enter Attendant's Email" name="aemail" required></input>
                                </div>
                                <div className="not-registered">
                                    {attendantCreateState === 'STATE_CREATE_FAILED' && <span className="pop-up">{attendantCreateError}</span>}
                                    {attendantCreateState === 'STATE_CREATING' && <span className="lds-hourglass"></span>}
                                </div>
                                <button type="submit">Create</button>
                                <br />
                            </form>
                        </div>
                    </div>
                </section>
            </div>
        );

    }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(AttendantCreateForm); 


