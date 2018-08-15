import React, {Component} from 'react';
import './_ToolSearchCard.scss';
import {Link} from 'react-router-dom';

class ToolSearchCard extends Component {
    render() {
        return (
            <Link to={`/toolview/${this.props.id}`}>
                <div className="toolsearch-card">
                    <img src={this.props.image} alt='tool_pic' height='100%' width='40%'/>
                    <div>
                        <div>{this.props.title}</div>
                        <div>${this.props.price}</div>
                        <div>{this.props.condition}</div>
                    </div>
                </div>
            </Link>
        );
    };
};

export default ToolSearchCard;