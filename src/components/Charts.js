import { ElectricityPriceChart } from "./ElectricityPriceChart";
import { EnergyProductionChart } from "./EnergyProductionChart";
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
        </section>
    );
};
