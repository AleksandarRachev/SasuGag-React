import React from 'react';
import '../css/UserPosts.css';
import upvote from '../icons/upvote.png';
import upvoteActive from '../icons/upvote-active.png';
import downvoteActive from '../icons/downvote-active.png';
import downvote from '../icons/downvote.png';
import comment from '../icons/comment.png';
import InfiniteScroll from "react-infinite-scroll-component";
import {
    Link
} from 'react-router-dom'
import axios from 'axios';
import GlobalVariables from '../globalVariables';
import Error from '../Error/Error';
import { throwStatement } from '@babel/types';

const headers = {
    'Authorization': 'Bearer ' + localStorage.getItem("token")
}

class UserPosts extends React.Component {

    state = {
        posts: [],
        maxPosts: 0,
        page: 0,
        error: null
    }

    componentDidMount() {
        axios.get(GlobalVariables.backendUrl + "/posts/user?page=" + this.state.page, { headers: headers }, {})
            .then(data => this.setState({
                posts: data.data.posts,
                maxPosts: data.data.maxPosts
            }))
    }

    getPosts(page) {
        axios.get(GlobalVariables.backendUrl + "/posts/user?page=" + page, { headers: headers }, {})
            .then(data => this.setState({ ...this.state, posts: this.state.posts.concat(data.data.posts) }))
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

    fetchMoreData = () => {
        this.setState({ ...this.state, page: this.state.page + 1 })
        this.getPosts(this.state.page)
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
                    <InfiniteScroll
                        dataLength={this.state.posts.length}
                        next={this.fetchMoreData}
                        hasMore={this.state.posts.length < this.state.maxPosts}
                        loader={<h4>Loading...</h4>}
                    >
                        {this.state.posts && this.state.posts.map((post, i) =>
                            <div className="post" key={i}>
                                <h2><Link className="link" to={"/posts/" + post.uid} target="_blank">{post.title}</Link></h2><br />
                                <img className="image" alt={post.title} src={GlobalVariables.backendUrl + '/posts/image/' + post.uid} width="350" />
                                <div className="info">
                                    <p className="points">{post.points} points . </p>
                                    <p className="points">{post.comments} comments</p>
                                </div>
                                {/* <div className="post-buttons">
                                    <img className="vote-button" alt="" src={(post.voteOnPost && post.voteOnPost.up) ? upvoteActive : upvote} onClick={this.votePost.bind(this, post, i, "up")} />
                                    <img className="vote-button" alt="" src={(post.voteOnPost && post.voteOnPost.down) ? downvoteActive : downvote} onClick={this.votePost.bind(this, post, i, "down")} />
                                    <img className="comment-button-icon" alt="" src={comment} onClick={this.goToPost.bind(this, post.uid)} />
                                </div> */}
                            </div>
                        )}
                    </InfiniteScroll>
                </div>
            );
        }
    }

}

export default UserPosts;