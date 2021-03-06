import React, {Component} from 'react'
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete'
import {Container, InputGroup, FormControl} from 'react-bootstrap'

class LocationSearchInput extends Component {
  constructor(props) {
    super(props)
    this.state = {address: ''}
    this.helperFunction = this.helperFunction.bind(this)
  }

  handleChange = address => {
    this.setState({address})
  }

  helperFunction(arg1, arg2) {
    this.props.handler(this.state.address, arg1, arg2)
  }
  handleSelect = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => this.helperFunction(latLng.lat, latLng.lng))
      .then(this.setState({address}))
      .then(latLng => console.log('Success', latLng))
      .catch(error => console.error('Error', error))
  }

  render() {
    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >
        {({getInputProps, suggestions, getSuggestionItemProps, loading}) => (
          <div>
            <InputGroup
              size="lg"
              {...getInputProps({
                placeholder: 'Search Places ...',
                className: 'location-search-input'
              })}
            >
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroup-sizing-lg">
                  Search
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                aria-label="Large"
                aria-describedby="inputGroup-sizing-lg"
              />
            </InputGroup>
            {/* <input size="lg"
              {...getInputProps({
                placeholder: 'Search Places ...',
                className: 'location-search-input'
              })}
            /> */}
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item'
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? {backgroundColor: '#fafafa', cursor: 'pointer'}
                  : {backgroundColor: '#ffffff', cursor: 'pointer'}
                return (
                  <div
                    key={suggestion}
                    {...getSuggestionItemProps(suggestion, {className, style})}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    )
  }
}

export default LocationSearchInput
