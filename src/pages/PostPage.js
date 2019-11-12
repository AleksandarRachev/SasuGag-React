import React from 'react';
import axios from 'axios';
import GlobalVariables from '../globalVariables';
import '../css/ProductPage.css'

class PostPage extends React.Component {

    state = {
        post: null
    }

    componentDidMount() {
        const postId = window.location.href.split("/posts/")[1];
        this.getPost(postId);
    }

    getPost = postId => {
        axios.get(GlobalVariables.backendUrl + "/posts/" + postId, {}).then(data => this.setState({ ...this.state, post: data.data }));
    }

    render() {

        if (this.state.post) {
            return (
                <div className="single-post">
                    <h1>{this.state.post != null ? this.state.post.title : ""}</h1>
                            <p>{this.state.post.userUsername != null ? "by " + this.state.post.userUsername : ""}</p>
                    <img className="image" alt={this.state.post.title} src={GlobalVariables.backendUrl + '/posts/image/' + this.state.post.uid} width="350" />
                </div>
            );
        }
        else{
            return null;
        }

    }

}

export default PostPage;