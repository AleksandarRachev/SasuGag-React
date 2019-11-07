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
        onHomePage: true,
        page: "1",
        pages: [],
        categories: [],
        currentCategory: null
    }

    componentDidMount() {
        axios.get(GlobalVariables.backendUrl + "/categories", {}).then(data => this.setState({ ...this.state, categories: data.data }));
        this.getPosts(1)
    }

    componentDidUpdate() {
        for (let i = 0; i < this.state.pages.length / 5; i++) {
            this.state.pages[i] = i;
        }
    }

    getPosts = (page) => {
        axios.get(GlobalVariables.backendUrl + "/posts/count", {}).then(data => this.setState({ ...this.state, pages: new Array(data.data) }));
        this.setState({ ...this.state, currentCategory: null })
        axios.get(GlobalVariables.backendUrl + "/posts?page=" + page, {}).then(data => this.setState({ ...this.state, posts: data.data }));
    }

    getPostsFiltered = category => {
        axios.get(GlobalVariables.backendUrl + "/posts/count/filter?category=" + category, {}).then(data => this.setState({ ...this.state, pages: new Array(data.data) }));
        this.setState({ ...this.state, currentCategory: category })
        axios.get(GlobalVariables.backendUrl + "/posts/filter?category=" + category, {}).then(data => this.setState({ ...this.state, posts: data.data }))
    }

    changePage = page => {
        this.setState({ ...this.state, page: page })
        if (this.state.currentCategory == null) {
            this.getPosts(page)
        }
        else {
            axios.get(GlobalVariables.backendUrl + "/posts/filter?category=" + this.state.currentCategory + "&page=" + page,
            ).then(data => this.setState({ ...this.state, posts: data.data }))
        }
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    checkIfUserLogged = () => {
        if (localStorage.getItem("token") == null) {
            window.location.href = "/login"
        }
    }

    renderThing = () => {
        if (this.state.onHomePage === true) {
            return (
                <div>
                    <h1 className='title-home'>Welcome to the magic world world.</h1>
                    <button onClick={this.changeRender.bind()}>Click to get some free drugs</button>
                </div>
            );
        }
        else {
            return (
                <div>
                    <div className="sidenav">
                        <Link className="link" to="/post-add" onClick={this.checkIfUserLogged.bind(this)}>Add Post</Link>
                        <a href="#" onClick={this.getPosts.bind(this, 1)}>All</a>
                        {this.state.categories && this.state.categories.map((category, i) =>
                            <a key={i} href="#" onClick={this.getPostsFiltered.bind(this, category.name)}>{category.name}</a>)}
                            <video>
                                <source src="https://www.youtube.com/watch?v=dQw4w9WgXcQ" type="video.mp4"/>
                            </video>
                    </div>
                    <div className="App-header">
                        <h1 className="title-home">Post page</h1>
                        {this.state.posts && this.state.posts.map((post, i) =>
                            <div className="post" key={i}>
                                <h2>{post.title}</h2>
                                <p>{post.userUsername != null ? "by " + post.userUsername : ""}</p>
                                <img className="image" alt={post.title} src={GlobalVariables.backendUrl + '/posts/image/' + post.uid} width="350" />
                            </div>
                        )}
                        {<div className="pages">
                            {this.state.pages && this.state.pages.map((post, i) =>
                                <div className="page-button" key={i}><button onClick={this.changePage.bind(this, i + 1)}>{i + 1}</button></div>
                            )}
                        </div>}
                    </div>
                </div>
            );
        }
    };

    changeRender = () => {
        this.setState({ ...this.state, onHomePage: !this.state.onHomePage })
    }

    render() {
        return (
            <div>
                <div>
                    {this.renderThing()}
                </div>
            </div>
        )
    };
}

export default HomePage;