import React, { Component } from 'react'
import './_FAQ.scss'
import letterQ from '../../assets/letterQ.png'
import upArrowBlack from '../../assets/upArrowBlack.png'
import downArrowBlack from '../../assets/downArrowBlack.png'
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
                        <img className="Q" src={letterQ} alt="Q"/>
                        <div className="actual-question">How does Tool Share Work?</div>
                        <img className="FAQ-down-arrow" src={this.state.q1Clicked ? upArrowBlack : downArrowBlack} alt="see_more"/>
                    </div>
                    <div className={this.state.q1Clicked ? "answer-displayed" : "answer-not-displayed"}>Answer:  You pay people money to use their tools.</div>
                    <div className="FAQ-individual-questions" onClick={ () => {this.dropDownAnswer('q2Clicked')} }>
                        <img className="Q" src={letterQ} alt="Q"/>
                        <div className="actual-question">How can I be sure I won't be raped when I pick up tools?</div>
                        <img className="FAQ-down-arrow" src={this.state.q2Clicked ? upArrowBlack : downArrowBlack} alt="see_more"/>
                    </div>
                    <div className={this.state.q2Clicked ? "answer-displayed" : "answer-not-displayed"}>Answer:  Honestly there's no guarantee you won't get raped so this is a pointless question.</div>
                    <div className="FAQ-individual-questions" onClick={ () => {this.dropDownAnswer('q3Clicked')} }>
                        <img className="Q" src={letterQ} alt="Q"/>
                        <div className="actual-question">What do I do if I suspect the tools I'm renting out are being used for murder?</div>
                        <img className="FAQ-down-arrow" src={this.state.q3Clicked ? upArrowBlack : downArrowBlack} alt="see_more"/>
                    </div>
                    <div className={this.state.q3Clicked ? "answer-displayed" : "answer-not-displayed"}>Answer:  I wouldn't say anything bro, snitches get stitches.</div>
                    <div className="FAQ-individual-questions" onClick={ () => {this.dropDownAnswer('q4Clicked')} }>
                        <img className="Q" src={letterQ} alt="Q"/>
                        <div className="actual-question">Why do I need to put in so much personal information?</div>
                        <img className="FAQ-down-arrow" src={this.state.q4Clicked ? upArrowBlack : downArrowBlack} alt="see_more"/>
                    </div>
                    <div className={this.state.q4Clicked ? "answer-displayed" : "answer-not-displayed"}>Answer:  Mark Zuckerberg is paying us to collect as much data about you as we can.</div>
                </div>
                <Link to="/terms_and_conditions" className="tac_link">Please see our terms of service</Link>
            </div>
        )
    }
}

export default FAQ