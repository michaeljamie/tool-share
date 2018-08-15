import React, {Component} from 'react';
import './_Nav.scss';
import {Link} from 'react-router-dom';

class Nav extends Component {
    constructor() {
        super();
        this.state = {
            showMenu: false
        };
    };

    render() {
        return (
            <div className="nav-bar">
                <div id="menuToggle">
                    <input type="checkbox" />

                    <span></span>
                    <span></span>
                    <span></span>

                    <ul id="menu">
                        <Link to="/" className="nav-links" ><li>Home</li></Link>
                        <Link to="/profile" className="nav-links" ><li>Profile</li></Link>
                        <Link to="/search" className="nav-links" ><li>Search</li></Link>
                        <Link to="/faq" className="nav-links" ><li>FAQ</li></Link>
                    </ul>
                </div>
            </div>            
        );
    };
};

export default Nav;