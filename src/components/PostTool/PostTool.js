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
            condition: '',
            for_rent: false,
            for_sale: false,
            delivery_avail: false,
            pickup_avail: false,
            power_tool: false,
            requires_fuel: false,
            fuel_type: '',
            tool_img: '',
            price: 0,
            deposit:  0
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
    }

      
    

    postNewTool() {
        const {
            owner,
            name,
            type,
            description,
            condition,
            for_rent,
            for_sale,
            delivery_avail,
            pickup_avail,
            power_tool,
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
            condition,
            for_rent,
            for_sale,
            delivery_avail,
            pickup_avail,
            power_tool,
            requires_fuel,
            fuel_type,
            tool_img,
            priceInt,
            depositInt
        }
        console.log(tool_data)
        axios.post(`/api/post/tool`, tool_data).then( (res) => {
            console.log(res)
        })
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    };

    toogleBoolean(event) {
        this.setState({[event.target.name]: event.target.checked});
    }

    render() {
        console.log(this.props.user.userid)
        return(
            <div className='post-tool-body'>
                <h1>Post New Tool</h1>
                <div>Name: <input type='text' name='name' className='post-tool-input' onChange={this.handleChange}/></div>
                <div>Type:               
                    <select className='post-tool-input' name="type" onChange={this.handleChange}>
                        <option value="type1">Type1</option>
                        <option value="type2">Type2</option>
                        <option value="type3">Type3</option>
                    </select>
                </div>
                <div>Description: <input type='text' className='post-tool-input' name="description" onChange={this.handleChange}/></div>
                <div>Condition:
                    <select className='search-criteria-select' name="condition" onChange={this.handleChange}>
                        <option value="type1">Great</option>
                        <option value="type2">Good</option>
                        <option value="type3">Fair</option>
                        <option value="type3">Poor</option>
                    </select>
                </div>
                <div>For Rent: <input type='checkbox' name='for_rent' onClick={this.toogleBoolean}/></div>
                <div>For Sale: <input type='checkbox' name='for_sale' onClick={this.toogleBoolean}/></div>
                <div>Delivery: <input type='checkbox' name='delivery_avail' onClick={this.toogleBoolean}/></div>
                <div>Pick Up: <input type='checkbox' name='pickup_avail' onClick={this.toogleBoolean}/></div>
                <div>Power Tool: <input type='checkbox' name='power_tool' onClick={this.toogleBoolean}/></div>
                <div>Requires Fuel: <input type='checkbox' name='requires_fuel' onClick={this.toogleBoolean}/></div>
                <div>Fuel Type: 
                    <select className='search-criteria-select' name="fuel_type" onChange={this.handleChange}>
                        <option value="type1">Gasoline</option>
                        <option value="type2">Diesel</option>
                        <option value="type3">Ethanol</option>
                    </select>
                </div>
                <div>Tool IMG: <input type='text' className='post-tool-input' name='tool_img' onChange={this.handleChange}/></div>
                <div>Price: <input type='number' className='post-tool-input' name='price' onChange={this.handleChange}/></div>
                <div>Deposit: <input type='number' className='post-tool-input' name='deposit' onChange={this.handleChange}/></div>
                <button className='post-tool-button' onClick={this.postNewTool}>Post Tool</button>
            </div>
        );
    };
};


  
function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps)(PostTool);