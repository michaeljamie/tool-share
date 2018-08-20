import React, { Component } from 'react';
import axios from 'axios';
import { connect } from "react-redux";
import { getUserInfo } from './../../ducks/reducer';
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
                for (let i = 0; i < res.data.length; i++) {
                    messagesArr.push(res.data[i])
                }
            }),
            axios.get(`/api/receivermessages/${this.props.users.userid}`).then(res => {
                for (let i = 0; i < res.data.length; i++) {
                    messagesArr.push(res.data[i])
                }
            })
        ]).then(() => {
            this.setState({messages: messagesArr})
        })
    }

    render() {
        let messagesToDisplay = this.state.messages.map((e, i) => {
            return (
                <Link to={`/chat/${e.message_id}`}>
                <div key={e.fullname + i} className="individual_message">
                    <img className="messages_profile_icon" src={e.profile_pic} alt="profile_pic"/>
                    <div className="messages_name">{e.fullname}</div>
                    <div className="messages_time">2:23 p.m.</div>
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
  
  export default connect(mapStateToProps, {getUserInfo})(Messages);