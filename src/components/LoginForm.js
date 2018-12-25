import React from 'react';

export default class LoginForm extends React.Component {

    render() {

        return (
            <div className="cont">
                <section>
                    <div id="user-form">
                        <div className="container">
                            <form method="post" action="javascript:login()">
                                <h3>User Login</h3>
                                <div>
                                    <label>Email:</label>
                                    <br />
                                    <input type="email" id="email" placeholder="Enter Email" name="uname" required></input>
                                </div>
                                <div>
                                    <label>Password:</label>
                                    <br />
                                    <input type="password" id="password" placeholder="Enter Password" name="psw" required></input>
                                </div>
                                <button type="submit">Login</button>
                                <br />
                                <div className="not-registered">
                                    <span className="pop-up"></span>
                                    <span className="lds-hourglass"></span>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>
            </div>
        );

    }
}


