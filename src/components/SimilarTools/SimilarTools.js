import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

class SimilarTools extends Component {
    constructor() {
        super();
        this.state = {
            matchingTags: [],
            matchingTools: []
        };
    };

    // componentDidUpdate(prevProps) {
    //     if(prevProps.tags !== this.props.tags){
    //         this.getToolsWithSameTags()
    //     };
    // };

    getSimilarTools = () => {
        let toolIds = this.state.matchingTags.map(tool=>{
            axios.post('/api/get_similar_tools', {toolId: tool.tool_id})
            .then(res=>{
               this.setState({
                   matchingTools: [...this.state.matchingTools, ...res.data]
               })
            }).catch(console.log)
            
        })
       
    }

    getToolsWithSameTags = () => {
        axios.get('/api/get_all_tags').then( res => {
          let matchingTags = res.data.filter(e=>{
                for(var key in e){
                        if(e[key] === this.props.tags[0][key] && e[key] !== false && res.data[0].tool_id !== e.tool_id){
                           return true
                        } 
                } 
                return false
            })
            this.setState({
                matchingTags: matchingTags
            })
          
        }).then(()=>{
            this.getSimilarTools()
        })
    };



    render() {
        console.log(this.state.matchingTools)
        let toolsWithSameTags = this.state.matchingTools.map( tool => {
            console.log(tool)
            return (
                <div>
                    <div>{tool.tool_name}</div>
                    <div>${tool.tool_price}</div>
                    <img src={`${tool.tool_img}`} alt="tool image"/>
                </div>
            );
        });

        return (
           <div>
             
           </div>
        );
    };
};

export default SimilarTools;