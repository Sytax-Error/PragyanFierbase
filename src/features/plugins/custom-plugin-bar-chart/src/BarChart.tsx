import React from "react";
import type { BarChartProps } from "./types";

const BarChart = ({ data }: BarChartProps) => {
  return (
    <div>
      <h3>BarChart Chart</h3>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default BarChart;
