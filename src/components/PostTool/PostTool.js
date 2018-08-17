import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {connect} from "react-redux";

class PostTool extends Component {
    constructor(props) {
        super(props);
        this.postNewTool = this.postNewTool.bind(this);
        this.state ={
            name:'asdfa'
        };
    };

    postNewTool() {
        const {name} = this.state
        let data = name
        console.log(data)
        // axios.post(`/api/post/tool`).then( (res) => {
        //     console.log(res)
        // })
    }

    render() {
        return(
            <div>
                <h1>Post New Tool</h1>
                <div>Name: <input type='text' className='posttool-input'/></div>
                <div>Type:               
                    <select className='posttool-input' name="tool-type">
                        <option value="type1">Type1</option>
                        <option value="type2">Type2</option>
                        <option value="type3">Type3</option>
                    </select>
                </div>
                <div>Description: <input type='text' className='posttool-input'/></div>
                <div>Condition:
                    <select className='search-criteria-select' name="searchKeywords" value={this.props.search_keywords} onChange={(e) => this.props.handleSearchKeywords(e.target.value)}>
                        <option value="type1">Great</option>
                        <option value="type2">Good</option>
                        <option value="type3">Fair</option>
                        <option value="type3">Poor</option>
                    </select>
                </div>
                <div>For Rent: <input type='checkbox' /></div>
                <div>For Sale: <input type='checkbox' /></div>
                <div>Delivery: <input type='checkbox' /></div>
                <div>Pick Up: <input type='checkbox' /></div>
                <div>Power Tool: <input type='checkbox' /></div>
                <div>Requires Fuel: <input type='checkbox' /></div>
                <div>Fuel Type: 
                    <select className='search-criteria-select' name="searchKeywords" value={this.props.search_keywords} onChange={(e) => this.props.handleSearchKeywords(e.target.value)}>
                        <option value="type1">Gasoline</option>
                        <option value="type2">Diesel</option>
                        <option value="type3">Ethanol</option>
                    </select>
                </div>
                <div>Tool IMG: <input type='text' className='posttool-input'/></div>
                <div>Price: <input type='number' className='posttool-input'/></div>
                <div>Deposit: <input type='number' className='posttool-input'/></div>
                <button onClick={this.postNewTool}>Post Tool</button>
            </div>
        );
    };
};


  
export default PostTool