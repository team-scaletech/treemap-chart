import { createElement, FC, useEffect, useState } from "react";
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

interface ChartProps {
    chartValue?: MapData[];
    ChartTitle?: string;
    hoverEffectColor: string;
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
const TreemapChart: FC<ChartProps> = ({ chartValue, ChartTitle, hoverEffectColor }) => {
    const [data, setData] = useState<MapData[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    useEffect(() => {
        if (chartValue && chartValue.length > 0) {
            setData(chartValue);
        }
    }, [chartValue]);

    // Color generation function
    // const getDynamicColor = (dataCoverage: string) => {
    //     const parsedCoverage = parseFloat(dataCoverage);
    //     if (isNaN(parsedCoverage)) {
    //         return "rgba(255, 255, 255, 1)"; // Default color if coverage is invalid
    //     }

    //     // Clamp the coverage value to the range [0, 1]
    //     const clampedCoverage = Math.min(Math.max(parsedCoverage / 50, 0), 1);

    //     // Define a gradient from red (low coverage) to green (high coverage)
    //     const colors = [
    //         [59, 147, 165, 0.8], // Use different alpha values here
    //         [247, 184, 68, 0.6],
    //         [173, 216, 199, 0.7],
    //         [236, 60, 101, 0.5],
    //         [205, 215, 182, 0.9],
    //         [193, 246, 102, 0.3],
    //         [212, 63, 151, 0.6],
    //         [30, 93, 140, 0.4],
    //         [66, 18, 67, 0.2],
    //         [127, 148, 176, 0.8],
    //         [239, 101, 55, 0.9],
    //         [192, 173, 219, 0.7]
    //     ];

    //     // Calculate the color factor
    //     const numColors = colors.length;
    //     const factor = clampedCoverage * (numColors - 1);
    //     const startColorIdx = Math.floor(factor);
    //     const endColorIdx = Math.min(startColorIdx + 1, numColors - 1);
    //     const blend = factor - startColorIdx;

    //     // Interpolate the colors between start and end color
    //     const interpolate = (start: number, end: number, blend: number) => Math.round(start + (end - start) * blend);

    //     // Interpolate the RGBA values of the start and end colors
    //     const r = interpolate(colors[startColorIdx][0], colors[endColorIdx][0], blend);
    //     const g = interpolate(colors[startColorIdx][1], colors[endColorIdx][1], blend);
    //     const b = interpolate(colors[startColorIdx][2], colors[endColorIdx][2], blend);
    //     const a = interpolate(colors[startColorIdx][3], colors[endColorIdx][3], 1 - blend);

    //     console.warn("🚀 ~ getDynamicColor ~  `rgba(${r},${g},${b},${a})`:", `rgba(${r},${g},${b},${a})`);
    //     // Return the final interpolated color in rgba format
    //     return `rgba(${r},${g},${b},${a})`;
    // };

    const options = {
        plugins: {
            title: {
                display: true,
                text: ChartTitle
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
                        display: true,
                        formatter: (context: { raw: { _data: { labelKey: any } } }) => context.raw._data.labelKey
                    },
                    // backgroundColor(context: { type: string; raw: { _data: { dataCoverage: any } } }) {
                    //     if (context.type !== "data") return "transparent";
                    //     const {
                    //         _data: { dataCoverage }
                    //     } = context.raw;
                    //     return getDynamicColor(dataCoverage);
                    // },
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
        <div>
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
