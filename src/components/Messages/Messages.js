import React, { Component } from 'react';
import axios from 'axios';
import { connect } from "react-redux";

class Messages extends Component {

    render() {
        return (
            <div className="Messages">
                <header className="Messages_header">Messages:</header>
                <div className="Message_list">
                    <div className="individual_message">
                        <img className="messages_profile_icon" src="https://pbs.twimg.com/profile_images/633817680286384128/TMHEs83b.jpg" alt="he-man"/>
                        <div className="messages_name">He Man</div>
                        <div className="messages_time">2:34 p.m.</div>
                    </div>
                    <div className="individual_message">
                        <img className="messages_profile_icon" src="https://pbs.twimg.com/profile_images/633817680286384128/TMHEs83b.jpg" alt="he-man"/>
                        <div className="messages_name">He Man</div>
                        <div className="messages_time">2:34 p.m.</div>
                    </div>
                    <div className="individual_message">
                        <img className="messages_profile_icon" src="https://pbs.twimg.com/profile_images/633817680286384128/TMHEs83b.jpg" alt="he-man"/>
                        <div className="messages_name">He Man</div>
                        <div className="messages_time">2:34 p.m.</div>
                    </div>
                    <div className="individual_message">
                        <img className="messages_profile_icon" src="https://pbs.twimg.com/profile_images/633817680286384128/TMHEs83b.jpg" alt="he-man"/>
                        <div className="messages_name">He Man</div>
                        <div className="messages_time">2:34 p.m.</div>
                    </div>
                    <div className="individual_message">
                        <img className="messages_profile_icon" src="https://pbs.twimg.com/profile_images/633817680286384128/TMHEs83b.jpg" alt="he-man"/>
                        <div className="messages_name">He Man</div>
                        <div className="messages_time">2:34 p.m.</div>
                    </div>
                    <div className="individual_message">
                        <img className="messages_profile_icon" src="https://pbs.twimg.com/profile_images/633817680286384128/TMHEs83b.jpg" alt="he-man"/>
                        <div className="messages_name">He Man</div>
                        <div className="messages_time">2:34 p.m.</div>
                    </div>
                    <div className="individual_message">
                        <img className="messages_profile_icon" src="https://pbs.twimg.com/profile_images/633817680286384128/TMHEs83b.jpg" alt="he-man"/>
                        <div className="messages_name">He Man</div>
                        <div className="messages_time">2:34 p.m.</div>
                    </div>
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