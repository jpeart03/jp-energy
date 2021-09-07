import { useState, useEffect } from "react";
import { getElectricityRetailPrice } from "../api/eia";
import {
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { Card, CardContent, Typography } from "@material-ui/core";

export const ElectricityPriceChart = ({ stateAbbr }) => {
    const [electricityRetailPrice, setElectricityRetailPrice] = useState([]);

    useEffect(() => {
        const getChartData = async () => {
            const response = await getElectricityRetailPrice(stateAbbr);
            if (response.data.data) {
                setElectricityRetailPrice([]);
                console.log(response.data.data.error);
            } else {
                const rawData = response.data.series[0].data;
                const mappedData = rawData.map((element) => {
                    return { year: element[0], price: element[1] };
                });
                setElectricityRetailPrice(mappedData);
            }
        };
        if (stateAbbr) {
            getChartData();
        }
    }, [stateAbbr]);

    return (
        <>
            {electricityRetailPrice.length > 0 && (
                <Card>
                    <CardContent>
                        <Typography variant="h4">{`${stateAbbr}: average electricity price`}</Typography>
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
                                <Tooltip />
                                <Line
                                    type="monotone"
                                    dataKey="price"
                                    stroke="#2196f3"
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            )}
        </>
    );
};
