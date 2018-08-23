import React, {Component} from 'react';
import axios from 'axios';
import {connect} from "react-redux";
import Calendar from '../Calendar/Calendar';
import StripeCheckout from 'react-stripe-checkout';
const { REACT_APP_DOMAIN, REACT_APP_CLIENT_ID } = process.env;

class CheckOut extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
            deposit: '',
            total: 2000
        };
    };

    componentDidMount() {
        // axios.get('/api/session').then(res =>
        //     res.data.user ?
        //     console.log('User on Session')
        //     : this.login()
        // );
        this.getToolAndOwner()
        window.scrollTo(0,0)
    };

    login = () => {
        const redirectUri = encodeURIComponent(`${window.origin}/auth/callback`);
        window.location = `https://${REACT_APP_DOMAIN}/authorize?client_id=${REACT_APP_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${redirectUri}&response_type=code`
    };

    getToolAndOwner() {
        axios.get(`/api/tool/${this.props.match.params.id}`).then( tool => {
            console.log(tool)
            this.setState({
                owner_name: tool.data.fullname,
                owner_pic: tool.data.profile_pic,
                owner_id: tool.data.tool_owner,
                owner_lat: tool.data.latitude,
                owner_long: tool.data.longitude,
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
                deposit: tool.data.deposit
            });
        });
    };

    onToken = (token) => {
        token.card = void 0
        axios.post('/api/payment', {token, amount: this.state.total}).then(res => {
            axios.put(`/api/update_tool_data/${this.state.tool_id}`, `${this.props.user.userid}`).then( () => {
                console.log('Tool Rental Paid')
                console.log(res)
            })
        })
        // axios.post('/api/reservation', dates)
    }

    render() {
        console.log(this.props.user)
        return(
            <div>
                <h1>Check Out</h1>
                <h3>You are renting:</h3>
                <div>
                    <div>{this.state.tool_name}</div>
                    <img src={this.state.tool_img} height='200' width='200'/>
                </div>
                <hr/>
                <h3>Renting from:</h3>
                <div>{this.state.owner_name}</div>
                <img src={this.state.owner_pic} height='200' width='200'/>
                <hr/>
                <h2>Summary</h2>
                <div>
                <div className = "toolview-calendar">
                            Rental Dates
                            <Calendar tool_id = {this.state.tool_id}/>
                        </div>
                    Total Price: {this.state.tool_price} 
                    Deposit: {this.state.deposit}
                    dates
                </div>
                <StripeCheckout
                name="Tool Share"
                description="Tool Rental Payment"
                image=""
                token= {this.onToken}
                stripeKey={process.env.REACT_APP_STRIPE_KEY}
                amount={this.state.total}
                />
                <button>Cancel</button>
            </div>
        );
    };
};
  
function mapStateToProps(state) {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(CheckOut);