import React, { Component } from 'react'
import Error from '../Error/Error';
import axios from 'axios'
import GlobalVariables from '../globalVariables'

class RegisterPage extends Component {

    state = {
        email: null,
        username: null,
        password: null
    }

    setEmail = (email) => {
        this.setState({ ...this.state, email: email })
    }

    setPassword = (password) => {
        this.setState({ ...this.state, password: password })
    }

    setUsername = (username) => {
        this.setState({ ...this.state, username: username })
    }

    registerUser = () => {
        axios.post(GlobalVariables.backendUrl + '/users', {
            email: this.state.email,
            password: this.state.password,
            username: this.state.username
        }).then(response => {
            localStorage.setItem("user", response.data.username)
            alert("Register successfull");
            window.location.href="/login"
        },
            error => {
                this.setState({ ...this.state, error: null})
                if (error.response.data.errors != null) {
                    this.setState({ ...this.state, error: "There was an error: " + error.response.data.errors[0].defaultMessage })
                } else {
                    if (error.response.data.message != null) {
                        this.setState({ ...this.state, error: "There was an error: " + error.response.data.message })
                    } else {
                        this.setState({ ...this.state, error: "Oops there was a problem." })
                    }
                }
            });
    }

    render() {

        return (
            <div>
                {this.state.error && <Error message={this.state.error} />}
                <form onSubmit={event => event.preventDefault()} className="form">
                    <h2>Register</h2>
                    <input className="input" placeholder="* Email" required onChange={event => this.setEmail(event.target.value)} />
                    <input className="input" placeholder="Username" onChange={event => this.setUsername(event.target.value)} />
                    <input type="password" className="input" placeholder="* Password" required onChange={event => this.setPassword(event.target.value)} />
                    <div className="input-div">
                        <a className="submit-button" onClick={this.registerUser.bind(this)}>Register</a>
                    </div>
                </form>
            </div>
        );

    }
}

export default RegisterPage;