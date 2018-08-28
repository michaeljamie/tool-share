import React, { Component } from "react";
import profilePic from "../../assets/defaultProfilePic.png";
import StarRating from "../StarRating/StarRating";
import ProfileToolCard from "../ProfileToolCard/ProfileToolCard";
import axios from "axios";
import { connect } from "react-redux";
import { Swipeable } from "react-touch";
import {Link} from 'react-router-dom';
import edit from '../../assets/cogIcon.png';
import userAvatar from './../../assets/userAvatar.jpg';
import plus from '../../assets/plus.png';

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

  pageLoad() {
    window.scrollTo(0,0);
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
    });
    axios.get(`/api/usersListedTools/${this.props.match.params.userid}`).then(res => {
      this.setState({ listedTools: res.data });
    });
  }

  componentDidMount() {
    this.pageLoad()
  }

  rentedSwipeLeft() {
    this.setState({ rentedToolsStyle: (this.state.rentedToolsStyle -= 94) });
    console.log(this.state.rentedToolsStyle);
    return this.state.rentedToolsStyle.toString();
  }

  rentedSwipeRight() {
    if (this.state.rentedToolsStyle < 0) {
      this.setState({ rentedToolsStyle: (this.state.rentedToolsStyle += 94) });
      console.log(this.state.rentedToolsStyle);
      return this.state.rentedToolsStyle.toString();
    }
  }

  listedSwipeLeft() {
    this.setState({ listedToolsStyle: (this.state.listedToolsStyle -= 94) });
    console.log(this.state.listedToolsStyle);
    return this.state.listedToolsStyle.toString();
  }

  listedSwipeRight() {
    if (this.state.listedToolsStyle < 0) {
      this.setState({ listedToolsStyle: (this.state.listedToolsStyle += 94) });
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

    let {userid} = this.props.users
    let {userName, profilePic, bio, listerRating, renterRating} = this.state;

    //mapping out the entire arrays of tool cards
    let displayedRentedTools = this.state.rentedTools.map(tool => {
      return (
        <ProfileToolCard key={Math.random()} toolId={tool.tool_id} renterId={tool.renter_id} profileId={this.props.match.params.userid} toolName={tool.tool_name} toolImg={tool.tool_img} toolPrice={tool.tool_price} currentlyAvailable={tool.currently_available}/>
      )
    })
    let displayedListedTools = this.state.listedTools.map(tool => {
      return (
        <ProfileToolCard key={Math.random()} toolId={tool.tool_id} renterId={tool.renter_id} profileId={this.props.match.params.userid} toolName={tool.tool_name} toolImg={tool.tool_img} toolPrice={tool.tool_price} currentlyAvailable={tool.currently_available}/>
      )
    })

    //splitting the array into pages of four tool cards for rented
    var arraysForRented = [];
    while (displayedRentedTools.length > 0)
        arraysForRented.push(displayedRentedTools.splice(0, 4));
    let rentTools = arraysForRented.map((array,i) => {
      let toolGroup = array.map((tool,i) => {
        return tool
      })
      return (
        <div className='profile-toolsContainer' style={{position: 'relative', left: `${this.state.rentedToolsStyle}vw`}}>
          {toolGroup}
        </div>
      )
    })

    //splitting the array into pages of four tool cards for listed
    var arraysForListed = [];
    while (displayedListedTools.length > 0)
        arraysForListed.push(displayedListedTools.splice(0, 4));
    let listTools = arraysForListed.map((array,i) => {
      let toolGroup = array.map((tool,i) => {
        return tool
      })
      return (
        <div className='profile-toolsContainer' style={{position: 'relative', left: `${this.state.listedToolsStyle}vw`}}>
          {toolGroup}
        </div>
      )
    })

    return (
      <div>
        <div className="profile-page">
          <div className="profile-userInfo">
            {userid===parseInt(this.props.match.params.userid)?
              <Link to={`/edit/${this.props.match.params.userid}`}>
                <div className='profile-editButton'>
                  <img src={edit}/>
                </div>
              </Link>:
            null}
            <img
              className="profile-userPic"
              alt="profilePic"
              src={profilePic ? profilePic : userAvatar}
            />
            <span className="profile-userName">{userName ? userName : 'New User'}</span>
            <div className="profile-bio">
              <span>{bio}</span>
            </div>
          </div>
          <div className="profile-ratingsContainer">
            <StarRating rateType={"Lister"} rating={listerRating} />
            <StarRating rateType={"Renter"} rating={renterRating} />
          </div>
          <hr/>
          {rentTools.length>0?
          <div className="profile-rentContainer">
            <div className="profile-toolsHeader">
              <p>Currently Rented Tools</p>
            </div>
            <Swipeable
              onSwipeLeft={() => this.rentedSwipeLeft()}
              onSwipeRight={() => this.rentedSwipeRight()}
            >
              <div className="profile-toolsOuterContainer">
                <div className='profile-pageSlider'>
                  {rentTools}
                </div>
              </div>
            </Swipeable>
          </div>:
          null}
          {listTools.length>0?
          <div className="profile-rentContainer">
            <div className="profile-toolsHeader">
              <p>Listed Tools</p>
              {userid===parseInt(this.props.match.params.userid)?
              <Link to={`/post`}>
                <div className='profile-addTool'>
                  <img src={plus}/>
                </div>
              </Link>:
              null}
            </div>
            <Swipeable
            onSwipeLeft={() => this.listedSwipeLeft()}
            onSwipeRight={() => this.listedSwipeRight()}
            >
              <div className="profile-toolsOuterContainer">
                <div className='profile-pageSlider'>
                  {listTools}
                </div>
              </div>
            </Swipeable>
          </div>:
          null}
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
