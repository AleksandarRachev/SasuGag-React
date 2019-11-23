import React from 'react';
import axios from 'axios';
import GlobalVariables from '../globalVariables'
import '../css/HomePage.css'
import upvote from '../icons/upvote.png';
import upvoteActive from '../icons/upvote-active.png';
import downvoteActive from '../icons/downvote-active.png';
import downvote from '../icons/downvote.png';
import comment from '../icons/comment.png';
import {
    Link,
} from "react-router-dom";

const headers = {
    'Authorization': 'Bearer ' + localStorage.getItem("token")
}

class HomePage extends React.Component {

    state = {
        posts: [],
        page: 0,
        categories: [],
        currentCategory: null,
        votedPosts: []
    }

    componentDidMount() {
        window.addEventListener('scroll', this.listenToScroll)
        axios.get(GlobalVariables.backendUrl + "/categories", {}).then(data => this.setState({ ...this.state, categories: data.data }));
        this.getPosts(0);
        this.getVotedPosts();
    }

    componentDidUpdate() {
        window.addEventListener('scroll', this.listenToScroll)
    }

    checkIfUpvoted = (postId) => {
        return this.state.votedPosts.filter(post => post.up === true).map(post => post.postUid).includes(postId);
    }

    checkIfDownvoted = (postId) => {
        return this.state.votedPosts.filter(post => post.down === true).map(post => post.postUid).includes(postId);
    }

    listenToScroll = () => {
        var limit = Math.max(document.body.scrollHeight, document.body.offsetHeight,
            document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);

        if (window.scrollY > (limit - 1000)) {
            this.changePage(this.state.page + 1);
        }
    }

    getVotedPosts = () => {
        if (localStorage.getItem("token") !== null) {
            axios.get(GlobalVariables.backendUrl + "/posts/voted", { headers: headers }, {}).then(data => this.setState({ ...this.state, votedPosts: data.data }, console.log(this.state.votedPosts)));
        }
    }

    getPosts = (page) => {
        this.setState({ ...this.state, currentCategory: null })
        axios.get(GlobalVariables.backendUrl + "/posts?page=" + page, {}).then(data => this.setState({ ...this.state, posts: this.state.posts.concat(data.data) }));
    }

    getPostsFiltered = category => {
        this.resetPosts(category);
        axios.get(GlobalVariables.backendUrl + "/posts/filter?category=" + category + "&page=" + 0, {}).then(data => this.setState({ ...this.state, posts: data.data }))
    }

    changePage = page => {
        this.setState({ ...this.state, page: page })
        if (this.state.currentCategory == null) {
            this.getPosts(page)
        }
        else {
            axios.get(GlobalVariables.backendUrl + "/posts/filter?category=" + this.state.currentCategory + "&page=" + page,
            ).then(data => this.setState({ ...this.state, posts: this.state.posts.concat(data.data) }))
        }
    }

    renderAddCategory = () => {
        if (localStorage.getItem("token") !== null && localStorage.getItem("role") === "ADMIN") {
            return (
                <div>
                    <Link className="add-category-link" to="/category">Add Category</Link>
                </div>
            );
        }
    }

    resetPosts = (category) => {
        this.setState({
            ...this.state, state: {
                posts: [],
                page: 0,
                pages: this.state.pages,
                categories: this.state.categories,
                currentCategory: category
            }
        })
    }

    votePost = (post, i, action) => {
        axios.put(GlobalVariables.backendUrl + "/posts/vote", {
            uid: post.uid,
            vote: action
        }, { headers: headers }).then(data => this.setState({ ...this.state, [this.state.posts[i]]: data.data },
            console.log((this.state.posts[i] = data.data) == null ? "" : "")), error => {
                if (error.response.status === 403) {
                    window.location.href = "/login"

                }
            });
        this.getVotedPosts();
    }

    goToPost = (postId) => {
        window.open("/posts/" + postId, "_blank");
    }

    render() {
        return (
            <div>
                <div className="sidenav">
                    {this.renderAddCategory()}
                    <Link className="link" to="/post-add">Add Post</Link>
                    <a href="." onClick={this.resetPosts.bind(this, null)}>All</a>
                    {this.state.categories && this.state.categories.map((category, i) =>
                        <a key={i} href="#" onClick={this.getPostsFiltered.bind(this, category.name)}>{category.name}</a>)}
                </div>
                <div className="App-header">
                    <h1 className="title-home">Post page</h1>
                    {this.state.posts && this.state.posts.map((post, i) =>
                        <div className="post" key={i}>
                            <h2><Link className="link" to={"/posts/" + post.uid} target="_blank">{post.title}</Link></h2><br />
                            <img className="image" alt={post.title} src={GlobalVariables.backendUrl + '/posts/image/' + post.uid} width="350" />
                            <div className="info">
                                <p className="points">{post.points} points . </p>
                                <p className="points">{post.comments} comments</p>
                            </div>
                            <div className="post-buttons">
                                <img className="vote-button" alt="" src={this.checkIfUpvoted(post.uid) ? upvoteActive : upvote} onClick={this.votePost.bind(this, post, i, "up")} />
                                <img className="vote-button" alt="" src={this.checkIfDownvoted(post.uid) ? downvoteActive : downvote} onClick={this.votePost.bind(this, post, i, "down")} />
                                <img className="comment-button-icon" alt="" src={comment} onClick={this.goToPost.bind(this, post.uid)} />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    };
}

export default HomePage;