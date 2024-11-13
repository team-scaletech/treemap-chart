import { createElement, CSSProperties, FC, useEffect, useState } from "react";
import { Chart } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend as ChartLegend
} from "chart.js";
import { TreemapController, TreemapElement } from "chartjs-chart-treemap";
import { MapData } from "src/TreeMapChart";

// Register the necessary plugins
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    ChartLegend,
    TreemapController,
    TreemapElement
);
interface LabelStyleProps {
    IsLabels?: boolean;
    labelsFontSize?: number;
    labelsFontFamily?: string;
    labelsFontWeight?: number;
    labelsFontColor?: string;
    labelsFontStyle?: string;
}

interface ChartTitleProps {
    chartTitle?: string;
    IsTitle?: boolean;
    fontFamily?: string;
    fontColor?: string;
    fontSize?: number;
    fontStyle?: string;
    fontWeight?: number;
}
interface ChartProps {
    chartValue?: MapData[];
    hoverEffectColor?: string;
    ChartTitleStyle?: ChartTitleProps;
    labelStyle?: LabelStyleProps;
    className?: string;
    style?: CSSProperties;
}
const colors = [
    "rgba(59, 147, 165, 0.8)",
    "rgba(247, 184, 68, 0.6)",
    "rgba(173, 216, 199, 0.7)",
    "rgba(236, 60, 101, 0.5)",
    "rgba(205, 215, 182, 0.9)",
    "rgba(193, 246, 102, 0.3)",
    "rgba(212, 63, 151, 0.6)",
    "rgba(30, 93, 140, 0.4)",
    "rgba(66, 18, 67, 0.2)",
    "rgba(127, 148, 176, 0.8)",
    "rgba(239, 101, 55, 0.9)",
    "rgba(192, 173, 219, 0.7)"
];
const defaultChartTitleStyle: ChartTitleProps = {
    chartTitle: "demo",
    IsTitle: true,
    fontFamily: "Open Sans, sans-serif",
    fontColor: "#000000",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: 400
};
const defaultlabelStyle: LabelStyleProps = {
    IsLabels: true,
    labelsFontFamily: "Open Sans, sans-serif",
    labelsFontColor: "#000000",
    labelsFontSize: 16,
    labelsFontStyle: "normal",
    labelsFontWeight: 600
};
const TreemapChart: FC<ChartProps> = ({
    chartValue,
    hoverEffectColor,
    ChartTitleStyle,
    labelStyle,
    className,
    style
}) => {
    const [data, setData] = useState<MapData[]>([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        if (chartValue && chartValue.length > 0) {
            setData(chartValue);
        }
    }, [chartValue]);
    const mergedChartTitleStyle = {
        ...defaultChartTitleStyle,
        ...Object.fromEntries(
            Object.entries(ChartTitleStyle || {}).filter(([_, value]) => value !== "" && value !== undefined)
        )
    };
    const mergedlabelStyle = {
        ...defaultlabelStyle,
        ...Object.fromEntries(
            Object.entries(labelStyle || {}).filter(([_, value]) => value !== "" && value !== undefined)
        )
    };
    const options = {
        plugins: {
            title: {
                display: mergedChartTitleStyle.IsTitle,
                text: mergedChartTitleStyle.chartTitle,
                color: mergedChartTitleStyle.fontColor,
                font: {
                    family: mergedChartTitleStyle.fontFamily,
                    size: mergedChartTitleStyle.fontSize,
                    style: mergedChartTitleStyle.fontStyle,
                    weight: mergedChartTitleStyle.fontWeight
                }
            },
            legend: {
                display: false
            },
            tooltip: {
                displayColors: false,
                callbacks: {
                    title(items: { raw: { _data: { labelKey: any } } }[]) {
                        return items[0].raw._data.labelKey;
                    },
                    label(item: { raw: { _data: { tollTip: string } } }) {
                        const {
                            _data: { tollTip }
                        } = item.raw;

                        return [tollTip];
                    }
                }
            }
        }
    };

    const config = {
        type: "treemap",
        data: {
            datasets: [
                {
                    tree: data,
                    key: "dataKey",
                    labels: {
                        display: mergedlabelStyle.IsLabels,
                        formatter: (context: { raw: { _data: { labelKey: any } } }) => context.raw._data.labelKey,
                        color: mergedlabelStyle.labelsFontColor, // Set label color
                        font: {
                            size: mergedlabelStyle.labelsFontSize, // Set font size
                            family: mergedlabelStyle.labelsFontFamily, // Optional: specify a font family
                            weight: mergedlabelStyle.labelsFontWeight, // Optional: set font weight
                            style: mergedlabelStyle.labelsFontStyle
                        }
                    },

                    backgroundColor(context: { dataIndex: number }) {
                        return colors[context.dataIndex % colors.length];
                    },
                    hoverBackgroundColor: hoverEffectColor ? hoverEffectColor : "yellow",
                    borderColor: "black",
                    borderWidth: 1
                }
            ]
        }
    };

    // Filter data based on search term
    const filteredData = data.filter(item => item.labelKey.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className={className} style={style}>
            <div className="search-wrapper">
                <div className="search-container">
                    <span className="search-icon">&#x1F50E;&#xFE0E;</span>
                    <input
                        className="search-area"
                        type="text"
                        placeholder="Search asset..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        aria-label="Search assets"
                    />
                </div>
            </div>
            <Chart
                type="treemap"
                data={{
                    ...config.data,
                    datasets: [{ ...config.data.datasets[0], tree: filteredData } as any]
                }}
                options={options as any}
            />
        </div>
    );
};

export default TreemapChart;
