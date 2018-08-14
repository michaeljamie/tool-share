import React, {Component} from 'react';
import './_ToolSearch.scss';

class ToolSearch extends Component {
  constructor() {
    super();
    this.state = {
      forRent: false,
      forSale: false,
      searchTitle: '',
      searchKeywords: [],
      deliveryOrPickUp: '',
      maxDistanceMiles: 0,
      maxPrice: 0
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.setRentalBoolean = this.setRentalBoolean.bind(this);
    this.setSaleBoolean = this.setSaleBoolean.bind(this);
  };

  handleSearch() {
    console.log("Searchin...")
  }

  handleChange(e) {
    this.setState( { [e.target.name]: e.target.value })
  };

  setRentalBoolean(e) {
    this.setState( prevState => ({forRent: !prevState.forRent}) )
  };

  setSaleBoolean(e) {
    this.setState( prevState => ({forSale: !prevState.forSale}) )
  };

  render() {
    console.log(this.state)
    return (
      <div className="tool-search-body">
        <div className='search-bar'>
          <input className='search-bar-input' placeholder="Search By Title" name='searchTitle' onChange={this.handleChange}/>
        </div>
        <div className='search-criteria'>
          <div className='search-criteria-left-box'>
            <div className='search-criteria-minor-box'>
            Keyword Search
              <select className='search-criteria-select' name="searchKeywords" onChange={this.handleChange}>
                <option value="power-tools">Power Tools</option>
                <option value="gas-tools">Gas Powered</option>
                <option value="hand-tools">Hand Tools</option>
              </select>
            </div>
            <div className='search-criteria-minor-box'>
              Delivery or Pick-Up
              <select className='search-criteria-select' name="deliveryOrPickUp" onChange={this.handleChange}>
                  <option value="pick-up">Pick-Up</option>
                  <option value="delivery">Delivery</option>
                  <option value="both">Delivery & Pick-Up</option>
              </select>
            </div>
          </div>
          <div className='search-criteria-right-box'>
            <div className='search-criteria-minor-box'>
              <div>
                For Rent
                <input type="checkbox" name="forRent" onChange={this.setRentalBoolean}/>
                For Sale
                <input type="checkbox" name="forSale" onChange={this.setSaleBoolean}/>
                <div>Max Price</div>
                <input type="number" name="maxPrice" placeholder="Max Price" onChange={this.handleChange}/>
              </div>
            </div>
            <div className='search-criteria-minor-box'>
              <div>Distance</div>
              <div className='search-criteria-distance-radio'>
                <input type="radio" id="10miles" name="maxDistanceMiles" value="10" onChange={this.handleChange}/>
                  <label>10mi</label>
                <input type="radio" id="25miles" name="maxDistanceMiles" value="25" onChange={this.handleChange}/>
                  <label>25mi</label>
                <input type="radio" id="50miles" name="maxDistanceMiles" value="50" onChange={this.handleChange}/>
                  <label>50mi</label>
              </div>
            </div>
          </div>
        </div>
        <div className='tool-search-submit-box'>
          <button className='tool-search-button' onClick={this.handleSearch}>Search</button>
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