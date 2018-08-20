import React, { Component } from "react";
import profilePic from "../../assets/defaultProfilePic.png";
import StarRating from "../StarRating/StarRating";
import ProfileToolCard from "../ProfileToolCard/ProfileToolCard";
import axios from "axios";
import { connect } from "react-redux";
import { Swipeable } from "react-touch";
import { getUserInfo } from './../../ducks/reducer';

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      userName: "Name Namerson",
      profilePic: profilePic,
      bio: "This will be where the bio goes.",
      listerRating: 3,
      renterRating: 4,
      rentedTools: [],
      listedTools: [],
      rentedToolsStyle: 0,
      listedToolsStyle: 0
    };
  }

  componentDidMount() {
    this.getLocation();
    axios.get(`/api/usersRentedTools/${this.props.match.params.userid}`).then(res => {
      this.setState({ rentedTools: res.data });
      console.log("rented tools:", this.state.rentedTools);
    });
    axios.get(`/api/usersListedTools/${this.props.match.params.userid}`).then(res => {
      this.setState({ listedTools: res.data });
      console.log("listed tools:", this.state.listedTools);
    });
  }

  rentedSwipeLeft() {
    this.setState({ rentedToolsStyle: (this.state.rentedToolsStyle -= 370) });
    console.log(this.state.rentedToolsStyle);
    return this.state.rentedToolsStyle.toString();
  }

  rentedSwipeRight() {
    this.setState({ rentedToolsStyle: (this.state.rentedToolsStyle += 370) });
    console.log(this.state.rentedToolsStyle);
    return this.state.rentedToolsStyle.toString();
  }

  listedSwipeLeft() {
    this.setState({ listedToolsStyle: (this.state.listedToolsStyle -= 370) });
    console.log(this.state.listedToolsStyle);
    return this.state.listedToolsStyle.toString();
  }

  listedSwipeRight() {
    this.setState({ listedToolsStyle: (this.state.listedToolsStyle += 370) });
    console.log(this.state.listedToolsStyle);
    return this.state.listedToolsStyle.toString();
  }

  showPosition = position => {
    console.log(position)
    let lat = position.coords.latitude
    let long = position.coords.longitude
    let {userid} = this.props.users
    console.log(userid)
    axios.post(`api/updateUser/${userid}`, {lat, long}).then(res=>{
      console.log('posted')
    })
  }

  getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition);
    } else {
      return "Geolocation is not supported by this browser";
    }
  };

  render() {
    var {
      bio,
      fullname,
      profile_pic,
      listerrating,
      renterrating
    } = this.props.users;
    let displayedRentedTools = this.state.rentedTools.map(tool => {
      return (
        <ProfileToolCard key={Math.random()} toolId={tool.tool_id} toolName={tool.tool_name} toolImg={tool.tool_img} toolPrice={tool.tool_price}/>
      )
    })
    let displayedListedTools = this.state.listedTools.map(tool => {
      return (
        <ProfileToolCard key={Math.random()} toolId={tool.tool_id} toolName={tool.tool_name} toolImg={tool.tool_img} toolPrice={tool.tool_price}/>
      )
    })
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
              onSwipeLeft={() => this.rentedSwipeLeft()}
              onSwipeRight={() => this.rentedSwipeRight()}
            >
              <div className="profile-toolsOuterContainer">
                <div
                  className="profile-toolsContainer"
                  style={{ position: "relative", left: this.state.rentedToolsStyle }}
                >
                  {displayedRentedTools}
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
              <Swipeable
              onSwipeLeft={() => this.listedSwipeLeft()}
              onSwipeRight={() => this.listedSwipeRight()}
            >
              <div className="profile-toolsOuterContainer">
                <div
                  className="profile-toolsContainer"
                  style={{ position: "relative", left: this.state.listedToolsStyle }}
                >
                  {displayedListedTools}
                </div>
              </div>
            </Swipeable>
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

export default connect(
  mapStateToProps,
  { getUserInfo }
)(Profile);
