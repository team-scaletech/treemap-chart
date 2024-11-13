import { FC, createElement, useEffect, useState } from "react";

import { TreeMapChartContainerProps } from "typings/TreeMapChartProps";
import TreemapChart from "./components/Chart";

import "./ui/TreeMapChart.css";

export interface MapData {
    labelKey: string;
    dataKey: string;
    tollTip: string;
}

const TreeMapChart: FC<TreeMapChartContainerProps> = ({
    objectsDatasource,
    labelKey,
    dataKey,
    myToolTip,
    chartTitle,
    hoverEffectColor,
    IsTitle,
    fontFamily,
    fontColor,
    fontSize,
    fontStyle,
    fontWeight,
    IsLabels,
    labelsFontSize,
    labelsFontFamily,
    labelsFontWeight,
    labelsFontColor,
    labelsFontStyle,
    class: customClass,
    style
}) => {
    const [chartValue, setChartValue] = useState<MapData[]>([]);
    useEffect(() => {
        if (objectsDatasource && objectsDatasource.items) {
            objectsDatasource.items.forEach((item: any) => {
                const chartData = {
                    labelKey: labelKey.get(item).displayValue,
                    dataKey: dataKey.get(item).displayValue,
                    tollTip: myToolTip.get(item).value || ""
                };
                setChartValue(prevChartValue => [...prevChartValue, chartData]);
            });
        }
    }, [objectsDatasource]);
    return (
        <TreemapChart
            chartValue={chartValue}
            hoverEffectColor={hoverEffectColor}
            ChartTitleStyle={{
                chartTitle,
                IsTitle,
                fontFamily,
                fontColor,
                fontSize: parseFloat(fontSize as any),
                fontStyle,
                fontWeight: parseFloat(fontWeight as any)
            }}
            labelStyle={{
                IsLabels,
                labelsFontSize: parseFloat(labelsFontSize as any),
                labelsFontFamily,
                labelsFontWeight: parseFloat(labelsFontWeight as any),
                labelsFontColor,
                labelsFontStyle
            }}
            className={customClass || ""}
            style={style}
        />
    );
};

export default TreeMapChart;
