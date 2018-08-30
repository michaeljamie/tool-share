import React, { Component } from 'react';
import axios from 'axios';
import Button from './HomeButton/Button';
import whiteCard from './../../assets/whiteCard.png';
import whiteClipboard from './../../assets/whiteClipboard.png';
import whiteShield from './../../assets/whiteShield.png';
import { Link } from 'react-router-dom';
import ex1 from './../../assets/ex1.jpg';
import ex2 from './../../assets/ex2.jpg';
import ex3 from './../../assets/ex3.jpg';
import ex4 from './../../assets/ex4.jpg';
import whiteArrow from './../../assets/whiteArrow.png';
import dude from './../../assets/dude.png';
import dude1 from './../../assets/dude1.png';
import construction from './../../assets/construction.png';
import hammertime from './../../assets/hammertime.png';
import car from './../../assets/car.png';
import ladderguy from './../../assets/ladderguy.png';
import treehouse from './../../assets/treehouse.png';
import fireworks from './../../assets/fireworks.gif';
import SearchBar from './../../components/SearchBar/SearchBar';
import ToolBrosLogoYellow from './../../assets/ToolBrosLogoYellow.png'


export default class Home extends Component {
    constructor(){
        super();

        this.state = {
            zipCode: '',
            toolSearch: '',
            formname: '',
            formemail: '',
            formphone: '',
            formmessage: '',
            keyword: '',
            
        }
    }

    componentDidMount() {
        window.scrollTo(0,0);
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


    handleSubmit = (e) => {
        e.preventDefault()
        const {formname, formemail, formphone, formmessage} = this.state;

        axios.post('./api/send', {
           formname,
           formemail,
           formphone,
           formmessage 
        });
        this.setState({
            formname: '',
            formemail: '',
            formphone: '',
            formmessage: ''
        })
    }

    handleZipChange = (value) => {
        console.log(value)
        this.setState({
            zipCode: value
        })
    }

    handleSearchClick = () => {
        return this.props.history.push('/toolsearch')
       
    }


  handleSearchFromSearchBar = (value) => {
    let searchResults = null
    this.setState({
      searchResults: []
    })
    axios.get('/api/tools').then( res => {
      
        searchResults = res.data
      
    }).then(()=>{
    
    let ids = searchResults.filter(tools=>{
      return tools[value] === true
    })  
   
    let displayedTools = ids.map(tool=>{
      axios.post('api/get_tools_by_search', {tool_id: tool.tool_id})
      .then(res=>{
        this.setState({
          searchResults: [...this.state.searchResults, ...res.data]
        })
      })
    })
  })
  }


    render() {

        return(
            <div className='home-main'>
                <div className='home-header'>
                    <div className='home-headerText'>
                        <img src={ToolBrosLogoYellow} alt="logo" className='header-logo'/>
                        <h1 className='home-header-1'>RENT TOOLS</h1>
                        <h2 className='home-header-2'>FROM YOUR NEIGHBOR'S GARAGE</h2>

                    </div>
                    
                    <div className = 'home-headbutt'>
                    {/* <Button/> */}
                    
                        <Link to= '/search' className = 'home-Link'><a href="#" className='btn btn-sm animated-button gibson-two'>Find Tools</a></Link>
                    
                    </div>
                    <div className='home-icons'>
                        {/* <img src={whiteHammer} alt="" className = 'home-icon1'/> */}
                        <img src={whiteArrow} alt="" className = 'home-icon2'/>
                    </div>
                </div>
                <div className = 'home-searchBar'>
                    {/* <h3 className='home-searchTop'>Start Searching:</h3>
                    <div className='home-contactDiv'>
                        <p className = 'home-inputText'>Zip Code</p>
                        <input className = 'home-input1' onChange={(e)=>this.handleZipChange(e.target.value)} type="text" />
                    </div>
                    <div className='home-contactDiv'>
                        <p  className = 'home-inputText'>Keyword</p>
                        <SearchBar history={this.props.history} location={this.props.location} handleSearch={this.handleSearchFromSearchBar}/>
                    </div>
                    {/* <input type="text" placeholder ='Zip Code'/>
                    <input type="text" placeholder ='ex. Hammer Drill, Jack Hammer, Plate Compactor, etc'/> */}
                    
                    <Link className='home-toolLink' to ='/toolview/29'>
                        <div className='home-exampleCard'>
                            <img src={ex1} className='home-examplePic' alt=""/>
                            <div className='home-exampleRight'>
                                <div className='home-titleBox'>
                                    <h3 className='home-exampleTitle'>$25/Day</h3>
                                </div>                      
                                <p className='home-tool1'>Lawnmower</p>
                                <p className='home-tool'>Honda</p>
                            </div>
                        </div>
                    </Link>
                    <Link className='home-toolLink' to ='/toolview/33'>
                        <div className='home-exampleCard'>
                            <img src={ex2} className='home-examplePic' alt=""/>
                            <div className='home-exampleRight'>
                                <div className='home-titleBox'>
                                    <h3 className='home-exampleTitle'>$38/Day</h3>
                                </div>
                                <p className='home-tool1'>Power Auger</p>
                                <p className='home-tool'>Southland</p>
                            </div>
                        </div>
                    </Link>
                    <Link className='home-toolLink' to ='/toolview/3'>
                        <div className='home-exampleCard'>
                            <img src={ex3} className='home-examplePic' alt=""/>
                            <div className='home-exampleRight'>
                                <div className='home-titleBox'>
                                    <h3 className='home-exampleTitle'>$25/Day</h3>
                                </div>
                                <p className='home-tool1'>Chainsaw</p>
                                <p className='home-tool'>Homelite</p>
                            </div>
                        </div>
                    </Link>
                    <Link className='home-toolLink' to ='/toolview/35'>
                        <div className='home-exampleCard'>
                            <img src={ex4} className='home-examplePic' alt=""/>
                            <div className='home-exampleRight'>
                                <div className='home-titleBox'>
                                    <h3 className='home-exampleTitle'>$7/Day</h3>
                                </div>
                                <p className='home-tool1'>Power Drill</p>
                                <p className='home-tool'>Craftsman</p>
                            </div>
                        </div>
                    </Link>
                    <Link to='/search' href="#" className= 'btn btn-sm animated-button gibson-two'>Find More Tools</Link>
                </div>
                <div className = 'home-steps'>
                    <h1 className = 'steps-text'>HERE'S HOW IT WORKS:</h1>

                    <div className = 'steps-section'>
           
                        <img src={dude} className = 'home-dude' alt=""/>
                        <div className = 'home-aboutText'>
                            <h3>Meet Jim</h3>
                        </div>
                        {/* <img src={arrowleft} className = 'steps-icon' alt=""/> */}
                    </div>
                    <div className = 'steps-section'>
                        <img src={car} className = 'home-car' alt=""/>
                        <div className = 'home-aboutText'>
                            <h3>Jim wants to build a treehouse for his kids</h3>
                        </div>
                    </div>
                    <div className = 'steps-section'>
                        <img src={dude1} className = 'home-dude2' alt=""/>
                        <div className = 'home-aboutText'>
                            <h3>Jim signs up for Tool Share, finds tools he needs, and goes to meet the lister</h3>
                        </div>
                    </div>
                    <div className = 'steps-section'>
                        <img src={construction} className = 'home-dude1' alt=""/>
                        <div className = 'home-aboutText'>
                            <h3>With his newly rented tools Jim is ready to begin</h3>
                        </div>
                    </div>
            

                    <div className = 'steps-section'>
                        <img src={ladderguy} className = 'home-dude3' alt=""/>
                        <div className = 'home-aboutText'>
                            <h3>He writes up plans and gets to work</h3>
                        </div>
                    </div>
                    <div className = 'steps-section'>
                        <img src={hammertime} className = 'home-dude4' alt=""/>
                        <div className = 'home-aboutText'>
                            <h3>Jim's happy he's saving $100s instead of buying brand new tools</h3>
                        </div>
                    </div>
                    <div className = 'steps-section'>
                        <img src={treehouse} className = 'home-tree' alt=""/>
                        <img src={fireworks} className = 'home-fireworks' alt=""/>
                        <div className = 'home-aboutText'>
                            <h3>Jim completes his project and returns the tools</h3>
                        </div>
                    </div>
                    <div className='FAQ-home'><h3>Please visit our <Link to="/FAQ"><a href="" className = 'home-rentalLink'>FAQs</a></Link> for additional information</h3></div>

                </div>
                <div className = 'home-signup'>
                    <h3 className='home-signupText'>Ready to begin?</h3>
                    <a href="#" className= 'btn btn-sm animated-button gibson-two' onClick={this.login}>SIGN-UP NOW</a>

                </div>
                <div className = 'home-safe'>
                    <h1 className = 'home-safeText'>WE'VE GOT YOU COVERED</h1>
                    <div className = 'home-mid'>
                        <div className = 'home-iconRight'>
                            <div className = 'home-iconBox'>
                                <img src={whiteCard} className = 'home-icon' alt=""/>
                            </div>
                        <h3 className = 'home-iconTitle'>SAFE PAYMENT</h3>
                        </div>
                        <div>
                        
                        <p className = 'home-iconText'>We've fully integrated Stripe to handle payments securely and safely.  We submit a pre-authorization hold for the rental amount plus a security deposit at the start of the rental.  The funds are settled for the rental cost once the tool is returned.</p>
                        </div>
                    </div>
                    <div className = 'home-mid'>
                        <div className = 'home-iconRight'>
                            <div className = 'home-iconBox'>
                                <img src={whiteClipboard} className = 'home-icon' alt=""/>
                            </div>
                        <h3 className = 'home-iconTitle'>USER AGREEMENT</h3>
                        </div>
                        <div>
                        
                        <p className = 'home-iconText'>We have contracts necessary to provide accountability from both parties for each and every rental.  Feel free to read our <Link to="/rental_agreement"><a href="" className = 'home-rentalLink'>Rental Agreement</a></Link> for more details.</p>
                        </div>
                    </div>
                    <div className = 'home-mid'>
                        <div className = 'home-iconRight'>
                            <div className = 'home-iconBox'>
                                <img src={whiteShield} className = 'home-icon' alt=""/>
                            </div>
                        <h3 className = 'home-iconTitle'>100% SECURE</h3>
                        </div>
                        <div>
                        
                        <p className = 'home-iconText'>We handle your payment, and we don't give out any of your information until the rental exchange has been scheduled.  You decide what information you would like to share.  You can message the buyer or seller directly and can arrange a meeting wherever you choose.</p>
                        </div>
                    </div>


                </div>
                <div className ='home-contact'>
                    <h3 className ='home-contactText'>CONTACT US:</h3>
                    <div className='home-contactDiv'>
                        <p className = 'home-inputText'>Name</p>
                        <input className = 'home-input1' type="text" onChange = {(e) => {this.handleChange('formname', e.target.value)}} value = {this.state.formname}/>
                    </div>
                    <div className='home-contactDiv'>
                        <p className = 'home-inputText'>Email</p>
                        <input className = 'home-input1' type="text" onChange = {(e) => {this.handleChange('formemail', e.target.value)}} value = {this.state.formemail}/>
                    </div>
                    <div className='home-contactDiv'>
                        <p className = 'home-inputText'>Phone Number</p>
                        <input className = 'home-input1' type="text" onChange = {(e) => {this.handleChange('formphone', e.target.value)}} value = {this.state.formphone}/>
                    </div>
                    <div className='home-contactDiv'>
                        <p className = 'home-inputText'>Message</p>
                        <input className = 'home-input1' type="text" onChange = {(e) => {this.handleChange('formmessage', e.target.value)}} value = {this.state.formmessage}/>
                    </div>
                    <a href="#" className= 'btn btn-sm animated-button gibson-two' onClick={this.handleSubmit}>Submit</a>
                    
                </div>
                
            </div>
        )
    }
}