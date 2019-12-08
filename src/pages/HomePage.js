import React from 'react';
import axios from 'axios';
import GlobalVariables from '../globalVariables'
import '../css/HomePage.css'
import upvote from '../icons/upvote.png';
import upvoteActive from '../icons/upvote-active.png';
import downvoteActive from '../icons/downvote-active.png';
import downvote from '../icons/downvote.png';
import comment from '../icons/comment.png';
import InfiniteScroll from "react-infinite-scroll-component";
import {
    Link,
} from "react-router-dom";

const headers = {
    'Authorization': 'Bearer ' + localStorage.getItem("token")
}

var userId = null;
if (localStorage.getItem("user") !== null) {
    userId = JSON.parse(localStorage.getItem("user")).uid;
}

class HomePage extends React.Component {

    state = {
        posts: [],
        maxPosts: 0,
        page: 0,
        categories: [],
        currentCategory: null,
        votedPosts: []
    }

    componentDidMount() {
        axios.get(GlobalVariables.backendUrl + "/categories", {}).then(data => this.setState({ ...this.state, categories: data.data }));

        this.getPosts(0);
    }

    getPosts = (page) => {
        this.setState({ ...this.state, currentCategory: null })
        axios.get(GlobalVariables.backendUrl + "/posts?page=" + page + (userId !== null ? ("&userId=" + userId) : ""), {})
            .then(data => this.setState({
                posts: data.data.posts,
                maxPosts: data.data.maxPosts,
                currentCategory: null,
                page: 0
            }));
    }

    getPostsFiltered = category => {
        axios.get(GlobalVariables.backendUrl + "/posts/filter?category=" + category + "&page=" + 0 +
            (userId !== null ? ("&userId=" + userId) : ""), {}).then(data => this.setState({
                posts: data.data.posts,
                maxPosts: data.data.maxPosts,
                page: 0,
                currentCategory: category
            }))
    }

    renderAddCategory = () => {
        if (localStorage.getItem("token") !== null && JSON.parse(localStorage.getItem("user")).role === "ADMIN") {
            return (
                <div>
                    <Link className="add-category-link" to="/category">Add Category</Link>
                </div>
            );
        }
    }

    votePost = (post, i, action) => {
        axios.put(GlobalVariables.backendUrl + "/posts/vote", {
            uid: post.uid,
            vote: action
        }, { headers: headers }).then(data => this.setState({ ...this.state.posts, [this.state.posts[i]]: data.data },
            console.log((this.state.posts[i] = data.data) == null ? "" : "")), error => {
                if (error.response.status === 403) {
                    window.location.href = "/login"

                }
            });
    }

    goToPost = (postId) => {
        window.open("/posts/" + postId, "_blank");
    }

    fetchMoreData = () => {
        this.setState({ ...this.state, page: this.state.page + 1 });
        if (this.state.currentCategory === null) {
            axios.get(GlobalVariables.backendUrl + "/posts?page=" + this.state.page + (userId !== null ? ("&userId=" + userId) : ""), {})
                .then(data => this.setState({ ...this.state, posts: this.state.posts.concat(data.data.posts) }));
        } else {
            axios.get(GlobalVariables.backendUrl + "/posts/filter?category=" + this.state.currentCategory +
                "&page=" + this.state.page + (userId !== null ? ("&userId=" + userId) : ""), {})
                .then(data => this.setState({ ...this.state, posts: this.state.posts.concat(data.data.posts) }))
        }
    };

    render() {
        return (
            <div>
                <div className="sidenav">
                    {this.renderAddCategory()}
                    <Link className="link" to="/post-add">Add Post</Link>
                    <a href="#" onClick={this.getPosts.bind(this, 0)}>All</a>
                    {this.state.categories && this.state.categories.map((category, i) =>
                        <a key={i} href="#" onClick={this.getPostsFiltered.bind(this, category.name)}>{category.name}</a>)}
                </div>
                <div className="App-header">
                    <h1 className="title-home">Post page</h1>
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
                                <div className="post-buttons">
                                    <img className="vote-button" alt="" src={(post.voteOnPost && post.voteOnPost.up) ? upvoteActive : upvote} onClick={this.votePost.bind(this, post, i, "up")} />
                                    <img className="vote-button" alt="" src={(post.voteOnPost && post.voteOnPost.down) ? downvoteActive : downvote} onClick={this.votePost.bind(this, post, i, "down")} />
                                    <img className="comment-button-icon" alt="" src={comment} onClick={this.goToPost.bind(this, post.uid)} />
                                </div>
                            </div>
                        )}
                    </InfiniteScroll>

                </div>
            </div>
        );
    };
}

export default HomePage;