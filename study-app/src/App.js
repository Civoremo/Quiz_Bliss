import React, { Component } from 'react';
import './App.css';
import authenticateHOC from './components/Login/Authenticate';

// import Login from './components/Login/Login';
import QuizList from './components/QuizList';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h3>Under Construction ...</h3>
        {/* <Login /> */}
        <QuizList />
      </div>
    );
  }
}

export default authenticateHOC(App);
