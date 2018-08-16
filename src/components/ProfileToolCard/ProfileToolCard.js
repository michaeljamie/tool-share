import React, {Component} from 'react';

export default class ProfileToolCard extends Component {
  constructor(props) {
    super();
    this.state = {

    }
  }
  render() {
    return (
      <div className='profileToolCard-card'>
        <div className='profileToolCard-cardTitle'>Tool of Sorts</div>
        <div className='profileToolCard-cardPrice'>$12/day</div>
      </div>
    )
  }
}