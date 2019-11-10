import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Main from './components/Main'
import Login from './components/Login'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={Main} />
          <Route exact path="/login" component={Login} />
        </div>
      </Router>
    )
  }
}

export default App
