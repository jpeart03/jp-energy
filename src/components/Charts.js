import { ElectricityPriceChart } from "./ElectricityPriceChart";
import "./Charts.scss";

export const Charts = ({ stateAbbr }) => {
    return (
        <section className="charts">
            <ElectricityPriceChart stateAbbr={stateAbbr} />
        </section>
    );
};
