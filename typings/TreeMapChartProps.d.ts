/**
 * This file was generated from TreeMapChart.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Framework Team
 */
import { CSSProperties } from "react";
import { ListValue } from "mendix";

export interface TreeMapChartContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    objectsDatasource?: ListValue;
    moduleName: string;
    entityName: string;
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
    moduleName: string;
    entityName: string;
}
