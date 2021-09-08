import { useState, useEffect } from "react";
import { getCO2Production } from "../api/eia";
import { Card, CardContent, Typography, Link } from "@material-ui/core";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export const CO2ProductionChart = ({ stateAbbr, chartTitle }) => {
  const [CO2Production, setCO2Production] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const getChartData = async () => {
      const co2 = await getCO2Production(stateAbbr);
      if (co2.error) {
        setCO2Production([]);
        setErrorMessage(co2.error);
      } else {
        setCO2Production(co2);
        setErrorMessage("");
      }
    };
    if (stateAbbr) {
      getChartData();
    }
  }, [stateAbbr]);

  return (
    <>
      {(CO2Production.length > 0 || errorMessage) && (
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
                <LineChart
                  data={CO2Production}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 5,
                  }}
                >
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
                      name.toUpperCase(),
                    ]}
                  />
                  <Line
                    type="monotone"
                    dataKey="co2"
                    stroke="#2196f3"
                    dot={false}
                  />
                </LineChart>
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
