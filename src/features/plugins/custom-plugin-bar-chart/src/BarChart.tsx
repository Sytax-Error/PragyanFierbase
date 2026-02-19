import React from "react";
import type { BarChartProps } from "./types";

const BarChart = ({ data }: BarChartProps) => {
  return (
    // Use aspect-ratio to reserve space and prevent layout shake. 
    // This is a responsive alternative to a fixed height.
    <div style={{ width: '100%', aspectRatio: '16 / 9' }}>
      <h3>BarChart Chart</h3>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default BarChart;
