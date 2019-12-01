import React from 'react';
import {
    Link
} from 'react-router-dom'
import axios from 'axios';
import GlobalVariables from '../globalVariables';

const headers = {
    'Authorization': 'Bearer ' + localStorage.getItem("token")
}

class UserPosts extends React.Component {

    state = {
        posts: []
    }

    componentDidMount() {
        this.getPosts();
    }

    getPosts() {
        axios.get(GlobalVariables.backendUrl + "/posts/user", { headers: headers }, {})
            .then(data => this.setState({ ...this.state, posts: data.data }))
    }

    render() {
        if (localStorage.getItem("user") === null) {
            window.location.href = "/login";
        }
        else {
            return (
                <div>
                    <Link to="/profile">{"< Back to profile"}</Link>
                    <h1>Feel free to browse trough your posts.</h1>
                    {this.state.posts && this.state.posts.map((post, i) =>
                        <div className="post" key={i}>
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