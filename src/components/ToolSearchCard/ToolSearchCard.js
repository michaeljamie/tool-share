import React, {Component} from 'react';
import './_ToolSearchCard.scss';
import {Link} from 'react-router-dom';

class ToolSearchCard extends Component {
    render() {
        return (
            <Link className="card-link" to={`/toolview/${this.props.id}`}>
                <div className="toolsearch-card">
                    <img src={this.props.image} alt='tool_pic' height='100%' width='50%'/>
                    <div className="card-info-div">
                        <div className="card-title">{this.props.title}</div>
                        <div className="card-price">${this.props.price}/day</div>
                        <div className="card-condition">Condition: {this.props.condition}</div>
                    </div>
                </div>
            </Link>
        );
    };
};

export default ToolSearchCard;