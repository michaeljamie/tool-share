import React, { Component } from 'react';
import io from 'socket.io-client';
import Chatbox from './Chatbox/Chatbox';

const socket = io(`http://localhost:3005`)

export default class Chat extends Component {
    constructor(){
      super();
      this.state = {
          messages: []
      }
  
      
    }

    componentDidMount = () => {
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
                
                />
            )
        })

        return(
            <div className = 'chat-body'>
                <div ref={(div) => { this.messageList = div }} className="chat-messages">
                    { messages[0] ? messages : null}
                </div>
                <div className="input">
                    <input className='chatinput' onKeyDown={this.keyPress} onChange = {(e) => {this.setState ({ message: e.target.value })}} ref = 'message' placeholder = 'Enter Message'/>
                    
                    <img className = 'send' onClick={this.sendMessage} src='' alt=""/>
                </div>
                
            </div>
        )
    }

}