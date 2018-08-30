import React, { Component } from 'react';
import axios from 'axios';
import Dropzone from 'react-dropzone';
import swal from 'sweetalert2';
import defaultTool from './../../assets/defaultTool.png';
const {REACT_APP_DOMAIN, REACT_APP_CLIENT_ID, REACT_APP_CLOUD_PRESET, REACT_APP_CLOUD_KEY, REACT_APP_CLOUD_NAME} = process.env;

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
    axios.get('/api/session').then(res =>
      res.data.user ?
      console.log('User on Session')
      : this.login()
    );
    window.scrollTo(0,0);
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
    axios.get(`/api/tags/${this.props.match.params.id}`).then(res => {
      let {drill, hammer, hammer_drill, jack_hammer, sander, grinder, auger, saw, mower, trimmer, ladder, welding, air_compressor, vacuum, pressure_washer, ratchet, wrench, lawn_tool} = res.data[0]
      this.setState({
        drill: drill,
        hammer: hammer,
        hammer_drill: hammer_drill,
        jack_hammer: jack_hammer,
        sander: sander,
        grinder: grinder,
        auger: auger,
        saw: saw,
        mower: mower,
        trimmer: trimmer,
        ladder: ladder,
        welding: welding,
        air_compressor: air_compressor,
        vacuum: vacuum,
        pressure_washer: pressure_washer,
        ratchet: ratchet,
        wrench: wrench,
        lawn_tool: lawn_tool
      })
    })
  }

  login = () => {
    const redirectUri = encodeURIComponent(`${window.origin}/auth/callback`);
    window.location = `https://${REACT_APP_DOMAIN}/authorize?client_id=${REACT_APP_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${redirectUri}&response_type=code`
  };

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
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
  };

  toogleTagBoolean(event) {
    this.setState({ [event.target.name]: !this.state[event.target.name] });
  };

  onDrop = files => {
    files.map(file => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", REACT_APP_CLOUD_PRESET); 
      formData.append("api_key", REACT_APP_CLOUD_KEY); 
      formData.append("timestamp", (Date.now() / 1000) | 0);
      formData.append("public_id", file.name);
      return axios.post(`https://api.cloudinary.com/v1_1/${REACT_APP_CLOUD_NAME}/image/upload/`, formData, {headers: { "X-Requested-With": "XMLHttpRequest" }}).then(res => {
        this.setState({
          image: res.data.url
        })
      })
    });
  }

  confirm() {
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

  delete() {
    const swalWithBootstrapButtons = swal.mixin({
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false,

    })

    swalWithBootstrapButtons({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      background: '#252525',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        axios.delete(`/api/tooltags/${this.props.match.params.id}`).then(() => {
          axios.delete(`/api/delete/tool/${this.props.match.params.id}`)
        })
        this.props.history.push('/search');
        swalWithBootstrapButtons({
          title: 'Deleted!',
          text: 'Your tool has been deleted.',
          type: 'success',
          background: '#252525'
        })
      } else if (
        result.dismiss === swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons({
          title: 'Cancelled',
          text: 'Your tool is safe.',
          type: 'error',
          background: '#252525'
        })
      }
    })
  }

  render() {
    let { name, image, description, pricePerDay, deposit, condition, forRent, forSale, delivery, pickup, powerTool, powerType, requiresFuel, fuelType } = this.state;
    return (
      <div className='toolEdit-page'>
        <h1>Tool Edit</h1>
        <div className='toolEdit-section'>
          <Dropzone 
            onDrop={this.onDrop} 
            style={{
                width: "75%", 
                height: "10%", 
                border: "solid 1px #fdd947",
                borderRadius: '6px',
                textAlign: 'center', 
                display: "flex", 
                justifyContent: 'center', 
                alignItems: 'center',
                marginTop: '20px',
                marginBottom: '20px',
                cursor: 'pointer'
            }}>
            <p className='dropbox-title'>Upload Image</p>
          </Dropzone>
          <img src={image ? image : defaultTool} alt='tool' width='200px' height='200px' />
        </div>
        <div className='toolEdit-section'>
          <div className='post-tool-divider'>Select a few tags describing the type of tool.</div>   
          <div className='post-tool-buttons'>
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
          <div className ='post-toolDiv'>
            <p className = 'post-inputText'>Brand name and model</p>
            <input type='text' name='name' className='post-input' value={name} onChange={this.handleChange}/>
          </div>
        </div>
        <div className='post-tool-section'>
          <div className ='post-toolDiv'>
            <p className = 'post-inputText'>Description (Max 200)</p>
            <input type='text' className='post-input' maxLength='200' name="description" value={description} onChange={this.handleChange}/>
          </div>
        </div>
        <div className='post-tool-section'>
          <div className ='post-toolDiv'>
            <p className = 'post-inputText'>Daily Rental Fee</p>
            <input type='number' className='post-input' name='pricePerDay' value={pricePerDay} onChange={this.handleChange}/>
          </div>
        </div>
        <div className='post-tool-section'>
          <div className ='post-toolDiv'>
            <p className = 'post-inputText'>Security Deposit Amount</p>
            <input type='number' className='post-input' name='deposit' value={deposit} onChange={this.handleChange}/>
          </div>
        </div>
        <div className='post-tool-section'>
          <div className='post-tool-divider'>Describe the condition of the tool.</div>
          <select className='post-tool-input' value={condition} name="condition" onChange={this.handleChange}>
            <option value="Excellent">Excellent</option>
            <option value="Great">Great</option>
            <option value="Good">Good</option>
            <option value="Fair">Fair</option>
            <option value="Poor">Poor</option>
          </select>
        </div>
        <div className='post-tool-section'>
            <div className='post-tool-divider'>Will this tool be for rent?</div> 
            <div className = 'tool-check'>{`Yes `}<label class="container"><input type='checkbox' checked={forRent} name='forRent' onClick={this.toggleBoolean}/><span class="checkmark"></span>
            </label></div>
        </div>
        <div className='post-tool-section'>
            <div className='post-tool-divider'>Will this tool be for sale?</div>
            <div className = 'tool-check'>{`Yes `}<label class="container"><input type='checkbox' checked={forSale} name='forSale' onClick={this.toggleBoolean}/><span class="checkmark"></span>
            </label></div>
        </div>
        <div className='post-tool-section'>
            <div className='post-tool-divider'>Will this tool be available for delivery?</div>
            <div className = 'tool-check'>{`Yes `}<label class="container"><input type='checkbox' checked={delivery} name='delivery' onClick={this.toggleBoolean}/><span class="checkmark"></span>
            </label></div>
        </div>
        <div className='post-tool-section'>
            <div className='post-tool-divider'>Will this tool be available for pick up?</div>
            <div className = 'tool-check'>{`Yes `}<label class="container"><input type='checkbox' checked={pickup} name='pickup' onClick={this.toggleBoolean}/><span class="checkmark"></span>
            </label></div>
        </div>
        <div className='post-tool-section'>
            <div className='post-tool-divider'>Is this a power tool?</div>
            <div className = 'tool-check'>{`Yes `}<label class="container"><input type='checkbox' checked={powerTool} name='powerTool' onClick={this.toggleBoolean}/><span class="checkmark"></span>
            </label></div>
        </div>
        {
          powerTool ?
            <div className='post-tool-section'>
              <div className='post-tool-divider'>What type of power?</div>
              <select className='search-criteria-select' value={powerType} name='powerType' onChange={this.handleChange}>
                <option value="electric">Electric</option>
                <option value="pneumatic">Pneumatic</option>
              </select>
            </div>
            :
            null
        }
        <div className='post-tool-section'>
          <div className='post-tool-divider'>Does this tool require fuel?</div>
          <div className = 'tool-check'>{`Yes `}<label class="container"><input type='checkbox' checked={requiresFuel} name='requiresFuel' onClick={this.toggleBoolean}/><span class="checkmark"></span>
          </label></div>
        </div>
        {
          requiresFuel ?
            <div className='post-tool-section'>
              <div className='post-tool-divider'>What type of fuel?</div>
              <select className='search-criteria-select' value={fuelType} name='fuelType' onChange={this.handleChange}>
                <option value="gasoline">Gasoline</option>
                <option value="diesel">Diesel</option>
                <option value="ethanol">Ethanol</option>
              </select>
            </div>
            :
            null
        }
        <div className='toolEdit-section'>
          <button className='toolEdit-confirm' onClick={() => this.confirm()}>Confirm</button>
          <button className='toolEdit-delete' onClick={() => this.delete()}>Delete</button>
        </div>
      </div>
    )
  }
}