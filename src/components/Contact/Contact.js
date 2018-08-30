import React, { Component } from 'react';
import contact from './../../assets/contact.png';
import axios from 'axios';

export default class Contact extends Component {
    constructor(){
        super();

        this.state = {
            render: false,
            formname: '',
            formemail: '',
            formphone: '',
            formmessage: ''
        }
    }

    updateRender = () => {
            if(!this.state.render){
            this.setState({render: true})
        } else if (this.state.render){
            this.setState({render: false})
        }
    }

    sendForm = (e) => {
        e.preventDefault()
        const {formname, formemail, formphone, formmessage} = this.state;

        axios.post('./api/send', {
           formname,
           formemail,
           formphone,
           formmessage 
        });
        this.setState({
            formname: '',
            formemail: '',
            formphone: '',
            formmessage: '',
            render:false
        })
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
                    
                    <h2 className='contact-formText'>Request More Info:</h2>
                    <input type="text" className='contact-formInput' onChange = {(e) => {this.handleChange('formname', e.target.value)}} placeholder='Name' value = {this.state.formname}/>
                    <input type="text" className='contact-formInput'onChange = {(e) => {this.handleChange('formemail', e.target.value)}} placeholder='Email' value = {this.state.formemail}/>
                    <input type="text" className='contact-formInput'onChange = {(e) => {this.handleChange('formphone', e.target.value)}} placeholder='Phone' value = {this.state.formphone}/>
                    <input type="text" className='contact-formInput'onChange = {(e) => {this.handleChange('formmessage', e.target.value)}} placeholder='Message' value = {this.state.formmessage}/>
                    <button className='contact-formButton' onClick={this.sendForm}>Submit</button>
                </div>

            </div> : '' }
        </div>
    )
    }
}
