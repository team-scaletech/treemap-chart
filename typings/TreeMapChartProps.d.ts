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
    myToolTip: ListExpressionValue<string>;
    hoverEffectColor: string;
    IsLabels: boolean;
    labelsFontColor: string;
    labelsFontFamily: string;
    labelsFontSize: Big;
    labelsFontStyle: string;
    labelsFontWeight: Big;
    IsTitle: boolean;
    chartTitle: string;
    fontColor: string;
    fontFamily: string;
    fontSize: Big;
    fontStyle: string;
    fontWeight: Big;
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
    myToolTip: string;
    hoverEffectColor: string;
    IsLabels: boolean;
    labelsFontColor: string;
    labelsFontFamily: string;
    labelsFontSize: number | null;
    labelsFontStyle: string;
    labelsFontWeight: number | null;
    IsTitle: boolean;
    chartTitle: string;
    fontColor: string;
    fontFamily: string;
    fontSize: number | null;
    fontStyle: string;
    fontWeight: number | null;
}
