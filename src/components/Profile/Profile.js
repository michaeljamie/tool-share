import React, {Component} from 'react';

export default class Profile extends Component {
  constructor() {
    super();
    this.state = {
      userName: 'Name Namerson',
      bio: 'This will be where the bio goes.',
      listerRating: 0,
      renterRating: 0,
      currentlyRentedTools: [{
        name: 'Hammer',
        img: 'something'
      },{
        name: 'Drill',
        img: 'something'
      }],
      toolsUpForRent: []
    }
  }
  render() {
    var {userName, bio, listerRating, renterRating} = this.state;
    return (
      <div>
        <div className='profile-page'>
          <div className='profile-userInfo'>
            <img className='profile-userPic' alt='profilePic' src='https://cdn2.iconfinder.com/data/icons/carpenter-1/64/Artboard_19-128.png'></img>
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
                <div className='profile-tool'></div>
                <div className='profile-tool'></div>
                <div className='profile-tool'></div>
                <div className='profile-tool'></div>
              </div>
            </div>
            <div className='profile-rentContainer'>
              <div className='profile-toolsHeader'>
                <span>Tools up for rent</span>
                <br/>
                <select>
                  <option value='MostToLeast'>Most to Least Rented</option>
                  <option value='LeastToMost'>Least to Most Rented</option>
                </select>
              </div>
              <div className='profile-toolsContainer'>
                <div className='profile-toolsContainer'>
                <div className='profile-tool'></div>
                <div className='profile-tool'></div>
                <div className='profile-tool'></div>
                <div className='profile-tool'></div>
              </div>
              </div>
            </div>
        </div>
      </div>
    )
  }
}