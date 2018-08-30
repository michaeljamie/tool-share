import React, { Component } from 'react';
import Routes from './routes';
import Nav from './components/Nav/Nav';
import Footer from './components/Footer/Footer';
import Contact from './components/Contact/Contact';
import DesktopView from './components/DesktopView/DesktopView';

class App extends Component {
  constructor() {
    super();
    this.state = {
      viewportWidthSize: 0
    };
    this.updateViewportData = this.updateViewportData.bind(this);
  }

  componentDidMount() {
    this.updateViewportData();
    window.addEventListener("resize", this.updateViewportData);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateViewportData);
  }

  updateViewportData() {
    this.setState({ viewportWidthSize: window.innerWidth});
  }

  render() {

    console.log(this.state.viewportWidthSize)

    return (
      <div>
        { this.state.viewportWidthSize > 500 ? <DesktopView/> :
          <div>
            <Nav/>
            {Routes}
            { window.location.href === 'http://localhost:3000/#/' ? <Contact/> : ''}
            <Footer/>
          </div>
        }
      </div>
    );
  };
};

export default App;