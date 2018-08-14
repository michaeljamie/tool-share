import React, {Component} from 'react';
import './_ToolSearchCard.scss';
import {Link} from 'react-router-dom';

class ToolSearchCard extends Component {

    render() {
        return (
            <div className="toolsearch-card">
                <div>{this.props.title}</div>
                <div>${this.props.price}</div>
                <div>{this.props.condition}</div>
            </div>
        );
    };
};

export default ToolSearchCard;