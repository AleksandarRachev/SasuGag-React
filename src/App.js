import React from 'react';
import './App.css';
import HomePage from './pages/HomePage';
import AddPostPage from './pages/AddPostPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PostPage from './pages/PostPage';
import menuicon from './icons/menuicon.png';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

class App extends React.Component {

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
        <a onClick={this.logout.bind(this)} href=".">Logout</a>
      );
    }
  }


  render() {
    return (
      <div className="App-header">
        <div className="navbar">
          <a className="home-link" href="/">Home</a>
          <div class="dropdown">
            {/* <button class="dropbtn">Dropdown</button> */}
            <img class="dropbtn" src={menuicon}/>
            <div class="dropdown-content">
              <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">Never</a>
              {this.renderLogin()}
            </div>
          </div>
        </div>
        <Router>
          <Switch>
            <Route path="/home"><HomePage /></Route>
            <Route path="/post-add"><AddPostPage /></Route>
            <Route path="/login"><LoginPage /></Route>
            <Route path="/register"><RegisterPage /></Route>
            <Route path="/post**"><PostPage /></Route>
            <Redirect from="/" to="/home"></Redirect>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
