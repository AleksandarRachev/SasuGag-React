import React from 'react';
import './App.css';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

function App() {
  return (
    <div>
      <header className="App-header">
        <Router>
          <Switch>
            <Route path="/home"><HomePage/></Route>
            <Route path="/products"><ProductsPage/></Route>
          </Switch>
          <Redirect from="/" to="/home"></Redirect>
        </Router>
      </header>
    </div>
  );
}

export default App;
