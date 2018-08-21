import React, { Component } from 'react';
import axios from 'axios';
import { connect } from "react-redux";
import { getUserInfo, setRoomID } from './../../ducks/reducer';
import { promises } from 'fs';
import { Link } from 'react-router-dom'

class Messages extends Component {
    constructor() {
        super();

        this.state ={
            messages: []
        }
    }

    componentDidMount() {
        let messagesArr = []
        axios.get('/api/user-data').then(res=>{
            this.props.getUserInfo(res.data) 
        })
        Promise.all([
            axios.get(`/api/sendermessages/${this.props.users.userid}`).then(res => {
                console.log(res)
                for (let i = 0; i < res.data.length; i++) {
                    messagesArr.push(res.data[i])
                }
            }),
            axios.get(`/api/receivermessages/${this.props.users.userid}`).then(res => {
                console.log(res)
                for (let i = 0; i < res.data.length; i++) {
                    messagesArr.push(res.data[i])
                }
            })
        ]).then(() => {
            this.setState({messages: messagesArr})
        })
    }

    joinRoom = (room_id) => {
        this.props.setRoomID(room_id)
    }

    render() {
        console.log(this.state.messages)
        let messagesToDisplay = this.state.messages.map((e, i) => {
            console.log('e is this yo =', e)
            return (
                
                <Link to={`/chat/${e.room_id}`} className="link_to_chat">
                <div key={e.fullname + i} className="individual_message" onClick={() => this.joinRoom(e.room_id)}>
                    <img className="messages_profile_icon" src={e.profile_pic} alt="profile_pic"/>
                    <div className="messages_name">{e.fullname}</div>
                    <div className='messages-side'>
                    <div className="messages_time">{e.message_time}</div>
                    <div className="messages_time">{e.message_date}</div>
                    </div>
                </div>
                </Link>
            )
        })
        return (
            <div className="Messages">
                <header className="Messages_header">Messages:</header>
                <div className="Message_list">
                    { messagesToDisplay }
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
      users: state.user
    };
  }
  
  export default connect(mapStateToProps, {getUserInfo, setRoomID})(Messages);