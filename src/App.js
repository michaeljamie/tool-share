import React, { Component } from 'react';
import Routes from './routes';
import Nav from './components/Nav/Nav';
import Footer from './components/Footer/Footer';
import Contact from './components/Contact/Contact';

class App extends Component {
  render() {
    
    return (
      <div>
        <Nav/>
        {Routes}
        { window.location.href === 'https://toolshare.pro/#/' ? <Contact/> : ''}
        <Footer/>
      </div>
    );
  };
};

export default App;
