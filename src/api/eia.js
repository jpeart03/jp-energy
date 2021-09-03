import axios from "axios";
import Papa from "papaparse";
import usStates from "../data/us-states.csv";

const baseUri = "http://api.eia.gov/series/";
const API_KEY = process.env.REACT_APP_EIA_API_KEY;

const getUSStateAbbr = async () => {
    return new Promise((resolve, reject) => {
        Papa.parse(usStates, {
            download: true, // this is required if passing a file path
            header: true,
            complete: (result) => resolve(result),
            error: (error) => reject(error),
        });
    });
};

const getElecRetailPrice = async (stateAbbr) => {
    const series = `ELEC.PRICE.${stateAbbr}-RES.A`;
    const apiKey = API_KEY;
    const response = await axios.get(baseUri, {
        params: {
            api_key: apiKey,
            series_id: series,
        },
    });
    return response;
};

export { getUSStateAbbr, getElecRetailPrice };
