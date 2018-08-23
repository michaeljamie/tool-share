import React, { Component } from 'react';
import Lister from './../Lister/Lister';
import 'react-dates/lib/css/_datepicker.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { handleSearchTags } from '../../ducks/reducer';
import io from 'socket.io-client';
import { setRoomID } from '../../ducks/reducer'
import Map from './../../components/Map/Map';
import SimilarTools from './../../components/SimilarTools/SimilarTools';
import {withRouter} from 'react-router-dom';
const socket = io(`http://localhost:3005`)
const {REACT_APP_GOOGLE_API_KEY} = process.env

class Toolview extends Component {
    constructor(props) {
        super(props);
        this.state ={
            owner_name: '',
            owner_id: 0,
            owner_pic: '',
            owner_rating: '',
            owner_lat: '',
            owner_long: '',
            owner_city: null,
            owner_state: null,
            tool_id: 0,
            tool_name: '',
            tool_descript: '',
            times_rented: 0,
            tool_condition: '',
            for_rent: false,
            for_sale: false,
            delivery: false,
            pick_up: false,
            power_tool: false,
            requires_fuel: false,
            power_type: '',
            fuel_type: '',
            tool_img: '',
            tool_price: 0,
            available: '',
            currentToolTags: [],
            allToolsAndTags: []
        };
    };

    componentDidMount() {
        this.getToolAndOwner();
        // this.getTools();
        window.scrollTo(0,0);
    };

    componentDidUpdate (prevProps) {
        if(prevProps.match.params.id !== this.props.match.params.id){
            this.getToolAndOwner()
            
        }
    };

    getToolAndOwner() {
        axios.get(`/api/tool/${+this.props.match.params.id}`).then( tool => {
            this.setState({
                owner_name: tool.data.fullname,
                owner_pic: tool.data.profile_pic,
                owner_id: tool.data.tool_owner,
                owner_lat: tool.data.latitude,
                owner_long: tool.data.longitude,
                tool_id: tool.data.tool_id,
                tool_name: tool.data.tool_name,
                tool_descript: tool.data.tool_descript,
                times_rented: tool.data.times_rented,
                tool_condition: tool.data.tool_condition,
                for_rent: tool.data.for_rent,
                for_sale: tool.data.for_sale,
                delivery: tool.data.delivery,
                pick_up: tool.data.pick_up,
                power_tool: tool.data.power_tool,
                requires_fuel: tool.data.requires_fuel,
                fuel_type: tool.data.fuel_type,
                tool_img: tool.data.tool_img,
                tool_price: tool.data.tool_price,
                power_type: tool.data.power_type,
                available: tool.data.currently_available
            });
        }).then(
        axios.get(`/api/tags/${+this.props.match.params.id}`).then( tags => {
            this.setState({
                currentToolTags: tags.data
            })}
        ));
    };

    // getTools = () => {
    //     axios.get('api/get_all_tools_with_tags')
    //     .then(res=>{
    //         this.setState({
    //             allToolsAndTags: res.data
    //         })
    //     })
    // }

    latlongToZip = (lat, long) => {
        axios.get(`http://api.geonames.org/findNearbyPostalCodesJSON?lat=${lat}&lng=${long}&username=stepace`)
        .then(res=>{
            let zip =res.data.postalCodes[0].postalCode
        })
    }

    joinRoom = () => {
        let room
        if(+this.props.user.userid > +this.state.owner_id) {
            room = `user${this.props.user.userid}chattingwith${this.state.owner_id}`
        }
        else {
            room = `user${this.state.owner_id}chattingwith${this.props.user.userid}`
        }
        axios.put('/api/room', { room: room, sender_id: this.props.user.userid, receiver_id: this.state.owner_id })
        this.props.setRoomID(room)
    }

    render() {
        console.log(this.state)

        let editButton = this.state.owner_id === this.props.user.userid ? <button className='toolview-edit-button'>edit</button> : null
       
        let toolsWithSameTags = this.state.allToolsAndTags.filter(tool=>{
            if(this.props.search_tags){
                return tool.tag === this.props.search_tags && tool.tool_id !== +this.props.match.params.id
            } else {
                return tool.tag === this.state.currentToolTag && tool.tool_id !== +this.props.match.params.id
            }
        })

        let similarTools = toolsWithSameTags.map( (tool, index) => {
            return (
                <SimilarTools key={index} hello={'hello'} location={this.props.location} id={tool.tool_id} image={tool.tool_img} name={tool.tool_name} price={tool.tool_price} />
            )
        })
       
        return(
            <div>
                <Link to='/search'><button className='toolview-back-button'>Back to Results</button></Link>
                <div className = "toolview-top">
                {editButton}
                    <h1 className = "toolview-top-title">{`${this.state.tool_name}`}</h1>
                    <div className = "toolview-pic"> 
                        <img src={this.state.tool_img} alt="table saw"/>
                    </div>
                        <div className = "toolview-price-rent">
                            <div>Price: {this.state.tool_price}/day</div>
                            <Link to={`/checkout/${this.props.match.params.id}`}><button className='toolview-rent-button'>Rent</button></Link>
                        </div>
                </div>
                <div className = "toolview-description">
                    <div>{this.state.tool_descript}</div>
                </div>
                <div className = "toolview-lower">
                    <div className = "toolview-lister">
                        <Lister name={this.state.owner_name} pic={this.state.owner_pic}/>
                    </div>
                    <div className = "toolview-additional">
                        <div>
                        Deposit: {this.state.tool_condition}
                        </div>
                        <div>
                        Condition: {this.state.tool_condition}
                        </div>
                        <div>
                        Additional:
                   
                        </div> 
                        <Link to="/chat"><button onClick={ () => this.joinRoom() }>
                            Message
                        </button></Link>
                    </div>
                </div>
                    <div className = "toolview-map">
                        <Map id={this.props.match.params.id}/>
                    </div>
                
                <div className = "toolview-bottom">
                    Similar Tools:  
                   {similarTools}
                </div>
            </div>
        );
    };
};

function mapStateToProps(state) {
    return {
      user: state.user,
      search_tags: state.search_tags
    };
  }
  
  export default connect(mapStateToProps, { setRoomID })(Toolview);