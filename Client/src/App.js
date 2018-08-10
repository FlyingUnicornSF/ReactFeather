import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Detail from "./pages/Detail";
import Data from './components/Data';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <i className="fas fa-robot fa-7x App-logo"></i>
            <h1 className="App-title">Welcome to Chat Bot Report</h1>
          </header>
          <Route exact path="/" component={Data} />
          <Route exact path="/:path" component={Detail} />
          <p className="App-intro">
            
          </p>
        </div>
      </Router>
    );
  }
}

export default App;
