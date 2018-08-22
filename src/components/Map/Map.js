import React, {Component} from 'react';
import axios from 'axios';
import Iframe from 'react-iframe';

const {REACT_APP_GOOGLE_API_KEY} = process.env


class Map extends Component {
    constructor(){
        super()
        this.state = {
            owner_city: '',
            owner_state: '',
            owner_lat: '',
            owner_long: ''
        }
    }
    
    componentDidMount (){
        axios.get(`/api/tool/${this.props.id}`).then( tool => {  
            this.setState({
                owner_lat: tool.data.latitude,
                owner_long: tool.data.longitude,
                
            })  
        }).then ( () => {
            let lat = this.state.owner_lat
            let long = this.state.owner_long
            axios.get(`http://api.geonames.org/findNearbyPostalCodesJSON?lat=${lat}&lng=${long}&username=stepace`).then(res=>{
                if(lat && long){
                    this.setState({
                        owner_city: res.data.postalCodes[0].placeName,
                        owner_state: res.data.postalCodes[0].adminCode1,
                    })
                }
            })
        })
    }



    
    render(){

        let map = 
        <Iframe url={`https://www.google.com/maps/embed/v1/place?key=${REACT_APP_GOOGLE_API_KEY}&q=near+${this.state.owner_city},${this.state.owner_state}&center=${this.state.owner_lat},${this.state.owner_long}&zoom=15`}
            zoom="100"
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
            {map}
            </div>
        )
    }
}
export default Map;

                