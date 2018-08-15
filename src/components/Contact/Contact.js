import React, { Component } from 'react';
import contact from './../../assets/contact.png';
import swal from 'sweetalert2'

export default class Contact extends Component {
    constructor(){
        super();

        this.state = {
            render: false,
            formName: '',
            formEmail: '',
            formMessage: ''
        }
    }

    updateRender = () => {
            if(!this.state.render){
            this.setState({render: true})
        } else if (this.state.render){
            this.setState({render: false})
        }
    }

    sendForm = () => {
        this.setState({render:false})
    }

    handleChange = (property, value) => {
        this.setState({
      [property]: value
    })
    }
    

    render () {
    return(
        <div>
            <div onClick={this.updateRender} className='contact-main'>
                <div className = 'contact-icon'>
                    <img src={contact} alt="" className = 'contact-iconPic'/>


                </div>
            </div>
            { this.state.render ? 
            
            <div className='contact-form'>
                <div className='contact-insideForm'>
                    <h2 className='contact-formText'>Contact Us Now:</h2>
                    <input type="text" className='contact-formInput' onChange = {(e) => {this.handleChange('formName', e.target.value)}} placeholder='Name'/>
                    <input type="text" className='contact-formInput'onChange = {(e) => {this.handleChange('formEmail', e.target.value)}} placeholder='Email'/>
                    <input type="text" className='contact-formInput'onChange = {(e) => {this.handleChange('formMessage', e.target.value)}} placeholder='Message'/>
                    <button className='contact-formButton' onClick={this.sendForm}>Submit</button>
                </div>

            </div> : '' }
        </div>
    )
    }
}
