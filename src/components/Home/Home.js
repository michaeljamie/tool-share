import React, { Component } from 'react';
import whiteCard from './../../assets/whiteCard.png';
import whiteClipboard from './../../assets/whiteClipboard.png';
import whiteShield from './../../assets/whiteShield.png';

export default class Home extends Component {
    constructor(){
        super();
    }


    render() {
        return(
            <div className='home-main'>
                <div className='home-header'>
                    <div className='home-headerText'>
                        <h1>RENT TOOLS</h1>
                        <h2>FROM YOUR MOTHER</h2>
                    </div>
                    
                    <div>
                        <button>Find Tools Now</button>
                    </div>
                </div>
                <div className = 'home-searchBar'>
                    <input type="text" placeholder ='Zip Code'/>
                    <input type="text" placeholder ='ex. Hammer Drill, Jack Hammer, Plate Compactor, etc'/>
                    <button>Search Your Area</button>
                    <div>Example Item</div>
                    <div>Example Item</div>
                    <div>Example Item</div>
                    <div>Example Item</div>

                </div>
                <div className = 'home-steps'>
                    <h1 className = 'steps-text'>HERE'S HOW IT WORKS</h1>

                </div>
                <div className = 'home-safe'>
                    <h1 className = 'home-safeText'>WE'VE GOT YOU COVERED</h1>
                    <div className = 'home-mid'>
                        <div className = 'home-iconBox'>
                            <img src={whiteCard} className = 'home-icon' alt=""/>
                        </div>
                    </div>
                    <div className = 'home-mid'>
                        <div className = 'home-iconBox'>
                            <img src={whiteClipboard} className = 'home-icon' alt=""/>
                        </div>
                    </div>
                    <div className = 'home-mid'>
                        <div className = 'home-iconBox'>
                            <img src={whiteShield} className = 'home-icon' alt=""/>
                        </div>
                    </div>

                </div>
                
            </div>
        )
    }
}