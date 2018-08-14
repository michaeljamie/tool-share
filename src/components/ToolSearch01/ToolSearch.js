import React, {Component} from 'react';
import "./ToolSearch.css";

class ToolSearch extends Component {
  constructor() {
    super();
    this.state = {}
  };

  render() {
    return (
      <div className="tool-search-body">
        <div className='search-bar'>
          <input placeholder="Search By Keyword"/>
        </div>
        <div className='search-criteria'>
          <div className='search-criteria-left-box'>
            <div className='search-criteria-minor-box'>
            <select className='search-criteria-select'>
              <option value="rental">For Rent</option>
              <option value="sale">For Sale</option>
            </select>
            </div>
            <div className='search-criteria-minor-box'>
              <select className='search-criteria-select'>
                <option value="delivery">Delivery</option>
                <option value="pick-up">Pick-Up</option>
              </select>
            </div>
          </div>
          <div className='search-criteria-right-box'>
            <div className='search-criteria-minor-box'>
              <div>Max Price</div>
              <input type="number" name="price" placeholder="Max Price" />
            </div>
            <div className='search-criteria-minor-box'>
              <div>Distance</div>
              <div className='search-criteria-distance-radio'>
                <input type="radio" id="10miles"
                name="distance" value="email"/>
                <label>10mi</label>

                <input type="radio" id="25miles"
                name="distance" value="phone"/>
                <label>25mi</label>

                <input type="radio" id="50miles"
                name="distance" value="mail"/>
                <label>50mi</label>
              </div>
            </div>
          </div>
        </div>
        <div className='search-filter-box'>
          <button className='search-filter-button'>Filter</button>
          <button className='search-filter-button'>Sort</button>
        </div>
      </div>
    );
  };
};

export default ToolSearch;