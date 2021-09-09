import axios from "axios";
import Papa from "papaparse";
import usStates from "../data/us-states.csv";

const baseUri = "https://api.eia.gov/series/";
const apiKey = "af02e509d6107011be422bd9a37458fd"; // readonly API key. Not concerned with exposing.
// Gets US States from static csv file
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

// Gets electricity retail prices from eia government api
const getElectricityRetailPrice = async (stateAbbr) => {
  const series = `ELEC.PRICE.${stateAbbr}-RES.A`;
  const response = await axios.get(baseUri, {
    params: {
      api_key: apiKey,
      series_id: series,
    },
  });

  if (response.data.data) {
    return { error: "Unable to retrieve data" };
  }

  const rawData = response.data.series[0].data;
  const mappedData = rawData.map((element) => {
    return { year: element[0], price: element[1] };
  });

  return mappedData;
};

// Gets energy production from eia government api
const getEnergyProduction = async (stateAbbr) => {
  const totalProdSeries = `SEDS.TEPRB.${stateAbbr}.A`;
  const renewableProdSeries = `SEDS.NCPRB.${stateAbbr}.A`;

  const totalProdResponse = await axios.get(baseUri, {
    params: {
      api_key: apiKey,
      series_id: totalProdSeries,
    },
  });

  const renewableProdResponse = await axios.get(baseUri, {
    params: {
      api_key: apiKey,
      series_id: renewableProdSeries,
    },
  });

  if (totalProdResponse.data.data || renewableProdResponse.data.data) {
    return { error: "Unable to retrieve data." };
  }

  const rawTotalData = totalProdResponse.data.series[0].data;
  const rawRenewableData = renewableProdResponse.data.series[0].data;

  const mappedData = rawTotalData
    .map((totalEl) => {
      return {
        year: totalEl[0],
        totalEnergyProd: totalEl[1],
        renewableEnergyProd: rawRenewableData.find(
          (renewEl) => renewEl[0] === totalEl[0]
        )[1],
      };
    })
    .slice(0, 20);

  return mappedData;
};

// Gets CO2 production from eia government api
const getCO2Production = async (stateAbbr) => {
  const series = `EMISS.CO2-TOTV-EC-TO-${stateAbbr}.A`;

  const response = await axios.get(baseUri, {
    params: {
      api_key: apiKey,
      series_id: series,
    },
  });

  if (response.data.data) {
    return { error: "Unable to retrieve data" };
  }

  const rawData = response.data.series[0].data;
  const mappedData = rawData
    .map((element) => {
      return { year: element[0], co2: element[1] };
    })
    .slice(0, 20);

  return mappedData;
};

export {
  getUSStateAbbr,
  getElectricityRetailPrice,
  getEnergyProduction,
  getCO2Production,
};
