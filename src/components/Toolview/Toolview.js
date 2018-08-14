import React, {Component} from 'react';
import Lister from './../Lister/Lister';
import Calendar from './Calendar';
import 'react-dates/lib/css/_datepicker.css';


class Toolview extends Component {
    constructor(){
        super()
    }


    render(){
       
        
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
                    <div className = "toolview-map">
                        Map
                    </div>
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