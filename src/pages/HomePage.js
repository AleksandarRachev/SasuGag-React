import React from 'react';
import axios from 'axios';
import GlobalVariables from '../globalVariables'
import '../css/HomePage.css'
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
        currentCategory: null
    }

    componentDidMount() {
        window.addEventListener('scroll', this.listenToScroll)
        axios.get(GlobalVariables.backendUrl + "/categories", {}).then(data => this.setState({ ...this.state, categories: data.data }));
        this.getPosts(0)
    }

    componentDidUpdate() {
        window.addEventListener('scroll', this.listenToScroll)
    }

    listenToScroll = () => {
        var limit = Math.max(document.body.scrollHeight, document.body.offsetHeight,
            document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);

        if (window.scrollY > (limit - 1000)) {
            this.changePage(this.state.page + 1);
        }
    }

    getPosts = (page) => {
        axios.get(GlobalVariables.backendUrl + "/posts/count", {}).then(data => this.setState({ ...this.state, pages: new Array(data.data) }));
        this.setState({ ...this.state, currentCategory: null })
        axios.get(GlobalVariables.backendUrl + "/posts?page=" + page, {}).then(data => this.setState({ ...this.state, posts: this.state.posts.concat(data.data) }));
    }

    getPostsFiltered = category => {
        this.resetPosts(category);
        axios.get(GlobalVariables.backendUrl + "/posts/count/filter?category=" + category, {}).then(data => this.setState({ ...this.state, pages: new Array(data.data) }));
        axios.get(GlobalVariables.backendUrl + "/posts/filter?category=" + category +"&page=" + 0, {}).then(data => this.setState({ ...this.state, posts: data.data }))
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

    checkIfUserLogged = () => {
        if (localStorage.getItem("token") == null) {
            window.location.href = "/login"
        }
    }

    resetPosts = (category) => {
        this.state = {
            posts: [],
            page: 0,
            pages: this.state.pages,
            categories: this.state.categories,
            currentCategory: category
        }
    }

    render() {
        return (
            <div>
                <div className="sidenav">
                    <Link className="link" to="/post-add" onClick={this.checkIfUserLogged.bind(this)}>Add Post</Link>
                    <a href="." onClick={this.resetPosts.bind(this, null)}>All</a>
                    {this.state.categories && this.state.categories.map((category, i) =>
                        <a key={i} href="#" onClick={this.getPostsFiltered.bind(this, category.name)}>{category.name}</a>)}
                </div>
                <div className="App-header">
                    <h1 className="title-home">Post page</h1>
                    {this.state.posts && this.state.posts.map((post, i) =>
                        <div className="post" key={i}>
                            <h2>{post.title}</h2>
                            <h1>{post.categoryName}</h1>
                            <p>{post.userUsername != null ? "by " + post.userUsername : ""}</p>
                            <img className="image" alt={post.title} src={GlobalVariables.backendUrl + '/posts/image/' + post.uid} width="350" />
                        </div>
                    )}
                </div>
            </div>
        );
    };
}

export default HomePage;