import React, {Component} from 'react';
import Lister from './../Lister/Lister';
import Calendar from './Calendar';
import 'react-dates/lib/css/_datepicker.css';
import Iframe from 'react-iframe';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { connect } from "react-redux";

const {REACT_APP_GOOGLE_API_KEY} = process.env

class Toolview extends Component {
    constructor(props) {
        super(props);
        this.state ={
            owner_name: '',
            owner_id: 0,
            owner_pic: '',
            owner_rating: '',
            tool_id: 0,
            tool_name: '',
            tool_type: '',
            tool_descript: '',
            times_rented: 0,
            tool_condition: '',
            for_rent: false,
            for_sale: false,
            delivery: false,
            pick_up: false,
            power_tool: false,
            requires_fuel: false,
            fuel_type: '',
            tool_img: '',
            tool_price: 0,
        };
    };

    componentDidMount() {
        this.getToolAndOwner();
    };

    getToolAndOwner() {
        axios.get(`/api/tool/${this.props.match.params.id}`).then( tool => {
            this.setState({
                owner_name: tool.data.fullname,
                owner_pic: tool.data.profile_pic,
                owner_id: tool.data.tool_owner,
                tool_id: tool.data.tool_id,
                tool_name: tool.data.tool_name,
                tool_type: tool.data.tool_type,
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
            });
        });
    };

    initMap = () => {
        return({
            zoom: 4,
            center: {lat: 37.090, lng: -95.712},
            mapTypeId: 'terrain'
        })
    }

    render() {
        console.log(this.props)
        let map = 
        <Iframe url={`https://www.google.com/maps/embed/v1/place?key=${REACT_APP_GOOGLE_API_KEY}&q=near+95366&center=37.749009,-121.125773&zoom=15`}
            zoom="100"
            width="300px"
            height="300px"
            id="myId"
            className="toolview-map"
            display="initial"
            position="relative"
            allowFullScreen
        />
        let editButton = this.state.owner_id === this.props.user.userid ? <button className='toolview-edit-button'>edit</button> : null

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
                            <div>Price: ${this.state.tool_price}/day</div>
                            <button className='toolview-rent-button'>Rent</button>
                        </div>
                        <div className = "toolview-calendar">
                            Rental Dates
                            <Calendar/>
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
        );
    };
};

function mapStateToProps(state) {
    return {
      user: state.user
    };
  }
  
  export default connect(mapStateToProps)(Toolview);