import React, { Component } from 'react';
import '../../scss/Landing.scss';
import Directory from '../directory/Directory.js';

class Landing extends Component {
  render(){
    return (
      <div>
        <h1 className="jason full-name">JASON</h1>
        <h1 className="ganz full-name">GANZ</h1>
        <Directory />
      </div>
    );
  }
}

export default Landing;

