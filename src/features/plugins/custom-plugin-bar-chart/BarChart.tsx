import React from "react";

interface Props {
  chartData: unknown[];
}

const BarChart = ({ chartData }: Props) => {
  return (
    <div>
      <h3>BarChart Chart</h3>
      <pre>{JSON.stringify(chartData, null, 2)}</pre>
    </div>
  );
};

export default BarChart;
