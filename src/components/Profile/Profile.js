import React, { Component } from "react";
import profilePic from "../../assets/defaultProfilePic.png";
import StarRating from "../StarRating/StarRating";
import axios from "axios";
import { connect } from "react-redux";
import { Swipeable } from "react-touch";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      userName: "Name Namerson",
      profilePic: profilePic,
      bio: "This will be where the bio goes.",
      listerRating: 3,
      renterRating: 4,
      rentedTools: [
        {
          title: "Hammer",
          img: "something"
        },
        {
          title: "Drill",
          img: "something"
        },
        {
          title: "Wrench",
          img: "something"
        },
        {
          title: "Ladder",
          img: "something"
        }
      ],
      toolsForRent: [],
      toolStyle: 0
    };
  }
  componentDidMount(){
    this.getLocation()
    this.onSwipeLeft = function(){
      this.setState({toolStyle: this.state.toolStyle-=370})
      console.log(this.state.toolStyle)
      return this.state.toolStyle.toString();
    }
    this.onSwipeRight = function(){
      this.setState({toolStyle: this.state.toolStyle+=370})
      console.log(this.state.toolStyle)
      return this.state.toolStyle.toString();
    }
  }

  onSwipeLeft() {}

getLocation = () => {
  if (navigator.geolocation){
    navigator.geolocation.getCurrentPosition(this.showPosition)
  } else {
    return "Geolocation is not supported by this browser"
  }
}

showPosition= position =>{
  console.log(position)
  let latlong = position.coords.latitude + "," + position.coords.longitude
  let {userid} = this.props.users
  console.log(userid)
  axios.post(`api/updateUser/${userid}`, {latlong}).then(res=>{
    console.log('posted')
  })
}


   
  onSwipeRight() {}

  render() {
    console.log(this.props.users);

    // var {userName, profilePic, bio, listerRating, renterRating, rentedTools} = this.state;
    const {
      bio,
      fullname,
      profile_pic,
      listerrating,
      renterrating
    } = this.props.users;
    return (
      <div>
        <div className="profile-page">
          <div className="profile-userInfo">
            <img
              className="profile-userPic"
              alt="profilePic"
              src={profile_pic}
            />
            <div className="profile-bio">
              <span className="profile-userName">{fullname}</span>
              <br />
              <span>{bio}</span>
              <button className="profile-edit">Edit</button>
            </div>
          </div>
          <div className="profile-ratingsContainer">
            <StarRating rateType={"Lister"} rating={listerrating} />
            <StarRating rateType={"Renter"} rating={renterrating} />
          </div>
          <div className="profile-rentContainer">
            <div className="profile-toolsHeader">
              <span>Currently Rented Tools</span>
            </div>
            <Swipeable 
              onSwipeLeft={() => this.onSwipeLeft()}
              onSwipeRight={() => this.onSwipeRight()}
            >
              <div className='profile-toolsOuterContainer'>
                <div id="move_this" className="profile-toolsContainer" style={{position:"relative", left: this.state.toolStyle}}>
                  <div className="profile-tool" />
                  <div className="profile-tool" />
                  <div className="profile-tool" />
                  <div className="profile-tool" />
                </div>
              </div>
            </Swipeable>
          </div>
          <div className="profile-rentContainer">
            <div className="profile-toolsHeader">
              <span>Listed Tools</span>
              <br />
              <select className="profile-timesRented">
                <option value="MostToLeast">Most to Least Rented</option>
                <option value="LeastToMost">Least to Most Rented</option>
              </select>
            </div>
            <div className='profile-toolsOuterContainer'>
              <div className="profile-toolsContainer">
                <div className="profile-tool" />
                <div className="profile-tool" />
                <div className="profile-tool" />
                <div className="profile-tool" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    users: state.user
  };
}

export default connect(mapStateToProps)(Profile);
