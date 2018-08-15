import React from 'react';

export default function Lister (props) {
    return (
        <div>
            {/* below is placeholder, need to import same lister info displayed on profile page */}
            <div>{props.name}</div>
            <img className="lister-pic" src={props.pic}/>
            <div>Reviews</div>
        </div>
    )
}
