import React, {Component} from 'react';
import axios from 'axios';
import {connect} from "react-redux";
import Calendar from '../Calendar/Calendar';
import StripeCheckout from 'react-stripe-checkout';
import {Link} from 'react-router-dom';
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
            total: 0,
            start: 0,
            end: 0
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
                deposit: tool.data.deposit,
                numDays: 0
            });
        });
    };

    onToken = (token) => {
        let datesObj = {
            tool_id: this.state.tool_id,
            pickup_date: this.state.start,
            return_date: this.state.end
        }
        token.card = void 0
        axios.post('/api/payment', {token, amount: this.state.total}).then(res => {
            axios.put(`/api/update_tool_data/${this.state.tool_id}`, {renter_id: this.props.user.userid}).then( () => {
                console.log('Tool Rental Paid')
            })
        })
        axios.post('/api/reservation', datesObj)
    }

    updateStateFromCalendar = (start, end) => {
        this.setState({
            start: start,
            end: end
        })
               
    }

    componentDidUpdate = (prevProps, prevState) => {
        
        if (prevState.start !== this.state.start) {
            var diff =  Math.floor(( Date.parse(this.state.end) - Date.parse(this.state.start) ) / 86400000); 
            this.setState({numDays: diff})
        }
        else if (prevState.end !== this.state.end) {
            var diff =  Math.floor(( Date.parse(this.state.end) - Date.parse(this.state.start) ) / 86400000); 
            this.setState({numDays: diff})
        }
    }

    render() {
       
        return(
            <div className='checkout-page'>
                <h1 className = 'checkout-title'>Checkout</h1>
                <div className='cart-top'>
                <h3>You are renting:</h3>
                <div>
                    <div className='cart-text'>{this.state.tool_name}</div>
                        <img src={this.state.tool_img} height='200' width='200' className='cart-toolPic'/>
                    </div>
                </div>
                <hr/>
                <div className='cart-mid'>
                    <h3>Renting from:</h3>
                    <div className='cart-text'>{this.state.owner_name}</div>
                    <img className = 'cart-seller' src={this.state.owner_pic} height='200' width='200'/>
                </div>
                <hr/>
                <div className='cart-midTitle'>
                    <h2>Cart Summary:</h2>
                </div>
                <div className='checkout-select-dates'>
                    <div className='cart-lowerText'>
                    Select Dates:
                    </div>
                    <div className = "checkout-calendar-">
                  
                                <Calendar tool_id = {this.state.tool_id} updateCheckoutState={this.updateStateFromCalendar}/>
                            </div>
                        <div className='cart-lowerText'>
                            <div className='cart-lowerSection'>
                                <div>Rental Fee:</div>
                                <div>${this.state.tool_price * this.state.numDays}</div>
                            </div>
                            <br/>
                            <div className='cart-lowerSection'>
                            <div>Service Charge:</div>
                            <div>${this.state.tool_price * this.state.numDays * .2}</div>
                            </div>
                            <br/>
                            <div className='cart-lowerSection'>
                            <div>Security Deposit*:</div>
                            <div>${+this.state.deposit.slice(1)}</div>
                            </div>
                            <br/>
                            <div className='cart-lowerSection'>
                            <div>Total Price:</div>
                            <div>${(this.state.tool_price * this.state.numDays) + (this.state.tool_price * this.state.numDays * .2) + +this.state.deposit.slice(1)}</div>
                            </div>
                        </div>
                </div>
               <div className='checkout-stripe-and-cancel'>
                    <div>
                        <StripeCheckout
                        name="Tool Share"
                        description="Tool Rental Payment"
                        image=""
                        token= {this.onToken}
                        stripeKey={process.env.REACT_APP_STRIPE_KEY}
                        amount={100*((this.state.tool_price * this.state.numDays) + (this.state.tool_price * this.state.numDays * .2) + +this.state.deposit.slice(1))}
                        >
                        <button className='checkout-stripe'>Checkout</button>
                        </StripeCheckout>
                    </div>
                    
                    <button className='checkout-stripe' onClick={()=>this.props.history.push(`/toolview/${this.props.match.params.id}`)}>Cancel</button>
                <div className='cart-terms'>*Security deposit will be refunded upon tool return</div>
                <div className='cart-terms'>See <Link to="/rental_agreement"><a href="" className = 'home-rentalLink'>Terms and Conditions</a></Link> for additional details</div>
                </div>
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