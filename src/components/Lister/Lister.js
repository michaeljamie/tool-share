import React from 'react';

export default function Lister (props) {
    return (
        <div className='lister-body'>
            <div className='lister-name'>{props.name}</div>
            <img className="lister-pic" src={props.pic}/>
            <div className='lister-reviews'>Reviews</div>
        </div>
    )
}
