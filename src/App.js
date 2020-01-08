import React from 'react';
import './App.css';
import HomePage from './pages/HomePage';
import AddPostPage from './pages/AddPostPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AddCategoryPage from './pages/AddCategoryPage';
import Profile from './pages/Profile';
import PostPage from './pages/PostPage';
import UserPosts from './pages/UserPosts';
import menuicon from './icons/menuicon.png';
import axios from 'axios';
import GlobalVariables from './globalVariables';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link
} from "react-router-dom";

class App extends React.Component {

  componentDidMount() {
    axios.get(GlobalVariables.backendUrl + "/categories", {}).then(data => localStorage.setItem("categories", JSON.stringify(data.data)));
  }

  logout = () => {
    localStorage.clear();
  }

  renderLogin = () => {
    if (localStorage.getItem("token") == null) {
      return (
        <a href="/login">Login</a>
      );
    } else {
      return (
        <div>
          <a href="/profile">Profile</a>
          <a onClick={this.logout} href=".">Logout</a>
        </div>
      );
    }
  }

  getPostsFiltered = category => {
    localStorage.setItem("category", category);
  }

  renderAddCategory = () => {
    if (localStorage.getItem("token") !== null && JSON.parse(localStorage.getItem("user")).role === "ADMIN") {
      return (
        <div>
          <a className="add-category-link" to="/category">Add Category</a>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="App-header">
        <Router>
          <div className="navbar">
            <a className="home-link" href="/">Home</a>
            <div className="dropdown">
              <img className="dropbtn" alt="" src={menuicon} />
              <div className="dropdown-content">
                <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">Never</a>
                {this.renderLogin()}
              </div>
            </div>

            <div className="sidenav">
              {this.renderAddCategory()}
              <Link className="link" to="/post-add">Add Post</Link>
              <Link to="/">All</Link>
              {JSON.parse(localStorage.getItem("categories")) && JSON.parse(localStorage.getItem("categories")).map((category, i) =>
                <Link key={i} to="/" onClick={this.getPostsFiltered.bind(this, category.name)}>{category.name}</Link>)}
            </div>
          </div>
          <Switch>
            <Route path="/home"><HomePage /></Route>
            <Route path="/post-add"><AddPostPage /></Route>
            <Route path="/login"><LoginPage /></Route>
            <Route path="/register"><RegisterPage /></Route>
            <Route path="/category"><AddCategoryPage /></Route>
            <Route path="/post**"><PostPage /></Route>
            <Route path="/profile" ><Profile /></Route>
            <Route path="/user-posts" ><UserPosts /></Route>
            <Redirect from="/" to="/home"></Redirect>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
