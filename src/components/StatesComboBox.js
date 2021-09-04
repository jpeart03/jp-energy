import { useState, useEffect } from "react";
import { Autocomplete } from "@material-ui/lab";
import {
  TextField,
  Button,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";
import { getUSStateAbbr, getElecRetailPrice } from "../api/eia";

import "./StatesComboBox.scss";

export const StatesComboBox = () => {
  const [statesList, setStatesList] = useState([]);
  const [selectedState, setSelectedState] = useState({
    name: "",
    abbr: "",
  });
  const [elecRetailPrice, setElecRetailPrice] = useState([]);

  useEffect(() => {
    const fetchStatesAbbr = async () => {
      const response = await getUSStateAbbr();
      setStatesList(response.data);
    };
    fetchStatesAbbr();
  }, []);

  const handleSelect = (value) => {
    if (value) setSelectedState(value);
  };

  const handleGetData = async () => {
    const response = await getElecRetailPrice(selectedState.abbr);
    if (response.data.data) {
      setElecRetailPrice([]);
      console.log(response.data.data.error);
    } else {
      const data = response.data.series[0].data;
      setElecRetailPrice(data);
    }
  };

  return (
    <>
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
      <Button variant="contained" color="primary" onClick={handleGetData}>
        Get energy data
      </Button>
      {elecRetailPrice.length > 0 && (
        <TableContainer component={Paper} className="price-table-container">
          <Table aria-label="table of annual average state electricity prices">
            <TableHead>
              <TableRow>
                <TableCell>Year</TableCell>
                <TableCell>Price $</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {elecRetailPrice.map((record) => (
                <TableRow key={`${selectedState.abbr}-${record[0]}`}>
                  <TableCell component="th" scope="row">
                    {record[0]}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {record[1]}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};
