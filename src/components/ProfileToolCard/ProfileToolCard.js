import React, {Component} from 'react';

export default class ProfileToolCard extends Component {
  constructor() {
    super();
    this.state = {

    }
  }
  render() {
    return (
      <div className='profileToolCard-card'>
        <div className='profileToolCard-cardTitle'></div>
        <div className='profileToolCard-cardPrice'></div>
      </div>
    )
  }
}