import React, {Component} from 'react';
import './_Nav.scss';
import {Link} from 'react-router-dom';
import { getUserInfo } from './../../ducks/reducer';
import { connect } from 'react-redux';
import axios from 'axios';
import ToolBrosLogo from './../../assets/ToolBrosLogo.png';

class Nav extends Component {
    constructor() {
        super();

        this.state = {
            showProfileNav: false
        }
    }

    updateProfileNav = () => {
        let boolVal = !this.state.showProfileNav
        this.setState({ showProfileNav : boolVal })
    }

    changeMenu = () => {
        const checkbox = document.getElementById('nav_checkbox')
        checkbox.click()
    }

    componentDidMount = () => {
        axios.get('/api/user-data').then(res=>{
            this.props.getUserInfo(res.data)
           
        })
    }

    login = () => {
        const { REACT_APP_DOMAIN, REACT_APP_CLIENT_ID } = process.env;

        const redirectUri = encodeURIComponent(`${window.origin}/auth/callback`);
    
        window.location = `https://${REACT_APP_DOMAIN}/authorize?client_id=${REACT_APP_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${redirectUri}&response_type=code`;
    }

    logout = () => {
        this.updateProfileNav()
        axios.get('/api/logout').then(
            this.props.users.username = false
        )
        
    }

    render() {
        return (
            <div className="nav-bar">
                <div id="menuToggle">
                    <input id="nav_checkbox" type="checkbox" />

                    <span></span>
                    <span></span>
                    <span></span>

                    <ul id="menu">
                        
                        <Link to="/" className="nav-links" ><li onClick={ () => this.changeMenu() }>Home</li></Link>
                        <Link to="/search" className="nav-links" ><li onClick={ () => this.changeMenu() }>Tool Search</li></Link>
                        <Link to="/faq" className="nav-links" ><li onClick={ () => this.changeMenu() }>FAQ</li></Link>
                        { this.props.users.username ? <Link to="/post" className="nav-links" ><li onClick={ () => this.changeMenu() }>Add Tool</li></Link>  : '' }
                        { this.props.users.username ? <Link to="/messages" className="nav-links" ><li onClick={ () => this.changeMenu() }>Messages</li></Link>  : '' }
                        { this.props.users.username ? <Link to="/" className="nav-links" ><li onClick={ this.logout }>Logout</li></Link> : '' }
                    </ul>
                </div>
                <div className='middle-nav'>
                    <div className='nav-logoContain'>
                        <img src={ToolBrosLogo} className='nav-logoIcon' alt="logo"/>
                    </div>
                    <h2 className='nav-title'>Tool Share</h2>
                </div>
                { this.props.users.username ? <Link to={`/profile/${this.props.users.userid}`} className="nav-links" ><img className="nav_profile_icon" src={this.props.users.profile_pic} alt="profile icon"/></Link> : <h3 onClick={this.login} className="nav_register_link">Login</h3> }

                {/* <ul id={ this.state.showProfileNav ? "profile-menu-show" : "profile-menu-disable" }>
                    <Link to={`/profile/${this.props.users.userid}`} className="nav-profile-links" ><li onClick={ this.updateProfileNav }>Profile</li></Link>
                    <Link to="/messages" className="nav-profile-links" ><li onClick={ this.updateProfileNav }>Messages</li></Link>
                    <Link to="/" className="nav-profile-links" ><li onClick={ this.logout }>Logout</li></Link>
                </ul> */}
            </div>            
        );
    };
};

function mapStateToProps (state) {
    return {
        users: state.user
    }
}

export default connect (mapStateToProps, {getUserInfo})(Nav);