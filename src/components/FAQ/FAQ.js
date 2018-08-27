import React, { Component } from 'react'
import './_FAQ.scss'
import letterQ from '../../assets/letterQ.png'
import upArrowGold from '../../assets/upArrowGold.png'
import downArrowGold from '../../assets/downArrowGold.png'
import { Link } from 'react-router-dom';

class FAQ extends Component {
    constructor() {
        super();

        this.state = {
            q1Clicked: false,
            q2Clicked: false,
            q3Clicked: false,
            q4Clicked: false,
        }
    }

    dropDownAnswer = (property) => {
        this.setState({ [property]: !this.state[property]})
    }

    render() {
        return (
            <div className="FAQ-component">
                <div className="FAQ-header">Frequently Asked Questions</div>
                <div className="FAQ-questions">
                    <div className="FAQ-individual-questions" onClick={ () => {this.dropDownAnswer('q1Clicked')} }>
                    <i className="fas fa-question"></i>
                        <div className="actual-question">How does Tool Share Work?</div>
                        <img className="FAQ-down-arrow" src={this.state.q1Clicked ? upArrowGold : downArrowGold} alt="see_more"/>
                    </div>
                    
                    <div className={this.state.q1Clicked ? "answer-displayed" : "answer-not-displayed"}>It's simple!  You log in to the app, find the tool you need, and initiate payment.  You can message the renter to arrange a pick-up location and you're all set!</div>
                  
                    <div className="FAQ-individual-questions" onClick={ () => {this.dropDownAnswer('q2Clicked')} }>
                        <i className="fas fa-question"></i>
                        <div className="actual-question">Is there a certain time I need to return the tool?</div>
                        <img className="FAQ-down-arrow" src={this.state.q2Clicked ? upArrowGold : downArrowGold} alt="see_more"/>
                    </div>
                    <div className={this.state.q2Clicked ? "answer-displayed" : "answer-not-displayed"}>Your pickup time is decided between you and the lister.  The return time should be the same or earlier on the actual return date.</div>
                    <div className="FAQ-individual-questions" onClick={ () => {this.dropDownAnswer('q3Clicked')} }>
                        <i className="fas fa-question"></i>
                        <div className="actual-question">What do I do if a tool is returned damaged?</div>
                        <img className="FAQ-down-arrow" src={this.state.q3Clicked ? upArrowGold : downArrowGold} alt="see_more"/>
                    </div>
                    <div className={this.state.q3Clicked ? "answer-displayed" : "answer-not-displayed"}>Please contact us if a tool is damaged by the renter before marking it as 'returned'.  Our user agreement covers damage, and the seller will be held responsible.</div>
                    <div className="FAQ-individual-questions" onClick={ () => {this.dropDownAnswer('q4Clicked')} }>
                        <i className="fas fa-question"></i>
                        <div className="actual-question">Why do I need to put in so much personal information?</div>
                        <img className="FAQ-down-arrow" src={this.state.q4Clicked ? upArrowGold : downArrowGold} alt="see_more"/>
                    </div>
                    <div className={this.state.q4Clicked ? "answer-displayed" : "answer-not-displayed"}>We use your data in order to make the best possible suggestions for tools in your area.  Your data is totally secure and we don't share with 3rd parties.</div>
                </div>
                <Link to="/terms_and_conditions" className="tac_link">Please see our terms of service</Link>
            </div>
        )
    }
}

export default FAQ