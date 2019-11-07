import React from 'react';
import axios from 'axios';
import '../css/AddPostPage.css'
import GlobalVariables from '../globalVariables'
import {
    Link,
} from "react-router-dom";
import Error from '../Error/Error';

const headers = {
    'Authorization': 'Bearer ' + localStorage.getItem("token")
}

class AddPostPage extends React.Component {

    state = {
        error: null,
        data: null,
        categories: []

    }

    componentDidMount() {
        axios.get(GlobalVariables.backendUrl + "/categories", {}).then(data => this.setState({ ...this.state, categories: data.data }));
    }

    uploadFileToServer = () => {
        axios.post(GlobalVariables.backendUrl + '/posts', this.state.data, {
            headers: headers
        }).then(() => { alert("File uploaded successfully") },
            error => {
                this.setState({ ...this.state, error: null})
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

        this.setState({ ...this.state, data: null });
        document.getElementById("image").value = null
        document.getElementById("title").value = null
        document.getElementById("category").value = null
    }

    setTitle = (title) => {
        const chunks = title.match(/.{1,18}/g);
        title = chunks.join(" ");
        const data = this.state.data == null ? new FormData() : this.state.data;
        data.delete('title')
        data.append('title', title)
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
        this.setState({ ...this.state, data: data });
    };

    render() {
        return (
            <div>
                {this.state.error && <Error message={this.state.error} />}
                <Link to="/home">{"< Back to posts"}</Link>
                <form onSubmit={event => event.preventDefault()} className="form">
                    <h2>Add post</h2>
                    <label>Category</label>
                    <select id="category" className="input" onChange={event => this.setCategory(event.target.value)}>
                        <option value="" defaultValue=""></option>
                        {this.state.categories.map((category, i) =>
                            <option value={category.name}>{category.name}</option>
                        )}
                    </select><br />
                    <input className="input" id="title" placeholder="Title" onBlur={event => this.setTitle(event.target.value)} /><br />
                    <label>Image </label>
                    <input className="input-file" id="image" name="image" type="file" onChange={this.handleUploadFile} /><br />
                    <button className="submit-button" onClick={this.uploadFileToServer.bind(this)}>Upload</button>
                </form>
            </div>
        );
    }
}

export default AddPostPage;