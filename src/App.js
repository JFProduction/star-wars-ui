import React, { Component } from 'react'
import Container from './Components/containers/Container';

import './App.css'

class App extends Component {
  render() {
    return (
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          marginTop: 50
        }}
      >
        <h1>Star Wars Info</h1>
        <Container />
      </div>
    );
  }
}

export default App;
