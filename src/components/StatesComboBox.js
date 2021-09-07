import { useState, useEffect } from "react";
import { Autocomplete } from "@material-ui/lab";
import { TextField, Button } from "@material-ui/core";
import { getUSStateAbbr } from "../api/eia";

import "./StatesComboBox.scss";

export const StatesComboBox = ({ onGetEnergyData }) => {
    const [statesList, setStatesList] = useState([]);
    const [selectedState, setSelectedState] = useState({
        name: "",
        abbr: "",
    });

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
                getOptionSelected={(option, value) =>
                    option.abbr === value.abbr
                }
            />
            <Button
                variant="contained"
                color="primary"
                onClick={() => onGetEnergyData(selectedState.abbr)}
            >
                Get energy data
            </Button>
        </>
    );
};
