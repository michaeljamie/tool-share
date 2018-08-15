import React, { Component } from 'react';
import Routes from './routes';
import Nav from './components/Nav/Nav';
import Footer from './components/Footer/Footer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav/>
        {Routes}
        <Footer/>
      </div>
    );
  };
};

export default App;
