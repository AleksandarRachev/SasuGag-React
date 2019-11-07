import React, { Component } from 'react';
import Error from '../Error/Error';
import axios from 'axios';
import GlobalVariables from '../globalVariables';
import '../css/LoginPage.css';
import { connect } from 'react-redux';
import {loginActions} from '../actions/login.actions';
import { withRouter } from 'react-router-dom';


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

    // loginUser = () => {
    //     axios.post(GlobalVariables.backendUrl + '/users/login', {
    //         email: this.state.email,
    //         password: this.state.password
    //     }).then(response => {
    //         localStorage.setItem("token", response.data.token)
    //         window.location.href = "/home"
    //     },
    //         error => {
    //             this.setState({ ...this.state, error: null})
    //             if (error.response.data.message != null) {
    //                 this.setState({ ...this.state, error: "There was an error: " + error.response.data.message })
    //             }
    //             else {
    //                 this.setState({ ...this.state, error: "Oops there was a problem." })
    //             }
    //         });
    // }

    render() {

        return (
            <div>
                {this.state.error && <Error message={this.state.error} />}
                <form onSubmit={event => event.preventDefault()} className="form">
                    <h2>Login</h2>
                    <input className="input" placeholder="Email" onChange={event => this.setEmail(event.target.value)} /><br />
                    <input type="password" placeholder="Password" className="input" onChange={event => this.setPassword(event.target.value)} />
                    <div className="link-div">
                        <a className="submit-button" onClick={this.props.userLogin.bind(this,this.state.email, this.state.password)}>Login</a>
                        <a className="submit-button" href="/register">Register</a>
                    </div>
                </form>
            </div>
        );

    }
}

const mapStateToProps = state => {
    return state => ({
        isLoading:state.login.isLoading,
        error:state.login.error,
        authToken:state.login.authToken,
        isAuthenticated:state.login.isAuthenticated,
        user:state.login.user
    });
}

const mapDispatchToProps = dispatch => {
    return {userLogin: (email,password) => dispatch(loginActions.userLogin(email,password))};
};

export default connect (mapStateToProps, mapDispatchToProps) (withRouter(LoginPage));