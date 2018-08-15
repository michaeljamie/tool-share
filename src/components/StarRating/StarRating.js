import React from 'react';

export default function StarRating(props) {
  let numOfStars = Math.floor(props.rating)
  let stars = {
    1: 'black',
    2: 'black',
    3: 'black',
    4: 'black',
    5: 'black'
  }
  for (var key in stars) {
    if (key <= numOfStars) {
      stars[key] = 'yellow'
    }
  }
  return (
    <div className='starRating-rating'>
      <div className='starRating-starContainer'>
        <div className='starRating-star'>
          <i className="fas fa-star" style={{color: stars[1]}}/>
          <i className="fas fa-star" style={{color: stars[2]}}/>
          <i className="fas fa-star" style={{color: stars[3]}}/>
          <i className="fas fa-star" style={{color: stars[4]}}/>
          <i className="fas fa-star" style={{color: stars[5]}}/>
        </div>
      </div>
      <span>{props.rateType} Rating</span>
    </div>
  )
}