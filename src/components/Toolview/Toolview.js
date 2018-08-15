import React, {Component} from 'react';
import Lister from './../Lister/Lister';
import Calendar from './Calendar';
import 'react-dates/lib/css/_datepicker.css';
import Iframe from 'react-iframe';
import axios from 'axios';

const {REACT_APP_GOOGLE_API_KEY} = process.env

class Toolview extends Component {
    constructor(){
        super()
    }

    render(){
        
        let map = 
        <Iframe url={`https://www.google.com/maps/embed/v1/place?key=${REACT_APP_GOOGLE_API_KEY}
        &q=Space+Needle,Seattle+WA`}
                width="300px"
                height="300px"
                id="myId"
                className="toolview-map"
                display="initial"
                position="relative"
                allowFullScreen
                />

        return(
            <div>
               <div className = "toolview-top">
                    <div className = "toolview-pic"> 
                        <img src="http://cdn1.grizzly.com/pics/jpeg500/g/g0623x-cd1bd439c663c63024eab578fbad1295.jpg" alt="table saw"/>
                    </div>
                    
                    <div className = "toolview-topright">
                        <div className = "toolview-price">
                            Price: $10/day
                        </div>
                        <div className = "toolview-calendar">
                            <Calendar/>
                        </div>
                        <div>
                            <button>Rent</button>
                        </div>
                    </div>
                </div>
                <div className = "toolview-description">
                    Tool description
                </div>
                <div className = "toolview-lower">
                    <div className = "toolview-lister">
                       <Lister/>
                    </div>
                    <div className = "toolview-additional">
                        <div>
                        Deposit: $100
                        </div>
                        <div>
                        Condition:
                        </div>
                        <div>
                        Additional:
                        </div> 
                    </div>
                </div>
                    <div className = "toolview-map">
                        {map}
                    </div>
               
                <div className = "toolview-bottom">
                    Other Listings:  
                    <div className = "toolview-other">
                        <div></div>
                        <div></div>
                        <div></div>  
                    </div>
                </div>
            </div>
        )
    }
}

export default Toolview;