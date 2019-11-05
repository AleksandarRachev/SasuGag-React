import React, { Component } from 'react'
import Error from '../Error/Error';
import axios from 'axios'
import GlobalVariables from '../globalVariables'

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
            window.location.href = "/home"
        },
            error => {
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
                    <label>Email</label>
                    <input className="input" onChange={event => this.setEmail(event.target.value)} /><br />
                    <label>Password</label>
                    <input type="password" className="input" onChange={event => this.setPassword(event.target.value)} />
                    <button onClick={this.loginUser.bind(this)}>Login</button>
                </form>
            </div>
        );

    }
}

export default LoginPage;