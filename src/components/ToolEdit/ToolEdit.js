import React, {Component} from 'react';
import axios from 'axios';

export default class ToolEdit extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.toogleBoolean = this.toogleBoolean.bind(this);
    this.state = {
      name: '',
      image: '',
      description: '',
      pricePerDay: '',
      deposit: '',
      condition: '',
      forRent: false,
      forSale: false,
      delivery: false,
      pickup: false,
      powerTool: false,
      powerType: null,
      requiresFuel: false,
      fuelType: null
    }
  }

  componentDidMount() {
    axios.get(`/api/tool/${this.props.match.params.id}`).then(res => {
      let {tool_name, tool_img, tool_descript, tool_price, deposit, tool_condition, for_rent, for_sale, delivery, pickup, power_tool, power_type, requires_fuel, fuel_type} = res.data
      this.setState({
        name: tool_name,
        image: tool_img,
        description: tool_descript,
        pricePerDay: tool_price,
        deposit: deposit,
        condition: tool_condition,
        forRent: for_rent,
        forSale: for_sale,
        delivery: delivery,
        pickup: pickup,
        powerTool: power_tool,
        powerType: power_type,
        requiresFuel: requires_fuel,
        fuelType: fuel_type
      });
    });
    console.log(this.state)
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
    console.log(this.state)
  };

  toogleBoolean(event) {
    this.setState({[event.target.name]: event.target.checked});
    if (!this.state.powerTool) {
      this.setState({powerType: null})
    }
    if (!this.state.requiresFuel) {
      this.setState({fuelType: null})
    }
    console.log(this.state)
  };

  render() {
    let {name, image, description, pricePerDay, deposit, condition, forRent, forSale, delivery, pickup, powerTool, powerType, requiresFuel, fuelType} = this.state;
    return (
      <div className='toolEdit-page'>
        <div className='toolEdit-title'>
          <p>Tool Edit</p>
        </div>
        <div className='toolEdit-section'>
          <span>Name of Tool</span>
          <input className='toolEdit-input' value={name} name='name' onChange={this.handleChange}/>
        </div>
        <div className='toolEdit-section'>
          <span>Image of Tool</span>
          <input className='toolEdit-input' value={image} name='image' onChange={this.handleChange}/>
        </div>
        <div className='toolEdit-section'>
          <span>Description of Tool</span>
          <input className='toolEdit-input' value={description} name='description' onChange={this.handleChange} maxLength='200'/>
        </div>
        <div className='toolEdit-section'>
          <span>Price per Day</span>
          <input className='toolEdit-input' value={pricePerDay} name='pricePerDay' onChange={this.handleChange}/>
        </div>
        <div className='toolEdit-section'>
          <span>Deposit Amount</span>
          <input className='toolEdit-input' value={deposit} name='deposit' onChange={this.handleChange}/>
        </div>
        <div className='toolEdit-section'>
          <span>Condition of tool</span>
          <select className='toolEdit-input' value={condition} name='condition' onChange={this.handleChange}>
              <option value="Excellent">Excellent</option>
              <option value="Great">Great</option>
              <option value="Good">Good</option>
              <option value="Fair">Fair</option>
              <option value="Poor">Poor</option>
          </select>
        </div>
        <div className='toolEdit-section'>
          <div>Will this tool be for rent?</div> 
          <div>{`Yes `}<input type='checkbox' checked={forRent} name='forRent' onClick={this.toogleBoolean}/></div>
        </div>
        <div className='toolEdit-section'>
            <div>Will this tool be for sale?</div>
            <div>{`Yes `}<input type='checkbox' checked={forSale} name='forSale' onClick={this.toogleBoolean}/></div>
        </div>
        <div className='toolEdit-section'>
            <div>Will this tool be available for delivery?</div>
            <div>{`Yes `}<input type='checkbox' checked={delivery} name='delivery' onClick={this.toogleBoolean}/></div>
        </div>
        <div className='toolEdit-section'>
            <div>Will this tool be available for pick up?</div>
            <div>{`Yes `}<input type='checkbox' checked={pickup} name='pickup' onClick={this.toogleBoolean}/></div>
        </div>
        <div className='toolEdit-section'>
          <div>Is this a power tool?</div>
          <div>{`Yes `}<input type='checkbox' checked={powerTool} name='powerTool' onClick={this.toogleBoolean}/></div>
        </div>
        { 
          powerTool ?
          <div className='toolEdit-section'>
              <div>What type of power?</div> 
              <select className='search-criteria-select' value={powerType} name='powerType' onChange={this.handleChange}>
                  {/* <option value="null"></option> */}
                  <option value="electric">Electric</option>
                  <option value="pneumatic">Pneumatic</option>
              </select>
          </div>
          :
          null
        }
        <div className='toolEdit-section'>
            <div>Does this tool require fuel?</div>
            <div>{`Yes `}<input type='checkbox' checked={requiresFuel} name='requiresFuel' onClick={this.toogleBoolean}/></div>
        </div>
        { 
            requiresFuel ?
            <div className='toolEdit-section'>
                <div>What type of fuel?</div>
                <select className='search-criteria-select' value={fuelType} name='fuelType' onChange={this.handleChange}>
                    {/* <option value="null"></option> */}
                    <option value="gasoline">Gasoline</option>
                    <option value="diesel">Diesel</option>
                    <option value="ethanol">Ethanol</option>
                </select>
            </div>
            :
            null
        }
        <button className='toolEdit-confirm' >Confirm</button>
      </div>
    )
  }
}