import React, {Component} from 'react';
import axios from 'axios';

export default class ProfileEdit extends Component {
  constructor() {
    super();
    this.state = {
      fullName: '',
      bio: '',
      profilePic: null,
      email: '',
      phone: ''
    }
  }

  componentDidMount() {
    axios.get(`/api/userData/${this.props.match.params.userid}`).then(res => {
      let {fullname, bio, profile_pic, email, phone} = res.data[0]
      this.setState({
        fullName: fullname,
        bio: bio,
        profilePic: profile_pic,
        email: email,
        phone: phone
      })
    })
  }

  changeName(value) {
    this.setState({fullName: value})
  }

  changeBio(value) {
    this.setState({bio: value})
  }

  changeEmail(value) {
    this.setState({email: value})
  }

  changePhone(value) {
    this.setState({phone: value})
  }

  confirmChanges = async () => {
    let {fullName, bio, email, phone} = this.state
    await axios.put(`/api/userData/${this.props.match.params.userid}`, {fullName, bio, email, phone});
    this.props.history.push(`/profile/${this.props.match.params.userid}`);
  }

  render() {
    return (
      <div className='profileEdit-page'>
        <span>image</span>
        <div className='profileEdit-nameAndBio'>
          <div className='profileEdit-nameContainer'>
            <span>Name:</span>
            <br/>
            <input className='profileEdit-input' maxlength='100' value={this.state.fullName} onChange={e => this.changeName(e.target.value)}/>
          </div>
          <div className='profileEdit-bioContainer'>
            <span>Bio:</span>
            <br/>
            <textarea className='profileEdit-bio' maxlength='200' value={this.state.bio} onChange={e => this.changeBio(e.target.value)}/>
          </div>
        </div>
        <div className='emailAndPhone'>
          <div className='profileEdit-emailContainer'>
            <span>Email:</span>
            <br/>
            <input className='profileEdit-input' maxlength='70' value={this.state.email} onChange={e => this.changeEmail(e.target.value)}/>
          </div>
          <div className='profileEdit-phoneContainer'>
            <span>Phone Number:</span>
            <br/>
            <input className='profileEdit-input' maxlength='25' value={this.state.phone} onChange={e => this.changePhone(e.target.value)}/>
          </div>
        </div>
        <div className='profileEdit-buttonContainer'>
          <button className='profileEdit-confirm' onClick={() => this.confirmChanges()}>Confirm</button>
        </div>
      </div>
    )
  }
}