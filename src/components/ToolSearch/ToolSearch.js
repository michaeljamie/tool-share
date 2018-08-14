import React, {Component} from 'react';
import './ToolSearch.css';

class ToolSearch extends Component {
  constructor() {
    super();
    this.state = {
      forRent: false,
      forSale: false,
      searchTitle: '',
      searchKeywords: [],
      maxDistance: 0,
      maxPrice: 0
    };
  };

  handleChange(e) {
    this.setState( { [e.target.name]: e.target.value })
  };

  setBoolean(e) {
    this.setState( { [e.target.name]: !this.state })
  }

  render() {
    return (
      <div className="tool-search-body">
        <div className='search-bar'>
          <input placeholder="Search By Keyword"/>
        </div>
        <div className='search-criteria'>
          <div className='search-criteria-left-box'>
            <div className='search-criteria-minor-box'>
              For Rent
              <input type="checkbox" name="forRent" />
              For Sale
              <input type="checkbox" name="forSale" />
            </div>
            <div className='search-criteria-minor-box'>
              <select className='search-criteria-select' onChange={this.handleChange}>
                <option value="delivery">Delivery</option>
                <option value="pick-up">Pick-Up</option>
              </select>
            </div>
          </div>
          <div className='search-criteria-right-box'>
            <div className='search-criteria-minor-box'>
              <div>Max Price</div>
              <input type="number" name="price" placeholder="Max Price" onChange={this.handleChange}/>
            </div>
            <div className='search-criteria-minor-box'>
              <div>Distance</div>
              <div className='search-criteria-distance-radio'>
                <input type="radio" id="10miles" name="distance" value="email" onChange={this.handleChange}/>
                  <label>10mi</label>
                <input type="radio" id="25miles" name="distance" value="phone" onChange={this.handleChange}/>
                  <label>25mi</label>
                <input type="radio" id="50miles" name="distance" value="mail" onChange={this.handleChange}/>
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