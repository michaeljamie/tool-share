import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

class SimilarTools extends Component {
    constructor() {
        super();
        this.state = {
            matchingTagsAndTools: []
        };
    };

    componentDidUpdate(prevProps) {
        if(prevProps.tags !== this.props.tags){
            this.getToolsWithSameTags()
        };
    };

    getToolsWithSameTags = () => {
        axios.get('/api/get_matching_tags').then( res => {
            this.setState({
                matchingTagsAndTools: res.data
            });
        });
    };

    render() {
        
        let tagsAndID = this.props.tags[0]
        console.log(tagsAndID)

        let toolsWithSameTags = this.state.matchingTagsAndTools.filter( tool => {
            return (
                <div>{tool.tool_name}</div>
            );
        });

        return (
           <div>
               {toolsWithSameTags}
           </div>
        );
    };
};

export default SimilarTools;