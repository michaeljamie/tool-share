import React, { Component } from 'react';
import Lister from './../Lister/Lister';
import 'react-dates/lib/css/_datepicker.css';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import { setRoomID } from '../../ducks/reducer'
import Map from './../../components/Map/Map';
import SimilarTools from './../../components/SimilarTools/SimilarTools';
const {REACT_APP_GOOGLE_API_KEY} = process.env

class Toolview extends Component {
    constructor(props) {
        super(props);
        this.returnTool = this.returnTool.bind(this);
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
            deposit: 0,
            available: '',
            currentToolTags: [],
            redirect: false,
            roomToJoin: ''
        };
    };

    componentDidMount() {
        this.getToolAndOwner();
        window.scrollTo(0,0);
        this.setState({redirect: false})
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
                available: tool.data.currently_available,
                deposit: tool.data.deposit
            });
        }).then(
        axios.get(`/api/tags/${+this.props.match.params.id}`).then( tags => {
            this.setState({
                currentToolTags: tags.data
            })}
        ));
    };

    returnTool = () => {
        axios.put(`/api/return/${this.props.match.params.id}`)
        .then(res => {
            console.log(res)
        })
    };

    latlongToZip = (lat, long) => {
        axios.get(`http://api.geonames.org/findNearbyPostalCodesJSON?lat=${lat}&lng=${long}&username=stepace`)
        .then(res=>{
            let zip =res.data.postalCodes[0].postalCode
        })
    };

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
        this.setState({roomToJoin: room, redirect: true})
    };

    render() {
        console.log(this.state)

        if(this.state.redirect){
            return <Redirect push to = {`/chat/${this.state.roomToJoin}`}/>
        }

        let editButton = this.state.owner_id === this.props.user.userid ? <Link to={`/tooledit/${this.props.match.params.id}`} className='toolview-edit-button-parent-link'><button className='toolview-edit-button'>Edit Tool</button></Link> : null
        let returnButton = this.state.owner_id === this.props.user.userid && this.state.available === false ? <button className='toolview-return-button' onClick={this.returnTool}>Return Tool</button> : null
        let rentButton = this.state.owner_id !== this.props.user.userid ? 
            <Link to={`/checkout/${this.props.match.params.id}`} className='toolview-rent-button-parent-link'><button className='toolview-rent-button'>Rent</button></Link> :
            null
        let availabilityNotification = this.state.available === false ? <div>This tool is currently unavailable.</div> : null
       
        return (
            <div className='toolview-body'>
                <div className='toolview-top-button-section'>
                    <Link to='/search' className='toolview-back-button-parent-link' ><button className='toolview-back-button'>Return to Search</button></Link>
                    {editButton}
                </div>
                <div className = "toolview-top">
                    <h1 className = "toolview-top-title">{`${this.state.tool_name}`}</h1>
                    <div className = "toolview-pic-container"> 
                        <img src={this.state.tool_img} alt="table saw"/>
                    </div>
                </div>
                <div className='toolview-mid'>
                    <div className = "toolview-price-rent-section">
                        <div className = "toolview-price">${this.state.tool_price} per day</div>
                        {returnButton}
                        {rentButton}
                    </div>
                    <hr className='toolview-hr'/>
                    <div className = "toolview-description">
                        {availabilityNotification}
                        {this.state.tool_descript}
                        
                        
                    </div>
                    <hr className='toolview-hr'/>
                    <div className = "toolview-details">
                        <div className = "toolview-details-sub">
                            <div className='toolview-details-sub-detail'>Deposit: {this.state.deposit}</div>
                            <div className='toolview-details-sub-detail'>Condition: {this.state.tool_condition}</div>
                            <div className='toolview-details-sub-detail'>{this.state.delivery ? <div>Delivery: Yes</div> : <div>Delivery: No</div>}</div>
                            <div className='toolview-details-sub-detail'>{this.state.pick_up ? <div>Pick Up: Yes</div> : <div>Pick Up: No</div>}</div>
                        </div>
                        <div className = "toolview-details-sub">
                            <div className='toolview-details-sub-detail'>{this.state.power_tool ? <div>Power Tool: Yes</div> : <div>Power Tool: No</div>}</div>
                            <div className='toolview-details-sub-detail'>{this.state.power_type ? <div>Power Type: {this.state.power_type}</div> : <div>Power Type: None</div>}</div>
                            <div className='toolview-details-sub-detail'>{this.state.requires_fuel ? <div>Requires Fuel: Yes</div> : <div>Requires Fuel: No</div>}</div>
                            <div className='toolview-details-sub-detail'>{this.state.fuel_type ? <div>Fuel: {this.state.fuel_type}</div> : <div>Fuel: None</div>}</div>
                        </div>
                    </div>
                </div>
                <div className = "toolview-lower">
                    <Lister name={this.state.owner_name} pic={this.state.owner_pic}/>
                    <button className='toolview-message-button' onClick={ () => this.joinRoom() }>
                        Message
                    </button>
                </div>
                <div className = "toolview-map">
                    <Map id={this.props.match.params.id}/>
                </div>
                <div className = "toolview-bottom">
                    <SimilarTools tags={this.state.currentToolTags} />
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
};

export default connect(mapStateToProps, { setRoomID })(Toolview);