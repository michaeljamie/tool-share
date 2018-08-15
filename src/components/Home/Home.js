import React, { Component } from 'react';
import whiteCard from './../../assets/whiteCard.png';
import whiteClipboard from './../../assets/whiteClipboard.png';
import whiteShield from './../../assets/whiteShield.png';
import { Link } from 'react-router-dom';
import ex1 from './../../assets/ex1.jpg';
import ex2 from './../../assets/ex2.jpg';
import ex3 from './../../assets/ex3.jpg';
import ex4 from './../../assets/ex4.jpg';

export default class Home extends Component {
    constructor(){
        super();

        this.state = {
            zipCode: '',
            toolSearch: ''
        }
    }

    login = () => {
        const { REACT_APP_DOMAIN, REACT_APP_CLIENT_ID } = process.env;

        const redirectUri = encodeURIComponent(`${window.origin}/auth/callback`);
    
        window.location = `https://${REACT_APP_DOMAIN}/authorize?client_id=${REACT_APP_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${redirectUri}&response_type=code`;
    }

    handleChange = (property, value) => {
        this.setState({
      [property]: value
    })
    }


    render() {
        return(
            <div className='home-main'>
                <div className='home-header'>
                    <div className='home-headerText'>
                        <h1>RENT TOOLS</h1>
                        <h2>FROM YOUR NEIGHBOR</h2>
                    </div>
                    
                    <div>
                        <Link to= '/search'><button>Find Tools Now</button></Link>
                    </div>
                </div>
                <div className = 'home-searchBar'>
                    <input type="text" placeholder ='Zip Code'/>
                    <input type="text" placeholder ='ex. Hammer Drill, Jack Hammer, Plate Compactor, etc'/>
                    <button>Search Your Area</button>
                    <div className='home-exampleCard'>
                        <img src={ex1} className='home-examplePic' alt=""/>
                        <div className='home-exampleRight'>
                            <h3>$25/Day</h3>
                        </div>
                    </div>
                    <div className='home-exampleCard'>
                        <img src={ex2} className='home-examplePic' alt=""/>
                        <div className='home-exampleRight'>
                            <h3>$38/Day</h3>
                        </div>
                    </div>
                    <div className='home-exampleCard'>
                        <img src={ex3} className='home-examplePic' alt=""/>
                        <div className='home-exampleRight'>
                            <h3>$20/Day</h3>
                        </div>
                    </div>
                    <div className='home-exampleCard'>
                        <img src={ex4} className='home-examplePic' alt=""/>
                        <div className='home-exampleRight'>
                            <h3>$7/Day</h3>
                        </div>
                    </div>

                </div>
                <div className = 'home-steps'>
                    <h1 className = 'steps-text'>HERE'S HOW IT WORKS:</h1>
                    <div className = 'steps-section'>

                    </div>
                    <div className = 'steps-section'>

                    </div>
                    <div className = 'steps-section'>

                    </div>
                    <div className = 'steps-section'>

                    </div>

                </div>
                <div className = 'home-signup'>
                    <h3 className='home-signupText'>Ready to begin?</h3>
                    <button  onClick={this.login}>SIGN-UP NOW</button>

                </div>
                <div className = 'home-safe'>
                    <h1 className = 'home-safeText'>WE'VE GOT YOU COVERED</h1>
                    <div className = 'home-mid'>
                        <div className = 'home-iconBox'>
                            <img src={whiteCard} className = 'home-icon' alt=""/>
             
                            
                        </div>
                        <h3>SAFE PAYMENT</h3>
                    </div>
                    <div className = 'home-mid'>
                        <div className = 'home-iconBox'>
                            <img src={whiteClipboard} className = 'home-icon' alt=""/>
                            
                        </div>
                        <h3>USER AGREEMENT</h3>
                    </div>
                    <div className = 'home-mid'>
                        <div className = 'home-iconBox'>
                            <img src={whiteShield} className = 'home-icon' alt=""/>
                            
                        </div>
                        <h3>100% SECURE</h3>
                    </div>

                </div>
                <div className ='home-contact'>
                    <h3 className ='home-contactText'>CONTACT US:</h3>
                    <input type="text" placeholder="Name"/>
                    <input type="text" placeholder="Email"/>
                    <input type="text" placeholder="Phone Number"/>
                    <textarea name="Question" id="" cols="30" rows="10" placeholder="Message"></textarea>
                    <button>Submit</button>

                </div>
                
            </div>
        )
    }
}