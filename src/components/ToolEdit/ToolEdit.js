import React, { Component } from 'react';
import axios from 'axios';
import Dropzone from 'react-dropzone';
import defaultTool from './../../assets/defaultTool.png';

export default class ToolEdit extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.toggleBoolean = this.toggleBoolean.bind(this);
    this.toogleTagBoolean = this.toogleTagBoolean.bind(this);
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
      fuelType: null,
      drill: false,
      hammer: false,
      hammer_drill: false,
      jack_hammer: false,
      sander: false,
      grinder: false,
      auger: false,
      saw: false,
      mower: false,
      trimmer: false,
      ladder: false,
      welding: false,
      air_compressor: false,
      vacuum: false,
      pressure_washer: false,
      ratchet: false,
      wrench: false,
      lawn_tool: false
    }
  }

  componentDidMount() {
    axios.get(`/api/tool/${this.props.match.params.id}`).then(res => {
      let { tool_name, tool_img, tool_descript, tool_price, deposit, tool_condition, for_rent, for_sale, delivery, pickup, power_tool, power_type, requires_fuel, fuel_type } = res.data
      let finalDeposit = deposit.slice(1)
      this.setState({
        name: tool_name,
        image: tool_img,
        description: tool_descript,
        pricePerDay: tool_price,
        deposit: finalDeposit,
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
    this.setState({ [event.target.name]: event.target.value });
    console.log(this.state)
  };

  toggleBoolean(event) {
    this.setState({ [event.target.name]: event.target.checked });
    if (event.target.name==='powerTool' && !event.target.checked) {
      this.setState({ powerType: null })
    } else {
      this.setState({ powerType: 'electric' })
    }
    if (event.target.name==='requiresFuel' && !event.target.checked) {
      this.setState({ fuelType: null })
    } else {
      this.setState({ fuelType: 'gasoline'})
    }
    console.log(this.state)
  };

  toogleTagBoolean(event) {
    this.setState({ [event.target.name]: !this.state[event.target.name] });
  };

  confirm() {
    console.log('start')
    const {
      name,
      image,
      description,
      pricePerDay,
      deposit,
      condition,
      forRent,
      forSale,
      delivery,
      pickup,
      powerTool,
      powerType,
      requiresFuel,
      fuelType,
      drill,
      hammer,
      hammer_drill,
      jack_hammer,
      sander,
      grinder,
      auger,
      saw,
      mower,
      trimmer,
      ladder,
      welding,
      air_compressor,
      vacuum,
      pressure_washer,
      ratchet,
      wrench,
      lawn_tool
    } = this.state
    const priceInt = parseInt(pricePerDay)
    const depositInt = parseInt(deposit)
    const tool_data = {
      name,
      image,
      description,
      priceInt,
      depositInt,
      condition,
      forRent,
      forSale,
      delivery,
      pickup,
      powerTool,
      powerType,
      requiresFuel,
      fuelType
    }
    axios.put(`/api/edit/tool/${this.props.match.params.id}`, tool_data).then(() => {
      console.log('tool edit start')
      const tags = {
        drill,
        hammer,
        hammer_drill,
        jack_hammer,
        sander,
        grinder,
        auger,
        saw,
        mower,
        trimmer,
        ladder,
        welding,
        air_compressor,
        vacuum, 
        pressure_washer,
        ratchet,
        wrench,
        lawn_tool
      }
      axios.put(`/api/tooltags/${this.props.match.params.id}`, tags)
      this.props.history.push(`/toolview/${this.props.match.params.id}`);
    })
  }

  render() {
    let { name, image, description, pricePerDay, deposit, condition, forRent, forSale, delivery, pickup, powerTool, powerType, requiresFuel, fuelType } = this.state;
    return (
      <div className='toolEdit-page'>
        <div className='toolEdit-title'>
          <p>Tool Edit</p>
        </div>
        <div className='toolEdit-section'>
          <span>Name of Tool</span>
          <input className='toolEdit-input' value={name} name='name' onChange={this.handleChange} />
        </div>
        <div className='toolEdit-section'>
          <div>Click the Image to Select a New One</div>
          <Dropzone
            onDrop={this.onDrop}
            style={{
              width: "200px",
              height: '200px',
              border: "dashed 1px black",
              display: "flex",
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer'
            }}>
            <img src={image ? image : defaultTool} alt='tool' width='200px' height='200px' />
          </Dropzone>
        </div>
        <div className='toolEdit-section'>
          <div>Tags that apply to tool</div>
          <div>
            <button className={this.state.drill ? 'post-tool-tag-bubble-on' : 'post-tool-tag-bubble-off'} name='drill' value={this.state.drill} onClick={this.toogleTagBoolean}>Drill</button>
            <button className={this.state.hammer ? 'post-tool-tag-bubble-on' : 'post-tool-tag-bubble-off'} name='hammer' value={this.state.hammer} onClick={this.toogleTagBoolean}>Hammer</button>
            <button className={this.state.hammer_drill ? 'post-tool-tag-bubble-on' : 'post-tool-tag-bubble-off'} name='hammer_drill' value={this.state.hammer_drill} onClick={this.toogleTagBoolean}>Hammer Drill</button>
            <button className={this.state.jack_hammer ? 'post-tool-tag-bubble-on' : 'post-tool-tag-bubble-off'} name='jack_hammer' value={this.state.jack_hammer} onClick={this.toogleTagBoolean}>Jackhammer</button>
            <button className={this.state.sander ? 'post-tool-tag-bubble-on' : 'post-tool-tag-bubble-off'} name='sander' value={this.state.sander} onClick={this.toogleTagBoolean}>Sander</button>
            <button className={this.state.saw ? 'post-tool-tag-bubble-on' : 'post-tool-tag-bubble-off'} name='saw' value={this.state.saw} onClick={this.toogleTagBoolean}>Saw</button>
            <button className={this.state.auger ? 'post-tool-tag-bubble-on' : 'post-tool-tag-bubble-off'} name='auger' value={this.state.auger} onClick={this.toogleTagBoolean}>Auger</button>
            <button className={this.state.grinder ? 'post-tool-tag-bubble-on' : 'post-tool-tag-bubble-off'} name='grinder' value={this.state.grinder} onClick={this.toogleTagBoolean}>Grinder</button>
            <button className={this.state.mower ? 'post-tool-tag-bubble-on' : 'post-tool-tag-bubble-off'} name='mower' value={this.state.mower} onClick={this.toogleTagBoolean}>Mower</button>
            <button className={this.state.trimmer ? 'post-tool-tag-bubble-on' : 'post-tool-tag-bubble-off'} name='trimmer' value={this.state.trimmer} onClick={this.toogleTagBoolean}>Trimmer</button>
            <button className={this.state.ladder ? 'post-tool-tag-bubble-on' : 'post-tool-tag-bubble-off'} name='ladder' value={this.state.ladder} onClick={this.toogleTagBoolean}>Ladder</button>
            <button className={this.state.welding ? 'post-tool-tag-bubble-on' : 'post-tool-tag-bubble-off'} name='welding' value={this.state.welding} onClick={this.toogleTagBoolean}>Welding</button>
            <button className={this.state.air_compressor ? 'post-tool-tag-bubble-on' : 'post-tool-tag-bubble-off'} name='air_compressor' value={this.state.air_compressor} onClick={this.toogleTagBoolean}>Air Comp.</button>
            <button className={this.state.vacuum ? 'post-tool-tag-bubble-on' : 'post-tool-tag-bubble-off'} name='vacuum' value={this.state.vacuum} onClick={this.toogleTagBoolean}>Vacuum</button>
            <button className={this.state.pressure_washer ? 'post-tool-tag-bubble-on' : 'post-tool-tag-bubble-off'} name='pressure_washer' value={this.state.pressure_washer} onClick={this.toogleTagBoolean}>Pressure Wash</button>
            <button className={this.state.ratchet ? 'post-tool-tag-bubble-on' : 'post-tool-tag-bubble-off'} name='ratchet' value={this.state.ratchet} onClick={this.toogleTagBoolean}>Ratchet</button>
            <button className={this.state.wrench ? 'post-tool-tag-bubble-on' : 'post-tool-tag-bubble-off'} name='wrench' value={this.state.wrench} onClick={this.toogleTagBoolean}>Wrench</button>
            <button className={this.state.lawn_tool ? 'post-tool-tag-bubble-on' : 'post-tool-tag-bubble-off'} name='lawn_tool' value={this.state.lawn_tool} onClick={this.toogleTagBoolean}>Lawn Tool</button>
          </div>
        </div>
        <div className='toolEdit-section'>
          <span>Description of Tool</span>
          <input className='toolEdit-input' value={description} name='description' onChange={this.handleChange} maxLength='200' />
        </div>
        <div className='toolEdit-section'>
          <span>Price per Day</span>
          <input className='toolEdit-input' value={pricePerDay} name='pricePerDay' onChange={this.handleChange} />
        </div>
        <div className='toolEdit-section'>
          <span>Deposit Amount</span>
          <input className='toolEdit-input' value={deposit} name='deposit' onChange={this.handleChange} />
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
          <div>{`Yes `}<input type='checkbox' checked={forRent} name='forRent' onClick={this.toggleBoolean} /></div>
        </div>
        <div className='toolEdit-section'>
          <div>Will this tool be for sale?</div>
          <div>{`Yes `}<input type='checkbox' checked={forSale} name='forSale' onClick={this.toggleBoolean} /></div>
        </div>
        <div className='toolEdit-section'>
          <div>Will this tool be available for delivery?</div>
          <div>{`Yes `}<input type='checkbox' checked={delivery} name='delivery' onClick={this.toggleBoolean} /></div>
        </div>
        <div className='toolEdit-section'>
          <div>Will this tool be available for pick up?</div>
          <div>{`Yes `}<input type='checkbox' checked={pickup} name='pickup' onClick={this.toggleBoolean} /></div>
        </div>
        <div className='toolEdit-section'>
          <div>Is this a power tool?</div>
          <div>{`Yes `}<input type='checkbox' checked={powerTool} name='powerTool' onClick={this.toggleBoolean} /></div>
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
          <div>{`Yes `}<input type='checkbox' checked={requiresFuel} name='requiresFuel' onClick={this.toggleBoolean} /></div>
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
        <button className='toolEdit-confirm' onClick={() => this.confirm()}>Confirm</button>
      </div>
    )
  }
}