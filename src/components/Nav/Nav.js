import React, {Component} from 'react';
import './Nav.css';
import {Link} from 'react-router-dom';

class Nav extends Component {
    constructor() {
        super();
        this.state = {};
    };

    render() {
        return (
            <div className="nav">
                <Link to='/'><div className='nav-link'>Home</div></Link>
                <Link to='/profile'><div className='nav-link'>Profile</div></Link>
                <Link to='/search'><div className='nav-link'>Search</div></Link>
                <Link to='/faq'><div className='nav-link'>FAQ</div></Link>
            </div>
        );
    };
};

export default Nav;