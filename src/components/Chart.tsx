import { createElement, useState } from "react";
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
import { Chart } from "react-chartjs-2";

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

const TreemapChart = () => {
    const initialData = [
        { name: "Asset 1", capacityMW: 100, dataCoverage: 0.1 },
        { name: "Asset 2", capacityMW: 350, dataCoverage: 0.7 },
        { name: "Asset 3", capacityMW: 200, dataCoverage: 0.5 },
        { name: "Asset 4", capacityMW: 50, dataCoverage: 0.8 },
        { name: "Asset 5", capacityMW: 50, dataCoverage: 0.8 },
        { name: "Asset 6", capacityMW: 50, dataCoverage: 0.6 },
        { name: "Asset 7", capacityMW: 150, dataCoverage: 0 },
        { name: "Asset 8", capacityMW: 100, dataCoverage: 0.1 },
        { name: "Asset 9", capacityMW: 400, dataCoverage: 0.3 },
        { name: "Asset 10", capacityMW: 200, dataCoverage: 0.5 },
        { name: "Asset 11", capacityMW: 50, dataCoverage: 0.8 },
        { name: "Asset 12", capacityMW: 50, dataCoverage: 0.8 },
        { name: "Asset 13", capacityMW: 50, dataCoverage: 0.6 },
        { name: "Asset 14", capacityMW: 900, dataCoverage: 0.8 }
    ];

    const [data, setData] = useState(initialData);
    const [searchTerm, setSearchTerm] = useState("");

    const handleAddAsset = () => {
        const newAsset = {
            name: `Asset ${data.length + 1}`,
            capacityMW: Math.random() * 500,
            dataCoverage: Math.random()
        };
        setData([...data, newAsset]);
    };

    const getDynamicColor = (dataCoverage: any) => {
        const minColor = [255, 0, 0]; // Red for low coverage
        const maxColor = [0, 255, 0]; // Green for high coverage
        const interpolate = (min: number, max: number, factor: number) => Math.round(min + (max - min) * factor);

        const r = interpolate(minColor[0], maxColor[0], dataCoverage);
        const g = interpolate(minColor[1], maxColor[1], dataCoverage);
        const b = interpolate(minColor[2], maxColor[2], dataCoverage);

        return `rgb(${r},${g},${b})`;
    };

    const options = {
        plugins: {
            title: {
                display: true,
                text: "Treemap Example with Enhanced Features"
            },
            legend: {
                display: false
            },
            tooltip: {
                displayColors: false,
                callbacks: {
                    title(items: { raw: { _data: { name: any } } }[]) {
                        return items[0].raw._data.name;
                    },
                    label(item: { raw: { _data: { capacityMW: any; dataCoverage: any } } }) {
                        const {
                            _data: { capacityMW, dataCoverage }
                        } = item.raw;
                        const totalCapacity = data.reduce((acc, curr) => acc + curr.capacityMW, 0);
                        const percentage = ((capacityMW / totalCapacity) * 100).toFixed(1);
                        return [
                            `Export capacity: ${capacityMW} MW`,
                            `Data Coverage: ${(dataCoverage * 100).toFixed(1)}%`,
                            `Percentage of total capacity: ${percentage}%`
                        ];
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
                    key: "capacityMW",
                    labels: {
                        display: true,
                        formatter: (context: { raw: { _data: { name: any } } }) => context.raw._data.name
                    },
                    backgroundColor(context: { type: string; raw: { _data: { dataCoverage: any } } }) {
                        if (context.type !== "data") return "transparent";
                        const {
                            _data: { dataCoverage }
                        } = context.raw;
                        return getDynamicColor(dataCoverage);
                    },
                    hoverBackgroundColor: "yellow",
                    borderColor: "black",
                    borderWidth: 1
                }
            ]
        }
    };

    // Filter data based on search term
    const filteredData = data.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div>
            <input
                type="text"
                placeholder="Search asset..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                aria-label="Search assets"
            />
            <button onClick={handleAddAsset}>Add Asset</button>
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
