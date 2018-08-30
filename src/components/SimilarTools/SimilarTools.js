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

    componentDidUpdate(prevProps) {
        if(prevProps.tags !== this.props.tags){
            this.getToolsWithSameTags()
        };
    };

    getSimilarTools = () => {
        this.setState({
            matchingTools: []
        })
        let toolIds = this.state.matchingTags.map(tool=>{
            axios.post('/api/get_similar_tools', {toolId: tool.tool_id})
            .then(res=>{
               this.setState({
                   matchingTools: [...this.state.matchingTools, ...res.data]
               })
            }).catch(console.log)
            
        })
       window.scrollTo(0,0)
    }

    getToolsWithSameTags = () => {
        axios.get('/api/get_all_tags').then( res => {
            console.log(res.data)
          let matchingTags = res.data.filter(e=>{
                for(var key in e){
                        if(e[key] === this.props.tags[0][key] && e[key] !== false && this.props.tags[0].tool_id !== e.tool_id){
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
   
        let toolsWithSameTags = this.state.matchingTools.map( tool => {
            return (
                <div key={Math.random()} onClick={()=>this.props.history.push(`/toolview/${tool.tool_id}`)} className='similar-tools'>
                    <div className='similar-tools-name'>{tool.tool_name}</div>
                    <img className='similar-tools-pic' src={`${tool.tool_img}`} alt="tool image"/>
                </div>
            );
        });

        return (
           <div className ='similar-tools-container'>
             {toolsWithSameTags}
           </div>
        );
    };
};

export default SimilarTools;