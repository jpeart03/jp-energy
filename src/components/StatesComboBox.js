import { useState } from "react";
import { Autocomplete } from "@material-ui/lab";
import { TextField } from "@material-ui/core";

import "./StatesComboBox.scss";

export const StatesComboBox = () => {
  // TODO: get statesList from API call
  const statesList = [
    { name: "Illinois", abbr: "IL" },
    { name: "Ohio", abbr: "OH" },
    { name: "Indiana", abbr: "IN" },
    { name: "Wisconsin", abbr: "WI" },
    { name: "Florida", abbr: "FL" },
    { name: "South Carolina", abbr: "SC" },
    { name: "North Carolina", abbr: "NC" },
    { name: "Georgia", abbr: "GA" },
    { name: "California", abbr: "CA" },
    { name: "Hawaii", abbr: "HI" },
  ].sort((a, b) => {
    if (a.abbr > b.abbr) return 1;
    if (a.abbr < b.abbr) return -1;
    return 0;
  });

  const [selectedState, setSelectedState] = useState(statesList[0]);
  const handleSelect = (value) => {
    setSelectedState(value);
  };

  return (
    <Autocomplete
      id="states-autocomplete"
      className="auto-complete"
      options={statesList}
      getOptionLabel={(option) => option.name}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Select a state"
          margin="normal"
          variant="outlined"
        />
      )}
      value={selectedState}
      onChange={(_, value) => handleSelect(value)}
      // override b/c using object as option
      getOptionSelected={(option, value) => option.abbr === value.abbr}
    />
  );
};
