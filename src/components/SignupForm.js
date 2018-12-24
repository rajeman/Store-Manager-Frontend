import React from 'react';

export default class Footer extends React.Component {

    render() {

        return (
            <div className="cont">
                <section>
                    <div id="user-form">
                        <div className="container">
                            <form method="post">
                                <h3>SignUp</h3>
                                <div>
                                    <label>Name:</label>
                                    <br />
                                    <input type="text" id="name" placeholder="Enter Name" name="uname" required></input>
                                </div>
                                <div>
                                    <label>Email:</label>
                                    <br />
                                    <input type="email" id="email" placeholder="Enter Email" name="uemail" required></input>
                                </div>
                                <div>
                                    <label>Password:</label>
                                    <br />
                                    <input type="password" id="password" placeholder="Enter Password" name="psw" required></input>
                                </div>
                                <div>
                                    <label>Password:</label>
                                    <br />
                                    <input type="password" id="password2" placeholder="Enter Password Again" name="psw" required></input>
                                </div>
                                <button type="submit">Login</button>
                                <br />
                                <div className="not-registered">
                                    <span className="pop-up"></span>
                                    <span className="lds-hourglass"></span>
                                    <span> Already registered? <a href="./login.html">Login</a></span>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>
            </div>
        );

    }
}


