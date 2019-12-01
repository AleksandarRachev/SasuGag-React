import React from 'react';
import '../css/UserPosts.css';
import {
    Link
} from 'react-router-dom'
import axios from 'axios';
import GlobalVariables from '../globalVariables';
import Error from '../Error/Error';

const headers = {
    'Authorization': 'Bearer ' + localStorage.getItem("token")
}

class UserPosts extends React.Component {

    state = {
        posts: [],
        error: null
    }

    componentDidMount() {
        this.getPosts();
    }

    getPosts() {
        axios.get(GlobalVariables.backendUrl + "/posts/user", { headers: headers }, {})
            .then(data => this.setState({ ...this.state, posts: data.data }))
    }

    deletePost = (postId) => {
        if (window.confirm("Are you sure you want to delete this post?")) {
            axios.delete(GlobalVariables.backendUrl + "/posts/" + postId, { headers: headers }, {})
                .then(() => {
                    alert("You deleted this post successfly")
                    window.location.href = "user-posts"
                }, error => {
                    this.setState({ ...this.state, error: null })
                    this.setState({ ...this.state, error: "There was an error: " + error.response.data.message })
                })
        }
    }

    render() {
        if (localStorage.getItem("user") === null) {
            window.location.href = "/login";
        }
        else {
            return (
                <div>
                    {this.state.error && <Error message={this.state.error} />}
                    <Link to="/profile">{"< Back to profile"}</Link>
                    <h1>Feel free to browse trough your posts.</h1>
                    {this.state.posts && this.state.posts.map((post, i) =>
                        <div className="post" key={i}>
                            <button className="user-post-button" onClick={this.deletePost.bind(this, post.uid)}>X</button>
                            <h2><Link className="link" to={"/posts/" + post.uid} target="_blank">{post.title}</Link></h2><br />
                            <img className="image" alt={post.title} src={GlobalVariables.backendUrl + '/posts/image/' + post.uid} width="350" />
                            <div className="info">
                                <p className="points">{post.points} points . </p>
                                <p className="points">{post.comments} comments</p>
                            </div>
                        </div>
                    )}
                </div>
            );
        }
    }

}

export default UserPosts;