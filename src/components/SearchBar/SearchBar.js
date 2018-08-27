import React, {Component} from 'react';
import Autosuggest from 'react-autosuggest';
import axios from 'axios';

// class SearchBar extends Component {
//     constructor (){
//         super()
//         this.state = {
//           all_tools: [],
//           tool_tags: [],
//           value: '',
//           suggestions: []
//         }
//     }

//     getSuggestions = value => {
//       const inputValue = value.trim().toLowerCase();
//       const inputLength = inputValue.length;
//       return inputLength === 0 ? [] : this.state.tool_tags.filter(tag=>{
//         tag.toLowerCase().includes(inputValue) 
//       })
//     }

//     getSuggestionValue = suggestion => suggestion

//     renderSuggestion = suggestion => {
//         return (
//         <div>
//           {suggestion}
//         </div>
//         )
//     }

//     onChange = (event, { newValue }) => {
//       this.setState({
//         value: newValue
//       })
//     }

//     onSuggestionsFetchRequested = ({ value }) => {
//       this.setState({
//         suggestions: this.getSuggestions(value)
//       })
//     }

//     onSuggestionsClearRequested = () => {
//       this.setState({
//         suggestions: []
//       })
//     }

//     componentDidMount(){
//         axios.get('api/get_tool_names')
//         .then(res=>{
//             let toolNames = res.data.filter(tool=>{  
//               this.setState({all_tools: res.data})
//             })          
//         }).then(()=>{   
//           this.state.all_tools.forEach(tool=>{
//             for(var key in tool){
//               if(tool[key] === true){
//               this.setState({
//                 tool_tags: [...this.state.tool_tags, key]
//               })
//               }
//             }
//         })
//         })
//     }


//     render (){
      
//       const {value, suggestions} = this.state;
//       console.log(suggestions)
//       const inputProps = {
//         placeholder: 'Type a tool',
//         value,
//         onChange: this.onChange
//       }

//         return(
//             <div>
//               <Autosuggest
//               suggestions={suggestions}
//               onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
//               onSuggestionsClearRequested={this.onSuggestionsClearRequested}
//               getSuggestionValue={this.getSuggestionValue}
//               renderSuggestion={this.renderSuggestion}
//               inputProps={inputProps}
//               />
//             </div>
//         )
//     }
// }

// export default SearchBar;

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
      suggestions: []
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
   this.props.handleSearch(value)
  }

  render() {
    console.log(this.state.suggestions)
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: "Start typing a keyword",
      value,
      onChange: this.onChange
    };

    return (
      <div className='auto-suggest'>
      <Autosuggest 
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps} />
        <button onClick={()=>this.handleValueChange(value)}>Search</button>
        </div>
    );
  }
}

export default SearchBar;

