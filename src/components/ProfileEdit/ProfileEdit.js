import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import swal from 'sweetalert2';
const {REACT_APP_DOMAIN, REACT_APP_CLIENT_ID, REACT_APP_CLOUD_PRESET, REACT_APP_CLOUD_KEY, REACT_APP_CLOUD_NAME } = process.env;

export default class ProfileEdit extends Component {
  constructor() {
    super();
    this.state = {
      fullName: '',
      bio: '',
      profilePic: null,
      email: '',
      phone: '',
      zip: ''
    }
  }

  componentDidMount() {
    axios.get('/api/session').then(res =>
      res.data.user ?
      console.log('User on Session')
      : this.login()
    );
    window.scrollTo(0,0);
    axios.get(`/api/userData/${this.props.match.params.userid}`).then(res => {
      let {fullname, bio, profile_pic, email, phone, zipcode} = res.data[0]
      console.log(res.data[0])
      this.setState({
        fullName: fullname,
        bio: bio,
        profilePic: profile_pic,
        email: email,
        phone: phone,
        zip: zipcode
      })
    })
  }

  login = () => {
    const redirectUri = encodeURIComponent(`${window.origin}/auth/callback`);
    window.location = `https://${REACT_APP_DOMAIN}/authorize?client_id=${REACT_APP_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${redirectUri}&response_type=code`
  };

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

  changeZip(value) {
    this.setState({zip: value})
  }

  confirmChanges = async () => {
    let {fullName, bio, email, phone, zip} = this.state
    await axios.put(`/api/userData/${this.props.match.params.userid}`, {fullName, bio, email, phone, zip});
    this.props.history.push(`/profile/${this.props.match.params.userid}`);
  }

  deleteAccount = () => {
    const swalWithBootstrapButtons = swal.mixin({
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false,

    })

    swalWithBootstrapButtons({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      background: '#252525',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        axios.delete('/api/deleteUser')
        this.props.history.push('/')
        swalWithBootstrapButtons({
          title: 'Deleted!',
          text: 'Your account has been deleted.',
          type: 'success',
          background: '#252525'
        })
      } else if (
        result.dismiss === swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons({
          title: 'Cancelled',
          text: 'Your account is safe.',
          type: 'error',
          background: '#252525'
        })
      }
    })
  }

  render() {
    return (
      <div className='profileEdit-page'>
        <div className='profileEdit-section'>
          <div className='profileEdit-sectionDiv'>
            <p className='profileEdit-inputText'>Profile Picture:</p>
          </div>
        </div>
        <div className='profileEdit-section'>
          <div className='profileEdit-sectionDiv'>
            <p className='profileEdit-inputText'>Name:</p>
            <input className='profileEdit-input' maxlength='100' value={this.state.fullName} onChange={e => this.changeName(e.target.value)}/>
          </div>
        </div>
        <div className='profileEdit-section'>
          <div className='profileEdit-sectionDiv'>
          <p className='profileEdit-inputText'>Bio:</p>
          <textarea className='profileEdit-bio' maxlength='200' value={this.state.bio} onChange={e => this.changeBio(e.target.value)}/>
          </div>
        </div>
        <div className='profileEdit-section'>
          <div className='profileEdit-sectionDiv'>
            <p className='profileEdit-inputText'>Email:</p>
            <input className='profileEdit-input' maxlength='70' value={this.state.email} onChange={e => this.changeEmail(e.target.value)}/>
          </div>
        </div>
        <div className='profileEdit-section'>
          <div className='profileEdit-sectionDiv'>
            <p className='profileEdit-inputText'>Phone Number:</p>
            <input className='profileEdit-input' maxlength='25' value={this.state.phone} onChange={e => this.changePhone(e.target.value)}/>
          </div>
        </div>
        <div className='profileEdit-section'>
          <div className='profileEdit-sectionDiv'>
            <p className='profileEdit-inputText'>Zipcode:</p>
            <input className='profileEdit-input' maxlength='50' value={this.state.zip} onChange={e => this.changeZip(e.target.value)}/>
          </div>
        </div>
        <div className='profileEdit-section'>
          <button className='profileEdit-confirm' onClick={() => this.confirmChanges()}>Confirm</button>
          <button className='profileEdit-delete' onClick={() => this.deleteAccount()}>Delete Account</button>
        </div>
      </div>
    )
  }
}