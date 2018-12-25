import React from 'react';

export default class AttendantCreateForm extends React.Component {

    render() {

        return (
            <div className="cont">
                <section>
                    <div id="user-form">
                        <div className="container">
                            <form method="post" onsubmit=" return createAttendant();">
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
                                    <span class="pop-up"></span>
                                    <span class="lds-hourglass"></span>
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


