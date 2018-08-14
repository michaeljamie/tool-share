import React, {Component} from 'react';
import profilePic from '../../assets/defaultProfilePic.png';

export default class Profile extends Component {
  constructor() {
    super();
    this.state = {
      userName: 'Name Namerson',
      profilePic: profilePic,
      bio: 'This will be where the bio goes.',
      listerRating: 0,
      renterRating: 0,
      rentedTools: [{
        title: 'Hammer',
        img: 'something'
      },{
        title: 'Drill',
        img: 'something'
      },{
        title: 'Wrench',
        img: 'something'
      },{
        title: 'Ladder',
        img: 'something'
      }],
      toolsForRent: []
    }
  }
  render() {
    var {userName, profilePic, bio, listerRating, renterRating, rentedTools} = this.state;
    return (
      <div>
        <div className='profile-page'>
          <div className='profile-userInfo'>
            <img className='profile-userPic' alt='profilePic' src={profilePic}></img>
            <div className='profile-bio'>
              <span className='profile-userName'>{userName}</span>
              <br/>
              <span>{bio}</span>
              <button className='profile-edit'>Edit</button>
            </div>
          </div>
          <div className='profile-ratings'>
            <div className='profile-listerRating'>
              <div className='profile-starContainer'>
                <div className='profile-star'><i className="fas fa-star"/></div>
                <div className='profile-star'><i className="fas fa-star"/></div>
                <div className='profile-star'><i className="fas fa-star"/></div>
                <div className='profile-star'><i className="fas fa-star"/></div>
                <div className='profile-star'><i className="fas fa-star"/></div>
              </div>
              <span>Lister Rating</span>
            </div>
            <div className='profile-renterRating'>
              <div className='profile-starContainer'>
                <div className='profile-star'><i className="fas fa-star"/></div>
                <div className='profile-star'><i className="fas fa-star"/></div>
                <div className='profile-star'><i className="fas fa-star"/></div>
                <div className='profile-star'><i className="fas fa-star"/></div>
                <div className='profile-star'><i className="fas fa-star"/></div>
              </div>
              <span>Renter Rating</span>
            </div>
          </div>
            <div className='profile-rentContainer'>
              <div className='profile-toolsHeader'>
                <span>Tools your currently renting</span>
              </div>
              <div className='profile-toolsContainer'>
                <div className='profile-tool'><span>{rentedTools[0].title}</span></div>
                <div className='profile-tool'><span>{rentedTools[1].title}</span></div>
                <div className='profile-tool'><span>{rentedTools[2].title}</span></div>
                <div className='profile-tool'><span>{rentedTools[3].title}</span></div>
              </div>
            </div>
            <div className='profile-rentContainer'>
              <div className='profile-toolsHeader'>
                <span>Tools up for rent</span>
                <br/>
                <select className='profile-timesRented'>
                  <option value='MostToLeast'>Most to Least Rented</option>
                  <option value='LeastToMost'>Least to Most Rented</option>
                </select>
              </div>
              <div className='profile-toolsContainer'>
                <div className='profile-tool'></div>
                <div className='profile-tool'></div>
                <div className='profile-tool'></div>
                <div className='profile-tool'></div>
              </div>
            </div>
        </div>
      </div>
    )
  }
}