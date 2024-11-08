import { FC, createElement, useEffect } from "react";

import { TreeMapChartContainerProps } from "typings/TreeMapChartProps";
import TreemapChart from "./components/Chart";
import "./ui/TreeMapChart.css";

interface MapData {
    name: string;
    capacityMW: string;
    dataCoverage: string;
}

const TreeMapChart: FC<TreeMapChartContainerProps> = ({ objectsDatasource }) => {
    useEffect(() => {
        let datavalue: MapData[] = [];

        if (objectsDatasource && objectsDatasource.items && objectsDatasource.items.length > 0) {
            try {
                const { items } = objectsDatasource;
                datavalue = items
                    ? items
                          .map((item: any) => {
                              const defectAttributes = item[Object.getOwnPropertySymbols(item)[0]].jsonData.attributes;
                              const name = defectAttributes.name.value;
                              const capacityMW = defectAttributes.capacityMW.value;
                              const dataCoverage = defectAttributes.dataCoverage.value;

                              // Return null if any required attribute is null
                              if (name == null || capacityMW == null || dataCoverage == null) {
                                  return null;
                              }

                              return {
                                  name: name,
                                  capacityMW: capacityMW,
                                  dataCoverage: dataCoverage || ""
                              };
                          })
                          // Filter out null values
                          .filter((item): item is MapData => item !== null)
                    : [];
            } catch (e) {
                console.log("Error in processing defects", e);
            }
        }
    }, [objectsDatasource]);
    return <TreemapChart />;
};

export default TreeMapChart;
