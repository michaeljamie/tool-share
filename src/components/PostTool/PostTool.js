import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {connect} from "react-redux";
const { REACT_APP_DOMAIN, REACT_APP_CLIENT_ID } = process.env;

class PostTool extends Component {
    constructor(props) {
        super(props);
        this.postNewTool = this.postNewTool.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.toogleBoolean = this.toogleBoolean.bind(this);
        this.state ={
            owner: this.props.user.userid,
            name:'',
            type: '',
            description: '',
            times_rented: 0,
            condition: '',
            for_rent: false,
            for_sale: false,
            delivery_avail: false,
            pickup_avail: false,
            power_tool: false,
            power_type: 'n/a',
            requires_fuel: false,
            fuel_type: 'n/a',
            tool_img: '',
            price: 0,
            deposit:  0,
            currently_available: true,
        };
    };

    componentDidMount() {
        axios.get('/api/session').then(res =>
            res.data.user ?
            console.log('User on Session')
            : this.login()
        );
    };

    login = () => {
        const redirectUri = encodeURIComponent(`${window.origin}/auth/callback`);
        window.location = `https://${REACT_APP_DOMAIN}/authorize?client_id=${REACT_APP_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${redirectUri}&response_type=code`
    };

    postNewTool() {
        const {
            owner,
            name,
            type,
            description,
            times_rented,
            condition,
            for_rent,
            for_sale,
            delivery_avail,
            pickup_avail,
            power_tool,
            power_type,
            requires_fuel,
            fuel_type,
            tool_img,
            price,
            deposit
        } = this.state
        const priceInt = parseInt(price)
        const depositInt = parseInt(deposit)
        let tool_data = {
            owner,
            name,
            type,
            description,
            times_rented,
            condition,
            for_rent,
            for_sale,
            delivery_avail,
            pickup_avail,
            power_tool,
            power_type,
            requires_fuel,
            fuel_type,
            tool_img,
            priceInt,
            depositInt
        }
        axios.post(`/api/post/tool`, tool_data).then( (res) => {
            console.log(res)
        });
    };

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    };

    toogleBoolean(event) {
        this.setState({[event.target.name]: event.target.checked});
    };

    render() {
        return(
            <div className='post-tool-body'>
                <h1>Post New Tool</h1>
                <div className='post-tool-section'>
                    <div>Provide brand name and model of tool.</div>
                    <input type='text' name='name' className='post-tool-input' onChange={this.handleChange}/>
                </div>
                <div className='post-tool-section'>
                    <div>Paste image address here.</div>
                    <input type='text' className='post-tool-input' name='tool_img' onChange={this.handleChange}/>
                </div>
                <div className='post-tool-section'>
                    <div>In a few words describe the type of tool.</div>               
                    <input className='post-tool-input' name="type" onChange={this.handleChange}/>
                </div>
                <div className='post-tool-section'>
                    <div>Provide a description of the tool. (Max 200)</div> 
                    <input type='text' className='post-tool-input' maxLength='200' name="description" onChange={this.handleChange}/>
                </div>
                <div className='post-tool-section'>
                    <div>Select the price per diem for the tool.</div>
                    <input type='number' className='post-tool-input' name='price' onChange={this.handleChange}/>
                </div>
                <div className='post-tool-section'>
                    <div>Select a deposit amount for the tool.</div>
                    <input type='number' className='post-tool-input' name='deposit' onChange={this.handleChange}/>
                </div>
                <div className='post-tool-section'>
                    <div>Describe the condition of the tool.</div>
                    <select className='post-tool-input' name="condition" onChange={this.handleChange}>
                        <option value="Excellent">Excellent</option>
                        <option value="Great">Great</option>
                        <option value="Good">Good</option>
                        <option value="Fair">Fair</option>
                        <option value="Poor">Poor</option>
                    </select>
                </div>
                <div className='post-tool-section'>
                    <div>Will this tool be for rent?</div> 
                    <div>{`Yes `}<input type='checkbox' name='for_rent' onClick={this.toogleBoolean}/></div>
                </div>
                <div className='post-tool-section'>
                    <div>Will this tool be for sale?</div>
                    <div>{`Yes `}<input type='checkbox' name='for_sale' onClick={this.toogleBoolean}/></div>
                </div>
                <div className='post-tool-section'>
                    <div>Will this tool be available for delivery?</div>
                    <div>{`Yes `}<input type='checkbox' name='delivery_avail' onClick={this.toogleBoolean}/></div>
                </div>
                <div className='post-tool-section'>
                    <div>Will this tool be available for pick up?</div>
                    <div>{`Yes `}<input type='checkbox' name='pickup_avail' onClick={this.toogleBoolean}/></div>
                </div>
                <div className='post-tool-section'>
                    <div>Is this a power tool?</div>
                    <div>{`Yes `}<input type='checkbox' name='power_tool' onClick={this.toogleBoolean}/></div>
                </div>
                { 
                    this.state.power_tool ?
                    <div className='post-tool-section'>
                        <div>What type of power?</div> 
                        <select className='search-criteria-select' name="power_type" onChange={this.handleChange}>
                            <option value="electric">Electric</option>
                            <option value="pneumatic">Pneumatic</option>
                        </select>
                    </div>
                    :
                    null
                }
                <div className='post-tool-section'>
                    <div>Does this tool require fuel?</div>
                    <div>{`Yes `}<input type='checkbox' name='requires_fuel' onClick={this.toogleBoolean}/></div>
                </div>
                { 
                    this.state.requires_fuel ?
                    <div className='post-tool-section'>
                        <div>What type of fuel?</div>
                        <select className='search-criteria-select' name="fuel_type" onChange={this.handleChange}>
                            <option value="gasoline">Gasoline</option>
                            <option value="diesel">Diesel</option>
                            <option value="ethanol">Ethanol</option>
                        </select>
                    </div>
                    :
                    null
                }
                <button className='post-tool-button' onClick={this.postNewTool}>Post Tool</button>
            </div>
        );
    };
};
  
function mapStateToProps(state) {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(PostTool);