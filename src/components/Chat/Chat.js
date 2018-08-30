import React, { Component } from 'react';
import io from 'socket.io-client';
import Chatbox from './Chatbox/Chatbox';
import whiteMessage from './../../assets/whiteMessage.png';
import { connect } from 'react-redux';
import axios from 'axios';

const socket = io()

class Chat extends Component {
    constructor(){
      super();
      this.state = {
          messages: []
      }
  
      
    }

    componentDidMount = () => {
        axios.get(`/api/messages/${this.props.match.params.messageid}`).then(res => {
            const messages = [ ...this.state.messages, ...res.data.map(e => e)]
            this.setState({messages})
        })
        socket.on(`message dispatched-${this.props.current_room}`, data => {
            const messages = [ ...this.state.messages, data]
            this.setState({messages})
        })
    }

    componentDidUpdate = ()  => {
        this.scrollToBottom()
    }

    sendMessage = () => {
        var obj={
            userid: this.props.user.userid,
            message: this.refs.message.value,
            profile_pic: this.props.user.profile_pic,
            username: this.props.user.username,
            current_room: this.props.current_room
        }
        socket.emit('message sent', obj)
        this.refs.message.value = '';
    }

    scrollToBottom() {
        const scrollHeight = this.messageList.scrollHeight;
        const height = this.messageList.clientHeight;
        const maxScrollTop = scrollHeight - height;
        this.messageList.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    }

    keyPress = (e) => {
        if(e.keyCode === 13){
            this.sendMessage();
        }
    }
    


    render(){
        const messages = this.state.messages.map((e,i) => {
            return(
                <Chatbox
                key={i}
                userObj = {e}
                message = {e.message}
                messageUserpic = {e.profile_pic}
                messageUsername = {e.username}
                time = {e.time}
                date = {e.date}
                currentUser={this.props.user.username}
                username={this.props.user.username}
                userpic={this.props.user.profile_pic}
                />
            )
        })

        return(
            <div className = 'chat-body'>

                <div ref={(div) => { this.messageList = div }} className="chat-messages">
                    { messages[0] ? messages : null}
                </div>
                <div className="chat-input">
                    <input className='chat-inputBox' onKeyDown={this.keyPress} ref = 'message' placeholder = 'Enter Message'/>
                    <div className='chat-button'>
                        <img className = 'chat-send' onClick={this.sendMessage} src={whiteMessage} alt=""/>
                    </div>
                </div>
                
            </div>
        )
    }

}

function mapStateToProps(state){
    return {
        user: state.user,
        current_room: state.current_room
    }
}

export default connect(mapStateToProps)(Chat);