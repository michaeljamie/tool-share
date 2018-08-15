import React, {Component} from 'react';
import './_Nav.scss';
import {Link} from 'react-router-dom';
import { getUserInfo } from './../../ducks/reducer';
import { connect } from 'react-redux';
import axios from 'axios';

class Nav extends Component {
    constructor() {
        super();
    };

    changeMenu = () => {
        const checkbox = document.getElementById('nav_checkbox')
        checkbox.click()
    componentDidMount = () => {
        axios.get('/api/user-data').then(res=>{
            this.props.getUserInfo(res.data)
           
        })
    }

    render() {
        console.log(this.props.users.username)
        return (
            <div className="nav-bar">
                <div id="menuToggle">
                    <input id="nav_checkbox" type="checkbox" />

                    <span></span>
                    <span></span>
                    <span></span>

                    <ul
                    
                    id="menu">
                        <Link to="/" className="nav-links" ><li onClick={ () => this.changeMenu() }>Home</li></Link>
                        <Link to="/profile" className="nav-links" ><li onClick={ () => this.changeMenu() }>Profile</li></Link>
                        <Link to="/search" className="nav-links" ><li onClick={ () => this.changeMenu() }>Search</li></Link>
                        <Link to="/faq" className="nav-links" ><li onClick={ () => this.changeMenu() }>FAQ</li></Link>
                    </ul>
                </div>
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