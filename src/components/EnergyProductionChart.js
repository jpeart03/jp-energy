import { useState, useEffect } from "react";
import { getEnergyProduction } from "../api/eia";
import { Card, CardContent, Typography } from "@material-ui/core";
import {
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

export const EnergyProductionChart = ({ stateAbbr, chartTitle }) => {
    const [energyProduction, setEnergyProduction] = useState([]);
    const [errorMessage, setErrorMessage] = useState([]);

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
    // TODO CHANGE TO AREA CHART W/ LINEAR GRADIENT
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
                            <Typography
                                variant="h4"
                                className="chart-card__title"
                            >
                                {chartTitle}
                            </Typography>
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart
                                    data={energyProduction}
                                    margin={{
                                        top: 10,
                                        right: 30,
                                        left: 30,
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
                                    <Tooltip />
                                    <Line
                                        type="monotone"
                                        dataKey="totalEnergyProd"
                                        stroke="#2196f3"
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="renewableEnergyProd"
                                        stroke="#4caf50"
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </CardContent>
                    )}
                </Card>
            )}
        </>
    );
};
