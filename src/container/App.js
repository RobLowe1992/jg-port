import React, { Component } from 'react';
import '../scss/App.css';
import Header from '../components/header/Header.js';
import Landing from '../components/landing/Landing.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Landing />
      </div>
    );
  }
}

export default App;
