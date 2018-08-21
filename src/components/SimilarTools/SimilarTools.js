import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class SimilarTools extends Component {
    render (){
        console.log('similar tools: ', this.props)
    return (
        <Link to={`/toolview/${this.props.id}`}>
            <div className="toolsearch-card">
                <img src={this.props.image} alt='tool_pic' height='100%' width='40%'/>
                <div>
                    <div>{this.props.name}</div>
                    <div>${this.props.price}</div>
                </div>
            </div>
        </Link>
    )
    }
}

export default SimilarTools;