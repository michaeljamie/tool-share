import React, { Component } from 'react';
import axios from 'axios';
import { connect } from "react-redux";

class Messages extends Component {
    constructor() {
        super();

        this.state ={
            messages: []
        }
    }

    componentDidMount() {
        axios.get(`/api/messages/${this.props.users.userid}`).then(res => {
            this.setState({messages: res.data})
        })
    }

    render() {
        let messagesToDisplay = this.state.messages.map((e, i) => {
            return (
                <div className="individual_message">
                    <img className="messages_profile_icon" src="https://pbs.twimg.com/profile_images/633817680286384128/TMHEs83b.jpg" alt="he-man"/>
                    <div className="messages_name">He Man</div>
                    <div className="messages_time">2:34 p.m.</div>
                </div>
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
  
  export default connect(mapStateToProps)(Messages);