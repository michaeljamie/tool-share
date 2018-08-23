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
        let tagsAndID = this.props.tags[0]
        console.log(tagsAndID)
        axios.post('/api/get_matching_tags', tagsAndID).then( res => {
            this.setState({
                matchingTagsAndTools: res.data
            });
        });
    };

    render() {

        let toolsWithSameTags = this.state.matchingTagsAndTools.map( tool => {
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