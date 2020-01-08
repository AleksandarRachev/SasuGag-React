import React from 'react';
import axios from 'axios';
import GlobalVariables from '../globalVariables';
import {
    Link,
} from "react-router-dom";
import Error from '../Error/Error';

const headers = {
    'Authorization': 'Bearer ' + localStorage.getItem("token")
}

class AddCategorypage extends React.Component {

    state = {
        category: null
    }

    componentDidMount() {
        this.checkIfUserAdmin()
    }

    checkIfUserAdmin() {
        if (localStorage.getItem("token") === null || JSON.parse(localStorage.getItem("user")).role !== "ADMIN") {
            window.location.href = "/home"
        }
    }

    addCategory = () => {
        axios.post(GlobalVariables.backendUrl + '/categories', {
            name: this.state.category
        }, {headers: headers}).then(() => {
            alert("Category added successfully")

            this.setState({ ...this.state, category: null });
            document.getElementById("category").value = null
        },
            error => {
                this.setState({ ...this.state, error: null })
                if (error.response.data.errors != null) {
                    this.setState({ ...this.state, error: "There was an error: " + error.response.data.errors[0].defaultMessage })
                }
                else {
                    if (error.response.data.message != null) {
                        this.setState({ ...this.state, error: "There was an error: " + error.response.data.message })
                        if (error.response.status === 403) {
                            window.location.href = "/login"
                            localStorage.clear();
                        }
                    }
                    else {
                        this.setState({ ...this.state, error: "Oops there was a problem." })
                    }
                }
            });
    }

    setCategory = category => {
        this.setState({ ...this.state, category: category })
    }

    render() {
        return (
            <div>
                {this.state.error && <Error message={this.state.error} />}
                <Link to="/home">{"< Back to posts"}</Link>
                <form onSubmit={event => event.preventDefault()} className="form">
                    <h2>Add category</h2>
                    <input className="input" id="category" placeholder="Category" onBlur={event => this.setCategory(event.target.value)} /><br />
                    <button className="submit-button" onClick={this.addCategory.bind(this)}>Upload</button>
                </form>
            </div>
        );
    }

}

export default AddCategorypage;