import React, {Component} from 'react';
import './_Nav.scss';
import {Link} from 'react-router-dom';

class Nav extends Component {
    constructor() {
        super();
    };

    changeMenu = () => {
        // document.getElementById('nav_checkbox').value = "off"
        // console.log(document.getElementById('nav_checkbox').value)
        const checkbox = document.getElementById('nav_checkbox')
        checkbox.click()
    }

    render() {
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

export default Nav;