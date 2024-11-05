import { ReactElement, createElement } from "react";
import TreemapChart from "./components/Chart";

export function preview(): ReactElement {
    return <TreemapChart />;
}

export function getPreviewCss(): string {
    return require("./ui/TreeMapChart.css");
}
