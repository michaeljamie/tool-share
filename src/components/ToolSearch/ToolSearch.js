import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import ToolSearchCard from '../ToolSearchCard/ToolSearchCard';
import Toolview from './../../components/Toolview/Toolview';
import SearchBar from './../../components/SearchBar/SearchBar';
import ToolBrosLogo from './../../assets/ToolBrosLogo.png';
import {
  handleSearchTitle,
  handleSearchKeywords,
  handleSearchTags,
  handleSearchPickupOption,
  handleSearchRentOption,
  handleSearchSaleOption,
  handleSearchMaxDistance,
  handleSearchMaxPrice
} from '../../ducks/reducer';

class ToolSearch extends Component {
  constructor() {
    super();
    this.handleSearch = this.handleSearch.bind(this);
    this.state = {
      searchResults: [],
    };
  };

  componentDidMount() {
    axios.get('/api/tools').then( res => {
      this.setState({
        searchResults: res.data
      });
    });
    window.scrollTo(0,0);
  };

  handleSearch() {
    axios.get(`api/tools_by_tag/?tag=${this.props.search_tags}`)
    .then( res => {
      this.setState({
        searchResults: res.data
      })
    })
  };

  handleSearchFromSearchBar = (value) => {
    let searchResults = null
    this.setState({
      searchResults: []
    })
    axios.get('/api/tools').then( res => {
      
        searchResults = res.data
      
    }).then(()=>{
    
    let ids = searchResults.filter(tools=>{
      return tools[value] === true
    })
   
    let displayedTools = ids.map(tool=>{
      axios.post('api/get_tools_by_search', {tool_id: tool.tool_id})
      .then(res=>{
        this.setState({
          searchResults: [...this.state.searchResults, ...res.data]
        })
      })
    })
  })
  }

  render() {
    console.log(this.state.searchResults)
   
    const tagPropsToToolview = this.state.searchResults.map( (tool, index) => {
     
      return (
        <Toolview key={index*3} tag={tool.tag} thing = {'hello'} />
      )
    })
    
    
    const all_tools_unfiltered = this.state.searchResults.map( (tool, index) => {
      return (
        <ToolSearchCard key={index} tag={tool.tag} id={tool.tool_id} title={tool.tool_name} price={tool.tool_price} image={tool.tool_img} condition={tool.tool_condition}/>
      );
    })
  

    return (
      <div className="tool-search-body">
        <div className='search-logoContain'>
          <img src={ToolBrosLogo} className='search-logoIcon' alt="logo"/>
        </div>
        
        {/* <div className='search-bar'>
          <input className='search-bar-input' placeholder="Search By Title" name='searchTitle' value={this.props.search_title} onChange={(e) => this.props.handleSearchTitle(e.target.value)}/> */}
               <div className='home-contactDiv'>
                        <p className = 'home-inputText'>Start typing a keyword</p>
                        {/* <input className = 'home-input1' type="text" onChange = {(e) => {this.handleChange('formmessage', e.target.value)}} value = {this.state.formmessage}/> */}
                        <div className='search-dude'>
                        <SearchBar handleSearch={this.handleSearchFromSearchBar}/>
                        </div>
                    </div>
        {/* </div> */}
        {/* <div className='search-criteria'>
          <div className='search-bars'>
            <div className='search-criteria-left-box'>
              <div className='search-criteria-minor-box'>
              Keyword Search
                <select className='search-criteria-select' name="searchKeywords" value={this.props.search_keywords} onChange={(e) => this.props.handleSearchKeywords(e.target.value)}>
                  <option value="power-tools">Power Tools</option>
                  <option value="gas-tools">Gas Powered</option>
                  <option value="hand-tools">Hand Tools</option>
                </select>
              </div>
              <div className='search-criteria-minor-box'>
              Tag Search
                <select className='search-criteria-select' name="searchTags" value={this.state.search_tags} onChange={(e) => this.props.handleSearchTags(e.target.value)}>
                <option value="">Select</option>
                  <option value="drill">Drills</option>
                  <option value="saw">Saws</option>
                  <option value="jackhammer">Jackhammers</option>
                  <option value="sander">Sanders</option>
                  <option value="grinder">Grinders</option>
                </select>
              </div>
              <div className='search-criteria-minor-box'>
                Delivery or Pick-Up
                <select className='search-criteria-select' name="deliveryOrPickUp" value={this.props.search_pickup_option} onChange={(e) => this.props.handleSearchPickupOption(e.target.value)}>
                    <option value="pick-up">Pick-Up</option>
                    <option value="delivery">Delivery</option>
                    <option value="both">Delivery & Pick-Up</option>
                </select>
                For Rent
                  <input type="checkbox" name="forRent" defaultChecked value={this.props.search_rent_option} onClick={() => this.props.handleSearchRentOption()}/>
                  For Sale
                  <input type="checkbox" name="forSale" value={this.props.search_sale_option} onChange={() => this.props.handleSearchSaleOption()}/>
              </div>
            </div>
            <div className='search-criteria-right-box'>
              <div className='search-criteria-minor-box'>
                <div>
                  For Rent
                  <input type="checkbox" name="forRent" defaultChecked value={this.props.search_rent_option} onClick={() => this.props.handleSearchRentOption()}/>
                  For Sale
                  <input type="checkbox" name="forSale" value={this.props.search_sale_option} onChange={() => this.props.handleSearchSaleOption()}/>
                  <div>Max Price</div>
                  <input type="number" name="maxPrice" value={this.props.search_max_price} placeholder="Max Price" onChange={(e) => this.props.handleSearchMaxPrice(e.target.value)}/>
                </div>
              </div>
              <div className='search-criteria-minor-box'>
                <div>Distance</div>
                <div className='search-criteria-distance-radio'>
                  <input type="radio" id="10miles" name="maxDistanceMiles" value={5} onChange={(e) => this.props.handleSearchMaxDistance(e.target.value)}/>
                    <label>10mi</label>
                  <input type="radio" id="25miles" name="maxDistanceMiles" value={25} onChange={(e) => this.props.handleSearchMaxDistance(e.target.value)}/>
                    <label>25mi</label>
                  <input type="radio" id="50miles" name="maxDistanceMiles" value={50} onChange={(e) => this.props.handleSearchMaxDistance(e.target.value)}/>
                    <label>50mi</label> 
                </div>
              </div>
              
            </div>
          </div>
          <div className='search-filter-box'>
                  <button className='tool-search-button' onClick={this.handleSearch}>Search</button>
                  <button className='search-filter-button'>Filter</button>
                  <button className='search-filter-button'>Sort</button>
                </div>
        </div> */}
        
        <div className='search-results-container'>
          {all_tools_unfiltered}
        </div>
      </div>
    );
  };
};

function mapStateToProps(state) {
  return {
    search_title: state.search_title,
    search_keywords: state.search_keywords,
    search_tags: state.search_tags,
    search_rent_option: state.search_rent_option,
    search_sale_option: state.search_sale_option,
    search_pickup_option: state.search_pickup_option,
    search_max_distance: state.search_max_distance,
    search_max_price: state.search_max_price
  }
};

export default connect(mapStateToProps, {
  handleSearchTitle, 
  handleSearchKeywords,
  handleSearchTags,   
  handleSearchPickupOption,
  handleSearchRentOption,
  handleSearchSaleOption,
  handleSearchMaxDistance,
  handleSearchMaxPrice})(ToolSearch); 