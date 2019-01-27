import React, { Component } from 'react'
import Container from './Components/containers/Container'
import { Provider } from 'react-redux'
import store from './store'

import './App.css'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div
          style={{
            maxWidth: 1132,
            margin: "0 auto",
            marginTop: 50
          }}
        >
          <div>
            <h1 style={{marginBottom: 10}}>Star Wars Info</h1>
            <Container />
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;
