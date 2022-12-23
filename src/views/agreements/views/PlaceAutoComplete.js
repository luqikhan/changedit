import React from "react";
import PlacesAutocomplete from "react-places-autocomplete";

import { Input } from "reactstrap";

const PlaceAutoComplete = ({ value, onChange, handleSelect }) => {
  return (
    <PlacesAutocomplete
      value={value}
      onChange={onChange}
      onSelect={handleSelect}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div>
          <Input
            {...getInputProps({
              placeholder: "What is the registration address of the Car"
            })}
          />
          <div>
            {loading ? <div>...loading</div> : null}
            {suggestions.map((suggestion) => {
              const style = {
                backgroundColor: suggestion.active ? "#D3D3D3" : "#fff"
              };

              return (
                <div
                  {...getSuggestionItemProps(suggestion, { style })}
                  key={suggestion.description}
                >
                  {suggestion.description}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </PlacesAutocomplete>
  );
};

export default PlaceAutoComplete;
