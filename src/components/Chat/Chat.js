import React, { Component } from 'react';
import io from 'socket.io-client';
import Chatbox from './Chatbox/Chatbox';
import whiteMessage from './../../assets/whiteMessage.png';
import { connect } from 'react-redux';
import axios from 'axios';

const socket = io(`http://localhost:3005`)

class Chat extends Component {
    constructor(){
      super();
      this.state = {
          messages: []
      }
  
      
    }

    componentDidMount = () => {
        axios.get(`/api/messages`).then(res => {

        })
        socket.on('message dispatched', data => {
            console.log('frontend receiving data =', data)
            const messages = [ ...this.state.messages, data]
            this.setState({messages})
        })
    }

    componentDidUpdate = ()  => {
        this.scrollToBottom()
    }

    sendMessage = () => {
        console.log(this.props)
        var obj={
            userid: this.props.user.userid,
            message: this.refs.message.value,
            profile_pic: this.props.user.profile_pic,
            username: this.props.user.username,
        }
        console.log(obj)
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
        user: state.user
    }
}

export default connect(mapStateToProps)(Chat);