import React, {Component} from 'react';
import Lister from './../Lister/Lister';

class Toolview extends Component {
    constructor(){
        super()

    }
    render(){
        return(
            <div>
               <div>
                    <div> 
                        <img src="http://cdn1.grizzly.com/pics/jpeg500/g/g0623x-cd1bd439c663c63024eab578fbad1295.jpg" alt="table saw"/>
                    </div>
                    <div>
                        Price
                    </div>
                </div>
                <div>
                    Tool description
                </div>
                <div>
                    <div>
                       <Lister/>
                    </div>
                    <div>
                        Deposit, Condition, Comments
                        
                    </div>
                    <div>
                        Map
                    </div>
                </div>
                <div>
                    Other Listings    
                </div>
            </div>
        )
    }
}

export default Toolview;