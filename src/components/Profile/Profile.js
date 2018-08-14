import React, {Component} from 'react';
// import '../../main.scss'
import './Profile.css'

export default class Profile extends Component {
  render() {
    return (
      <div>
        <div className='navBar'></div>
        <div className='profilePage'>
          <div className='userInfo'>
            <img className='profilePic' src='https://cdn2.iconfinder.com/data/icons/carpenter-1/64/Artboard_19-128.png'></img>
            <div className='description'></div>
          
          </div>
        </div>
      </div>
    )
  }
}