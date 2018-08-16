import React from 'react';

export default function StarRating(props) {
  let numOfStars = Math.floor(props.rating)
  let stars = {
    1: {color: 'black', shadow: null},
    2: {color: 'black', shadow: null},
    3: {color: 'black', shadow: null},
    4: {color: 'black', shadow: null},
    5: {color: 'black', shadow: null}
  }
  for (var key in stars) {
    if (key <= numOfStars) {
      stars[key].color = 'yellow';
      stars[key].shadow = '4px 4px 1px black'
    }
  }
  return (
    <div className='starRating-rating'>
      <div className='starRating-starContainer'>
        <div className='starRating-star'>
          <i className="fas fa-star" style={{color: stars[1].color, textShadow: stars[1].shadow}}/>
          <i className="fas fa-star" style={{color: stars[2].color, textShadow: stars[2].shadow}}/>
          <i className="fas fa-star" style={{color: stars[3].color, textShadow: stars[3].shadow}}/>
          <i className="fas fa-star" style={{color: stars[4].color, textShadow: stars[4].shadow}}/>
          <i className="fas fa-star" style={{color: stars[5].color, textShadow: stars[5].shadow}}/>
        </div>
      </div>
      <span>{props.rateType} Rating</span>
    </div>
  )
}