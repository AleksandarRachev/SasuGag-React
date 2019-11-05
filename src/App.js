import React, { useEffect } from 'react';
import './App.css';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import LoginPage from './pages/LoginPage';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

function logout() {
  localStorage.clear()
}

function renderLogin() {
  if (localStorage.getItem("token") == null) {
    return (
      <a className="regular-navbar-link" href="/login">Login</a>
    );
  } else {
    return (
      <a className="regular-navbar-link" onClick={logout.bind(this)} href=".">Logout</a>
    );
  }
}

function App() {
  return (
    <div className="App-header">
      <div className="navbar">
        <a className="home-link" href="/">Home</a>
        {renderLogin()}
        <a className="regular-navbar-link" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">Never</a>
      </div>
      <Router>
        <Switch>
          <Route path="/home"><HomePage /></Route>
          <Route path="/products"><ProductsPage /></Route>
          <Route path="/login"><LoginPage /></Route>
          <Redirect from="/" to="/home"></Redirect>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
