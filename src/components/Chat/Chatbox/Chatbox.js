import React from 'react';
import avatar from './../../../assets/avatar.jpg';

export default function Chatbox(props){
    var box
    if(props.currentUser === props.messageUsername){
        box = (
            <div>
                <img src={props.userpic ? props.userpic : avatar} alt="avatar"/>
                <div><p>{props.username ? props.username : 'Anonymous User'}</p></div>
                <div><p>{props.message ? props.message : avatar}</p></div>
            </div>
        )
    } else {
        box = (
            <div>
                <img src={props.messageUserpic ? props.messageUserpic : ''} alt="avatar"/>
                <div><p>{props.messageUsername ? props.messageUsername : 'Anonymous User'}</p></div>
                <div><p>{ props.message ? props.message : '' }</p></div>
                
            </div>
        )
    }


    return(
        <div>
            {box}
        </div>
    )
}