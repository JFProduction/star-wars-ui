import React, { Component } from 'react'
import Container from './Components/containers/Container';
import Controls from './Components/presentations/controls';

import './App.css'

class App extends Component {
  constructor() {
    super()
    this.state = {
      screenView: "forms"
    }
  }

  handleScreenChange = () => {
    let screenView = this.state.screenView === "forms" ? "cards" : "forms"
    this.setState({screenView})
  }

  render() {
    const {screenView} = this.state
    
    return (
      <div
        style={{
          maxWidth: 1132,
          margin: "0 auto",
          marginTop: 50
        }}
      >
      <button 
        onClick={this.handleScreenChange} 
        className="btn"
        style={{
          background: "#f9f9f9"
        }}
      >{screenView}</button>
      {
        screenView === "cards" ?
          <div>
            <h1 style={{marginBottom: 10}}>Star Wars Info</h1>
            <Container />
          </div>
        : <Controls />
      }
      </div>
    );
  }
}

export default App;
