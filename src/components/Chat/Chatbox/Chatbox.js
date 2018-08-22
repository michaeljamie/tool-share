import React from 'react';
import avatar from './../../../assets/avatar.jpg';
import avatar2 from './../../../assets/avatar2.jpg';

export default function Chatbox(props){
    var box
    if(props.currentUser === props.messageUsername){
        box = (
            <div className = 'chat-userChat1'>
                <div className='chat-right1'>  
                    <div className='chat-message'><p>{props.message ? props.message : ''}</p></div>
                </div>
                <div className='chat-side'>
                    <img src={props.userpic ? props.userpic : avatar} alt="avatar" className='chat-avatar1'/>
                    <div className='chat-username'><p>{props.username ? props.username : 'Anonymous User'}</p></div>
                    <div className='chat-date'><p>{props.date ? props.date : ''}</p></div>
                    <div className='chat-date'><p>{props.time ? props.time : ''}</p></div>
                </div>
            </div>
        )
    } else {
        box = (
            <div className = 'chat-userChat2'>
                <div className='chat-side'>
                    <img src={props.messageUserpic ? props.messageUserpic : avatar2} alt="avatar" className='chat-avatar2'/>
                    <div className='chat-username'><p>{props.messageUsername ? props.messageUsername : 'Anonymous User'}</p></div>
                    <div className='chat-date'><p>{props.date ? props.date : ''}</p></div>
                    <div className='chat-date'><p>{props.time ? props.time : ''}</p></div>
                </div>
                <div className='chat-right2'>
                    
                    <div className='chat-message'><p>{ props.message ? props.message : '' }</p></div>
                </div>
            </div>
        )
    }


    return(
        <div>
            {box}
        </div>
    )
}