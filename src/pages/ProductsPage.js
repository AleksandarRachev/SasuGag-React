import React from 'react';
import axios from 'axios';
import '../css/ProductsPage.css'
import GlobalVariables from '../globalVariables'
import {
    Link,
} from "react-router-dom";
import Error from '../Error/Error';

const headers = {
    'Authorization': 'Bearer ' + localStorage.getItem("token")
}

class ProductsPage extends React.Component {
    state = {
        error: null,
        data: null
    }

    uploadFileToServer = () => {
        console.log("state error "+this.state.error)
        axios.post(GlobalVariables.backendUrl + '/products', this.state.data, {
            headers: headers
        }).then(() => { alert("File uploaded successfully") },
            error => {
                if (error.response.data.message != null) {
                    this.setState({ ...this.state, error: "There was an error: " + error.response.data.message })
                    if (error.response.status === 403) {
                        window.location.href = "/login"
                    }
                }
                else {
                    this.setState({ ...this.state, error: "Oops there was a problem." })
                }
            });

            this.setState({...this.state, error:""});
        this.setState({ ...this.state, data: null });
        document.getElementById("image").value = null
        document.getElementById("name").value = null
        document.getElementById("category").value = null
    }

    setName = (name) => {
        const data = this.state.data == null ? new FormData() : this.state.data;
        data.delete('name')
        data.append('name', name)
        this.setState({ ...this.state, data: data })
    }

    setCategory = (category) => {
        const data = this.state.data == null ? new FormData() : this.state.data;
        data.delete('category')
        data.append('category', category)
        this.setState({ ...this.state, data: data })
    }


    handleUploadFile = (event) => {
        const data = this.state.data == null ? new FormData() : this.state.data;
        let file = event.target.files[0];
        data.append('file', file);
        this.setState({ ...this.state, data: data })
    };

    render() {
        return (
            <div>
                {this.state.error && <Error message={this.state.error} />}
                <Link to="/home">{"< Back to products"}</Link>
                <form onSubmit={event => event.preventDefault()} className="form">
                    <label>Category</label>
                    <select id="category" className="input" onChange={event => this.setCategory(event.target.value)}>
                        <option value="" defaultValue=""></option>
                        <option value="Funny">Funny</option>
                        <option value="Sad">Sad</option>
                    </select><br />
                    <label>Title </label>
                    <input className="input" id="name" onBlur={event => this.setName(event.target.value)} /><br />
                    <label>Image </label>
                    <input className="input" id="image" type="file" onChange={this.handleUploadFile} /><br />
                    <button onClick={this.uploadFileToServer.bind()}>Upload</button>
                </form>
            </div>
        );
    }
}

export default ProductsPage;