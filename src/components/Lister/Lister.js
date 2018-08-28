import React from 'react';
import {Link} from 'react-router-dom';

export default function Lister (props) {
    return (
        <div className='lister-body'>
            <div className='lister-name'>{props.name}</div>
            <Link to={`/profile/${props.ownerid}`}><img className="lister-pic" src={props.pic}/></Link>
            <div className='lister-reviews'>Reviews</div>
        </div>
    )
}
