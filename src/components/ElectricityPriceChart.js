import { useState, useEffect } from "react";
import { getElectricityRetailPrice } from "../api/eia";
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
import { WorkRounded } from "@material-ui/icons";

export const ElectricityPriceChart = ({ stateAbbr, chartTitle }) => {
  const [electricityRetailPrice, setElectricityRetailPrice] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const getChartData = async () => {
      const price = await getElectricityRetailPrice(stateAbbr);
      if (price.error) {
        setElectricityRetailPrice([]);
        setErrorMessage(price.error);
      } else {
        setElectricityRetailPrice(price);
        setErrorMessage("");
      }
    };
    if (stateAbbr) {
      getChartData();
    }
  }, [stateAbbr]);

  return (
    <>
      {(electricityRetailPrice.length > 0 || errorMessage) && (
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
                  data={electricityRetailPrice}
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
                      name[0].toUpperCase() + name.slice(1).toLowerCase(),
                    ]}
                  />
                  <Line
                    type="monotone"
                    dataKey="price"
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
