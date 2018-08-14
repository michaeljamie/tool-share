import React, { Component } from 'react';
import Routes from './routes';
import Nav from './components/Nav/Nav';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav/>
        {Routes}
      </div>
    );
  };
};

export default App;