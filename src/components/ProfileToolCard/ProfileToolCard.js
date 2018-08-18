import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class ProfileToolCard extends Component {
  render() {
    return (
      <div className='profileToolCard-card'>
          <img src={this.props.toolImg} alt='tool' className='profileToolCard-image'/>
        <div className='profileToolCard-cardTitle'>{this.props.toolName}</div>
        <div className='profileToolCard-cardPrice'>${this.props.toolPrice}/day</div>
        <Link to={`/toolview/${this.props.toolId}`}>
        <div className='profileToolCard-cardShade'/>
        </Link>
      </div>
    )
  }
}