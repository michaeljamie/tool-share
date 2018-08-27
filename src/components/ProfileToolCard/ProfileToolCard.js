import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import check from '../../assets/greenCheck.png';
import x from '../../assets/redX.png';

export default class ProfileToolCard extends Component {
  render() {
    return (
      <div className='profileToolCard-card'>
        <img src={this.props.toolImg} alt='tool' className='profileToolCard-image'/>
        <div className='profileToolCard-cardShade'/>
        {parseInt(this.props.profileId)===this.props.renterId?
        null:
        (this.props.currentlyAvailable?
        <img src={check} alt='in' className='profileToolCard-ifAvailable'/>:
        <img src={x} alt='out' className='profileToolCard-ifAvailable'/>)
        }
        <div className='profileToolCard-cardTitle'>{this.props.toolName}</div>
        <div className='profileToolCard-cardPrice'>{this.props.toolPrice}/day</div>
        <Link to={`/toolview/${this.props.toolId}`}>
          <div className='profileToolCard-link'/>
        </Link>
      </div>
    )
  }
}