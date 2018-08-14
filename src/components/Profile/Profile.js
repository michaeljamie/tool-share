import React, {Component} from 'react';

export default class Profile extends Component {
  render() {
    return (
      <div>
        <div className='navBar'></div>
        <div className='profilePage'>
          <div className='userInfo'>
            <img className='profilePic' src='https://cdn2.iconfinder.com/data/icons/carpenter-1/64/Artboard_19-128.png'></img>
            <div className='bio'>
              <span className='userName'>Name Namerson</span>
              <br/>
              <span>This will be where the bio goes</span>
            </div>
            <div className='profileRatings'>
              
            </div>
          </div>
        </div>
      </div>
    )
  }
}