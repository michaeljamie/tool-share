import React, { Component } from 'react';
import Routes from './routes';
import logo from './logo.svg';
import Profile from './components/Profile/Profile';

class App extends Component {
  render() {
    return (
      <div className="App">
        Tool Share (Test)
        {Routes}
      </div>
    );
  }
}

export default App;