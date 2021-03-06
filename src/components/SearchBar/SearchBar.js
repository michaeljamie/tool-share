import React, {Component} from 'react';
import Autosuggest from 'react-autosuggest';
import axios from 'axios';
import themeable from 'react-themeable';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';


const languages = [
  {
    name: 'drill',
    year: 3000
  },
  {
    name: 'saw',
    year: 2000
  },
  {
    name: 'hammer',
    year: 1983
  },
  {
    name: 'auger',
    year: 2007
  },
  {
    name: 'grinder',
    year: 2012
  },
  {
    name: 'jackhammer',
    year: 2009
  },
  {
    name: 'mower',
    year: 1990
  },
  {
    name: 'trimmer',
    year: 1995
  },
  {
    name: 'ladder',
    year: 1995
  },
  {
    name: 'welder',
    year: 1987
  },
  {
    name: 'vacuum',
    year: 1995
  },
  {
    name: 'air compressor',
    year: 1991
  },
  {
    name: 'wrench',
    year: 1995
  },
  {
    name: 'lawn',
    year: 2003
  }
];

// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSuggestions(value) {
  const escapedValue = escapeRegexCharacters(value.trim());
  
  if (escapedValue === '') {
    return [];
  }

  const regex = new RegExp('^' + escapedValue, 'i');

  return languages.filter(language => regex.test(language.name));
}

function getSuggestionValue(suggestion) {
  return suggestion.name;
}

function renderSuggestion(suggestion) {
  return (
    <span>{suggestion.name}</span>
  );
}

class SearchBar extends React.Component {
  constructor() {
    super();

    this.state = {
      value: '',
      suggestions: [],
      price: { min: 0, max: 0},
      distance: 0
    };    
  }


  onChange = (event, { newValue, method }) => {
    this.setState({
      value: newValue
    });
  };
  
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  handleValueChange = (value) => {
    
   if(this.props.location.pathname === '/'){
    this.props.handleSearch(value)
    this.props.history.push('/search')
   } else if (this.props.location.pathname === '/search'){
      this.props.handleSearch(value)
   }
  
  }

  render() {
    
    const theme = themeable(this.props.theme);
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: "",
      value,
      onChange: this.onChange
    };

    return (
      <div className='auto-suggest'>

      <Autosuggest 
        theme={this.theme}
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps} />
        {/* <p className = 'home-inputText'>Max Daily Price</p>
          <InputRange
          draggableTrack
          maxValue={200}
          minValue={0}
          value={this.state.price}
          onChange={price => this.setState({ price })}
          onChangeComplete={value => console.log(value)}
          value={this.state.value5}/> */}
          {/* <input className='range-slider__range' type="range" value="$50" min="$0" max="$100"/> */}
        {/* <p className = 'home-inputText'>Max Distance (Miles)</p>
          <InputRange
          draggableTrack
          maxValue={100}
          minValue={0}
          value={this.state.distance}
          onChange={distance => this.setState({ distance })}
          onChangeComplete={value => console.log(value)}
          value={this.state.value5}/> */}
          {/* <input className='range-slider__range' type="range" value="50" min="0" max="100"/> */}
          {/* <br/> */}
        <button className='search-bar-button' onClick={()=>this.handleValueChange(value)}>Search</button>
        </div>
    );
  }
}

export default SearchBar;

