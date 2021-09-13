import { useState, useEffect } from "react";
import { Autocomplete } from "@material-ui/lab";
import { TextField } from "@material-ui/core";
import { getUSStateAbbr } from "../api/eia";

import "./StatesComboBox.scss";

export const StatesComboBox = ({ value, onSelectState, labelText }) => {
  const [statesList, setStatesList] = useState([]);

  useEffect(() => {
    const fetchStatesAbbr = async () => {
      const response = await getUSStateAbbr();
      setStatesList(response.data);
    };
    fetchStatesAbbr();
  }, []);

  return (
    <Autocomplete
      id="states-autocomplete"
      className="auto-complete"
      options={statesList}
      getOptionLabel={(option) => option.name}
      renderInput={(params) => (
        <TextField
          {...params}
          label={labelText}
          margin="normal"
          variant="outlined"
        />
      )}
      onChange={(_, value) => onSelectState(value)}
      value={value}
      // override b/c using object as option
      getOptionSelected={(option, value) => option.abbr === value.abbr}
    />
  );
};
