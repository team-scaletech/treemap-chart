/**
 * This file was generated from TreeMapChart.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Framework Team
 */
import { CSSProperties } from "react";
import { ListValue, ListAttributeValue, ListExpressionValue } from "mendix";
import { Big } from "big.js";

export interface TreeMapChartContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    objectsDatasource: ListValue;
    dataKey: ListAttributeValue<Big | string>;
    labelKey: ListAttributeValue<Big | string>;
    chartTitle: string;
    myTollTip: ListExpressionValue<string>;
    hoverEffectColor: string;
}

export interface TreeMapChartPreviewProps {
    /**
     * @deprecated Deprecated since version 9.18.0. Please use class property instead.
     */
    className: string;
    class: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    renderMode?: "design" | "xray" | "structure";
    objectsDatasource: {} | { caption: string } | { type: string } | null;
    dataKey: string;
    labelKey: string;
    chartTitle: string;
    myTollTip: string;
    hoverEffectColor: string;
}
