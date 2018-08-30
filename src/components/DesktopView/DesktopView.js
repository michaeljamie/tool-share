import React, { Component } from 'react';
import Logo from '../../assets/ToolBrosLogo.png';

class DesktopView extends Component {

  render() {
    return (
      <div className='toolshare-desktop-body'>
        <h1 className='toolshare-desktop-title'>Tool Share</h1>
        <img src={Logo} className='toolshare-desktop-logo' width='300px' height='300px'/>
        <div className='toolshare-desktop-content'>Sorry, this application is not optimized for screens this size. Please visit on a mobile phone.</div>
      </div>
    );
  };
};

export default DesktopView;