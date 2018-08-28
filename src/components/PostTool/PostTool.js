import React, {Component} from 'react';
import axios from 'axios';
import {connect} from "react-redux";
import Dropzone from 'react-dropzone';
import defaultTool from './../../assets/defaultTool.png';
const {REACT_APP_DOMAIN, REACT_APP_CLIENT_ID, REACT_APP_CLOUD_PRESET, REACT_APP_CLOUD_KEY, REACT_APP_CLOUD_NAME } = process.env;

class PostTool extends Component {
    constructor(props) {
        super(props);
        this.postNewTool = this.postNewTool.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.toogleBoolean = this.toogleBoolean.bind(this);
        this.toogleTagBoolean = this.toogleTagBoolean.bind(this);
        this.state = {
            owner: this.props.user.userid,
            name:'',
            description: '',
            times_rented: 0,
            condition: 'Good',
            for_rent: false,
            for_sale: false,
            delivery_avail: false,
            pickup_avail: false,
            power_tool: false,
            power_type: null,
            requires_fuel: false,
            fuel_type: null,
            tool_img: '',
            price: 0,
            deposit:  0,
            currently_available: true,
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
        };
    };

    componentDidMount() {
        axios.get('/api/session').then(res =>
            res.data.user ?
            console.log('User on Session')
            : this.login()
        );
        window.scrollTo(0,0)
    };

    login = () => {
        const redirectUri = encodeURIComponent(`${window.origin}/auth/callback`);
        window.location = `https://${REACT_APP_DOMAIN}/authorize?client_id=${REACT_APP_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${redirectUri}&response_type=code`
    };

    postNewTool() {
        const {
            owner,
            name,
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
            deposit,
            currently_available,
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
        const priceInt = parseInt(price)
        const depositInt = parseInt(deposit)
        const tool_data = {
            owner,
            name,
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
            depositInt,
            currently_available
        }
        axios.post(`/api/post/tool`, tool_data).then( (res) => {
            const tool_id = res.data.tool_id;
            const tool_ID_and_Tags = {
                tool_id,
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
            axios.post(`/api/tooltags`, tool_ID_and_Tags).then( () => this.props.history.push(`/toolview/${tool_id}`));
        });
    };

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    };

    toogleBoolean(event) {
        this.setState({[event.target.name]: event.target.checked});
    };

    toogleTagBoolean(event) {
        this.setState({[event.target.name]: !this.state[event.target.name]});
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
                    tool_img: res.data.url
                })
            })
        });
    }

    render() {
        return(
            <div className='post-tool-body'>
                <h1>Post New Tool</h1>
                <div className='post-tool-section'>
                    
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
                    <img src={this.state.tool_img ? this.state.tool_img : defaultTool} alt='tool' width='200px' height='200px' />
                </div>
                <div className='post-tool-section'>
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
                <div className='post-tool-section'>
                    <div className ='post-toolDiv'>
                        <p className = 'post-inputText'>Brand name and model</p>
                        <input type='text' name='name' maxLength='40' className='post-input' onChange={this.handleChange}/>
                    </div>
                </div>
                <div className='post-tool-section'>
                    <div className ='post-toolDiv'>
                        <p className = 'post-inputText'>Description (Max 200)</p>
                        <input type='text' className='post-input' maxLength='200' name="description" onChange={this.handleChange}/>
                    </div>
                </div>
                <div className='post-tool-section'>
                    <div className ='post-toolDiv'>
                        <p className = 'post-inputText'>Daily Rental Fee</p>
                        <input type='number' className='post-input' name='price' maxLength='3' pattern="[0-9]" onChange={this.handleChange}/>
                    </div>
                </div>
                <div className='post-tool-section'>
                    <div className ='post-toolDiv'>
                        <p className = 'post-inputText'>Security Deposit Amount</p>
                        <input type='number' className='post-input' name='deposit' maxLength='5' pattern="[0-9]" onChange={this.handleChange}/>
                    </div>
                </div>
                <div className='post-tool-section'>
                    <div className='post-tool-divider'>Describe the condition of the tool.</div>
                    <select className='post-tool-input' name="condition" onChange={this.handleChange}>
                        <option value="Excellent">Excellent</option>
                        <option value="Great">Great</option>
                        <option selected value="Good">Good</option>
                        <option value="Fair">Fair</option>
                        <option value="Poor">Poor</option>
                    </select>
                </div>
                <div className='post-tool-section'>
                    <div className='post-tool-divider'>Will this tool be for rent?</div> 
                    <div className = 'tool-check'>{`Yes `}<label class="container"><input type='checkbox' name='for_rent' onClick={this.toogleBoolean}/><span class="checkmark"></span>
                    </label></div>
                </div>
                <div className='post-tool-section'>
                    <div className='post-tool-divider'>Will this tool be for sale?</div>
                    <div className = 'tool-check'>{`Yes `}<label class="container"><input type='checkbox' name='for_sale' onClick={this.toogleBoolean}/><span class="checkmark"></span>
                    </label></div>
                </div>
                <div className='post-tool-section'>
                    <div className='post-tool-divider'>Will this tool be available for delivery?</div>
                    <div className = 'tool-check'>{`Yes `}<label class="container"><input type='checkbox' name='delivery_avail' onClick={this.toogleBoolean}/><span class="checkmark"></span>
                    </label></div>
                </div>
                <div className='post-tool-section'>
                    <div className='post-tool-divider'>Will this tool be available for pick up?</div>
                    <div className = 'tool-check'>{`Yes `}<label class="container"><input type='checkbox' name='pickup_avail' onClick={this.toogleBoolean}/><span class="checkmark"></span>
                    </label></div>
                </div>
                <div className='post-tool-section'>
                    <div className='post-tool-divider'>Is this a power tool?</div>
                    <div className = 'tool-check'>{`Yes `}<label class="container"><input type='checkbox' name='power_tool' onClick={this.toogleBoolean}/><span class="checkmark"></span>
                    </label></div>
                </div>
                { 
                    this.state.power_tool ?
                    <div className='post-tool-section'>
                        <div className='post-tool-divider'>What type of power?</div> 
                        <select className='search-criteria-select' name="power_type" onChange={this.handleChange}>
                            <option selected value="null"></option>
                            <option value="electric">Electric</option>
                            <option value="pneumatic">Pneumatic</option>
                        </select>
                    </div>
                    :
                    null
                }
                <div className='post-tool-section'>
                    <div className='post-tool-divider'>Does this tool require fuel?</div>
                    <div className = 'tool-check'>{`Yes `}<label class="container"><input type='checkbox' name='requires_fuel' onClick={this.toogleBoolean}/><span class="checkmark"></span>
                    </label></div>
                </div>
                { 
                    this.state.requires_fuel ?
                    <div className='post-tool-section'>
                        <div className='post-tool-divider'>What type of fuel?</div>
                        <select className='search-criteria-select' name="fuel_type" defaultValue='' onChange={this.handleChange}>
                            <option selected value="null"></option>
                            <option value="gasoline">Gasoline</option>
                            <option value="diesel">Diesel</option>
                            <option value="ethanol">Ethanol</option>
                        </select>
                    </div>
                    :
                    null
                }
                <div className='post-tool-section'>
                    <button className='post-tool-button' onClick={this.postNewTool}>Post Tool</button>
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

export default connect(mapStateToProps)(PostTool);



// console.log(res.data)
//             this.props.history.push(`/toolview/${res.data.tool_id}`)