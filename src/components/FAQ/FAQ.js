import React, { Component } from 'react'
import './_FAQ.scss'

class FAQ extends Component {
    constructor() {
        super();

        this.state = {
            q1Clicked: false,
            q2Clicked: false
        }
    }

    render() {
        return (
            <div className="FAQ_component">
                <div className="FAQ-header">Frequently Asked Questions</div>
                <div className="FAQ-questions">
                    <div className="FAQ-individual-questions">
                        <div>
                            <img src="https://www.iconsdb.com/icons/preview/black/letter-q-xxl.png" alt="Q"/>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
                        </div>
                        <img src="https://www.iconsdb.com/icons/preview/black/arrow-203-xxl.png" alt="see_more"/>
                    </div>
                    <div className="FAQ-individual-questions">
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
                        <img src="https://www.iconsdb.com/icons/preview/black/arrow-203-xxl.png" alt="see_more"/>
                    </div>
                </div>
            </div>
        )
    }
}

export default FAQ