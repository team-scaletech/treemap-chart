import { FC, createElement, useEffect, useState } from "react";

import { TreeMapChartContainerProps } from "typings/TreeMapChartProps";
import TreemapChart from "./components/Chart";
import "./ui/TreeMapChart.css";

export interface MapData {
    name: string;
    capacityMW: string;
    dataCoverage: string;
}

const TreeMapChart: FC<TreeMapChartContainerProps> = ({
    objectsDatasource,
    nameAttribute,
    capacityMWAttribute,
    dataCoverageAttribute,
    myTollTip
}) => {
    const [chartValue, setChartValue] = useState<MapData[]>([]);
    useEffect(() => {
        if (objectsDatasource && objectsDatasource.items) {
            objectsDatasource.items.forEach((item: any) => {
                console.warn("🚀 ~ myTollTip:", myTollTip.get(item));

                const chartData = {
                    name: nameAttribute.get(item).displayValue,
                    capacityMW: capacityMWAttribute.get(item).displayValue,
                    dataCoverage: dataCoverageAttribute.get(item).displayValue
                };
                setChartValue(prevChartValue => [...prevChartValue, chartData]);
            });
        }
    }, [objectsDatasource]);
    return <TreemapChart chartValue={chartValue} />;
};

export default TreeMapChart;
