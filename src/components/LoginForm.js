import React from 'react';
import { connect } from 'react-redux';
import { login } from '../actions/auth';

class LoginForm extends React.Component {

    render() {
       const onFormSubmit = (e) => {
            e.preventDefault();
            const email = e.target.elements.uname.value.trim();
            const password = e.target.elements.psw.value.trim();
            this.props.dispatch(login(email, password));
            
        };
        return (
            <div className="cont">
                <section>
                    <div id="user-form">
                        <div className="container">
                            <form onSubmit={onFormSubmit} >
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

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(LoginForm); 


