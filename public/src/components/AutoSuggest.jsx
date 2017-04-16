import Autosuggest from 'react-autosuggest';
import React, {Component} from 'react';
var path = require('path');
const theme = {
  container: {
    position: 'relative'
  },
  input: {
    width: '100%',
    height: '49px',
    borderTopLeftRadius: '2px',
    borderTopRightRadius: '2px',
    borderBottomLeftRadius: '2px',
    borderBottomRightRadius: '2px',
    border: 'solid 0.5px #4f5965',
    fontfamily: 'Lato',
    fontsize: '14px',
    lineheight: '1.14px',
    textalign: 'right',
    color: '#4f5965',
    display: 'inline-block',
    float: 'left',
    paddingLeft: '35px'
  },
  inputFocused: {
    outline: 'none'
  },
  inputOpen: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0
  },
  suggestionsContainer: {
    display: 'none'
  },
  suggestionsContainerOpen: {
    display: 'block',
    position: 'absolute',
    top: 51,
    width: 280,
    border: '1px solid #aaa',
    backgroundColor: '#fff',
    fontFamily: 'Helvetica, sans-serif',
    fontWeight: 300,
    fontSize: 16,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    zIndex: 2
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
  suggestion: {
    cursor: 'pointer',
    padding: '10px 20px'
  },
  suggestionHighlighted: {
    backgroundColor: '#ddd'
  }
};

var searchFiles = [];
// Teach Autosuggest how to calculate suggestions for any given input value.
// const getSuggestions = value => {
//   const inputValue = value.trim().toLowerCase();
//   const inputLength = inputValue.length;
//
//   /*return inputLength === 0 ? [] : searchFiles.filter(file =>
//     file.fileName.toLowerCase().slice(0, inputLength) === inputValue
//   );*/
//
//   return inputLength === 0 ? [] : searchFiles.filter(file => {
//       return file.fileName.toLowerCase().slice(0, inputLength) === inputValue
//     }
//   );
// };
function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSuggestions(value) {
  const escapedValue = escapeRegexCharacters(value.trim());

  if (escapedValue === '') {
    return [];
  }

  const regex = new RegExp('^' + escapedValue, 'i');

  return searchFiles.filter(file => regex.test(file.fileName));
}

// When suggestion is clicked, Autosuggest needs to populate the input element
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
function getSuggestionValue(suggestion) {
  return suggestion.fileName;
}

// Use your imagination to render suggestions.
function renderSuggestion(suggestion) {
  return (
    <span>{suggestion.fileName}</span>
  );
}

const imgPath =  '../../images/search.svg';

const renderInputComponent = inputProps => (
  <div className="inputContainer">
    <img className="icon" src= {imgPath} style = {{ 'width': '20px',
    'height' : '21px', 'padding-top' : '5px' }}/>
    <input {...inputProps} />
  </div>
);

class AutoSuggest extends React.Component {
  constructor() {
    super();

    // Autosuggest is a controlled component.
    // This means that you need to provide an input value
    // and an onChange handler that updates this value (see below).
    // Suggestions also need to be provided to the Autosuggest,
    // and they are initially empty because the Autosuggest is closed.
    this.state = {
      value: '',
      suggestions: []
    };
  }

  onChange = (event, { newValue }) => {
    if (!newValue) {
      this.props.clearSearch();
    }
    this.setState({
      value: newValue
    });
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render() {
    const { value, suggestions } = this.state;
    var fileList = this.props.files;

    for(var i=0; i<fileList.length; i++){
      searchFiles[i] = fileList[i];
    }
    const inputProps = {
      placeholder: '  Search by Data File Name',
      value,
      onChange: this.onChange
    };


    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
        theme={theme}
        onSuggestionSelected={this.props.onSuggestionSelected}
        renderInputComponent={renderInputComponent}
      />
    );
  }
}

AutoSuggest.defaultProps = {
    files: []
};
export default AutoSuggest;
