import React, { Component } from "react";
import profilePic from "../../assets/defaultProfilePic.png";
import StarRating from "../StarRating/StarRating";
import ProfileToolCard from "../ProfileToolCard/ProfileToolCard";
import axios from "axios";
import { connect } from "react-redux";
import { Swipeable } from "react-touch";
import {Link} from 'react-router-dom';

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      profilePic: null,
      bio: '',
      listerRating: null,
      renterRating: null,
      rentedTools: [],
      listedTools: [],
      rentedToolsStyle: 0,
      listedToolsStyle: 0
    };
  }

  componentDidMount() {
    this.getLocation();
    axios.get(`/api/userData/${this.props.match.params.userid}`).then(res => {
      let {fullname, bio, profile_pic, listerrating, renterrating} = res.data[0]
      this.setState({
        userName: fullname,
        bio: bio,
        profilePic: profile_pic,
        listerRating: listerrating,
        renterRating: renterrating
      })
    })
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
    if (this.state.rentedToolsStyle < 0) {
      this.setState({ rentedToolsStyle: (this.state.rentedToolsStyle += 370) });
      console.log(this.state.rentedToolsStyle);
      return this.state.rentedToolsStyle.toString();
    }
  }

  listedSwipeLeft() {
    this.setState({ listedToolsStyle: (this.state.listedToolsStyle -= 370) });
    console.log(this.state.listedToolsStyle);
    return this.state.listedToolsStyle.toString();
  }

  listedSwipeRight() {
    if (this.state.listedToolsStyle < 0) {
      this.setState({ listedToolsStyle: (this.state.listedToolsStyle += 370) });
      console.log(this.state.listedToolsStyle);
      return this.state.listedToolsStyle.toString();
    }
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
    let numOfRentPages = [];
    let numOfRentContainers = 0;
    numOfRentContainers += Math.ceil(this.state.rentedTools.length/4)
    for (let i = 1; i <= numOfRentContainers; i++) {
      numOfRentPages.push(i)
    }
    console.log('rent containers:',numOfRentContainers,'rent pages:',numOfRentPages)

    let numOfListPages = [];
    let numOfListContainers = 0;
    numOfListContainers += Math.ceil(this.state.listedTools.length/4)
    for (let i = 1; i <= numOfListContainers; i++) {
      numOfListPages.push(i)
    }
    console.log('list containers:',numOfListContainers,'list pages:',numOfListPages)

    let {userid} = this.props.users
    let {userName, profilePic, bio, listerRating, renterRating} = this.state;
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

    let listedPageCounter = 0;
    let listedToolCounter = 0
    let listTools = numOfListPages.map((page,i) => {
      listedPageCounter += 1;
      <div className='profile-toolsContainer'>
        {this.state.listedTools.forEach((tool,i) => {
          listedPageCounter += 1;
          return (
            <ProfileToolCard key={Math.random()} toolId={tool.tool_id} toolName={tool.tool_name} toolImg={tool.tool_img} toolPrice={tool.tool_price}/>
          )
        })}
      </div>
    })

    // let displayedListedToolsPages = 

    // let displayedListedTools = for (let i = 0; i < numOfListContainers; i++) {
    //   return (
    //     <div className='profile-toolsContainer'>
    //       {this.state.listedTools.map((tool,i) => {
    //          
    //        })}
    //     </div>
    //   )
    // }

    return (
      <div>
        <div className="profile-page">
          <div className="profile-userInfo">
            <img
              className="profile-userPic"
              alt="profilePic"
              src={profilePic}
            />
            <span className="profile-userName">{userName}</span>
            <div className="profile-bio">
              <span>{bio}</span>
            </div>
            <div className='profile-buttons'>
            {userid===parseInt(this.props.match.params.userid)?
            <Link to={`/edit/${this.props.match.params.userid}`}><button className="profile-edit">Edit Profile</button></Link>:
            null}
            {userid===parseInt(this.props.match.params.userid)?
            <Link to={`/edit/${this.props.match.params.userid}`}><button className="profile-add">Add Tool</button></Link>:
            null}
            </div>
          </div>
          <div className="profile-ratingsContainer">
            <StarRating rateType={"Lister"} rating={listerRating} />
            <StarRating rateType={"Renter"} rating={renterRating} />
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

export default connect(mapStateToProps)(Profile);
