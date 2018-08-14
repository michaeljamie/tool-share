import React from 'react';
import {Link} from 'react-router-dom';

export default function Footer () {
    return(
        <div className = 'foot-main'>
            <div>
                <Link to='/' className='foot-links'><h2 className='foot-link'>Home</h2></Link>
                <Link to='/search' className='foot-links'><h2 className='foot-link'>Search</h2></Link>
                <Link to='/faq' className='foot-links'><h2 className='foot-link'>FAQ</h2></Link>
            </div>
            <div>
                
            </div>
            <div>
            
            </div>

        </div>
    )
}