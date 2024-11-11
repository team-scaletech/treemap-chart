import { FC, createElement, useEffect, useState } from "react";

import { TreeMapChartContainerProps } from "typings/TreeMapChartProps";
import TreemapChart from "./components/Chart";
import "./ui/TreeMapChart.css";

export interface MapData {
    labelKey: string;
    dataKey: string;
    // dataCoverage: string;
    tollTip: string;
}

const TreeMapChart: FC<TreeMapChartContainerProps> = ({
    objectsDatasource,
    labelKey,
    dataKey,
    // dataCoverageAttribute,
    myTollTip,
    chartTitle,
    hoverEffectColor
}) => {
    const [chartValue, setChartValue] = useState<MapData[]>([]);
    useEffect(() => {
        if (objectsDatasource && objectsDatasource.items) {
            objectsDatasource.items.forEach((item: any) => {
                const chartData = {
                    labelKey: labelKey.get(item).displayValue,
                    dataKey: dataKey.get(item).displayValue,
                    // dataCoverage: dataCoverageAttribute.get(item).displayValue,
                    tollTip: myTollTip.get(item).value || ""
                };
                setChartValue(prevChartValue => [...prevChartValue, chartData]);
            });
        }
    }, [objectsDatasource]);
    return <TreemapChart chartValue={chartValue} ChartTitle={chartTitle} hoverEffectColor={hoverEffectColor} />;
};

export default TreeMapChart;
