import { useState, useEffect } from "react";
import { getEnergyProduction } from "../api/eia";
import { Card, CardContent, Typography, Link } from "@material-ui/core";
import {
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

export const EnergyProductionChart = ({ stateAbbr, chartTitle }) => {
  const [energyProduction, setEnergyProduction] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const getChartData = async () => {
      const production = await getEnergyProduction(stateAbbr);
      if (production.error) {
        setEnergyProduction([]);
        setErrorMessage(production.error);
      } else {
        setEnergyProduction(production);
        setErrorMessage("");
      }
    };
    if (stateAbbr) {
      getChartData();
    }
  }, [stateAbbr]);
  return (
    <>
      {(energyProduction.length > 0 || errorMessage) && (
        <Card className="chart-card">
          {errorMessage ? (
            <CardContent>
              <Typography>
                Sorry, we couldn't find any data for that state.
              </Typography>
            </CardContent>
          ) : (
            <CardContent>
              <Typography variant="h4" className="chart-card__title">
                {chartTitle}
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart
                  data={energyProduction}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 30,
                    bottom: 5,
                  }}
                >
                  <defs>
                    <linearGradient id="colorTe" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2196f3" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#2196f3" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorRe" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4caf50" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#4caf50" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="#606060" />
                  <XAxis
                    dataKey="year"
                    type="category"
                    tick={{ fill: "#fff" }}
                    dy={10}
                    interval={4}
                    reversed={true}
                  />
                  <YAxis tick={{ fill: "#fff" }} dx={-10} />
                  <Tooltip
                    formatter={(value, name, props) => [
                      value,
                      name === "totalEnergyProd" ? "Total" : "Renewable",
                    ]}
                  />
                  <Area
                    type="monotone"
                    dataKey="totalEnergyProd"
                    stroke="#2196f3"
                    fillOpacity={1}
                    fill="url(#colorTe)"
                  />
                  <Area
                    type="monotone"
                    dataKey="renewableEnergyProd"
                    stroke="#4caf50"
                    fillOpacity={1}
                    fill="url(#colorRe)"
                  />
                </AreaChart>
              </ResponsiveContainer>

              <Typography variant="caption">
                <Link
                  href="https://www.eia.gov/opendata/"
                  target="_blank"
                  rel="noopener"
                >
                  Source: U.S. Energy Information Administration
                </Link>
              </Typography>
            </CardContent>
          )}
        </Card>
      )}
    </>
  );
};
