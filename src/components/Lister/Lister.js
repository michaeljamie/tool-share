import React from 'react';
import {Link} from 'react-router-dom';
import StarRating from '../StarRating/StarRating';

export default function Lister (props) {
    console.log(props)


    return (
        <div className='lister-body'>
            <div className='lister-name'>{props.name}</div>
            <Link className='lister-pic-link' to={`/profile/${props.ownerid}`}><img className="lister-pic" src={props.pic}/></Link>
            <StarRating rateType={"Lister"} rating={props.rating} />
        </div>
    )
}
