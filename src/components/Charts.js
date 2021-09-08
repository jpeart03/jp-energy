import { ElectricityPriceChart } from "./ElectricityPriceChart";
import { EnergyProductionChart } from "./EnergyProductionChart";
import { CO2ProductionChart } from "./CO2ProductionChart";
import "./Charts.scss";

export const Charts = ({ stateAbbr }) => {
  return (
    <section className="charts">
      <ElectricityPriceChart
        stateAbbr={stateAbbr}
        chartTitle="Avg retail cost of electricity (cents per kwh)"
      />
      <EnergyProductionChart
        stateAbbr={stateAbbr}
        chartTitle="Total and renewable energy production (billion btu)"
      />
      <CO2ProductionChart
        stateAbbr={stateAbbr}
        chartTitle="Electric power CO2 emissions (million mt)"
      />
    </section>
  );
};
