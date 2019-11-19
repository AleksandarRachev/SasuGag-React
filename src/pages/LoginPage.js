import React, { Component } from 'react'
import Error from '../Error/Error';
import axios from 'axios'
import GlobalVariables from '../globalVariables'
import '../css/LoginPage.css'
import {
    Link,
} from "react-router-dom";

class LoginPage extends Component {

    state = {
        email: null,
        password: null
    }

    setEmail = (email) => {
        this.setState({ ...this.state, email: email })
    }

    setPassword = (password) => {
        this.setState({ ...this.state, password: password })
    }

    loginUser = () => {
        axios.post(GlobalVariables.backendUrl + '/users/login', {
            email: this.state.email,
            password: this.state.password
        }).then(response => {
            localStorage.setItem("token", response.data.token)
            localStorage.setItem("role", response.data.userResponse.role)
            window.location.href = "/home"
        },
            error => {
                this.setState({ ...this.state, error: null})
                if (error.response.data.message != null) {
                    this.setState({ ...this.state, error: "There was an error: " + error.response.data.message })
                }
                else {
                    this.setState({ ...this.state, error: "Oops there was a problem." })
                }
            });
    }

    render() {

        return (
            <div>
                {this.state.error && <Error message={this.state.error} />}
                <form onSubmit={event => event.preventDefault()} className="form">
                    <h2>Login</h2>
                    <input className="input" placeholder="Email" onChange={event => this.setEmail(event.target.value)} /><br />
                    <input type="password" placeholder="Password" className="input" onChange={event => this.setPassword(event.target.value)} />
                    <div className="link-div">
                        <button className="submit-button" type="submit" onClick={this.loginUser.bind(this)}>Login</button>
                        <button className="submit-button"><Link to="/register">Register</Link></button>
                    </div>
                </form>
            </div>
        );

    }
}

export default LoginPage;