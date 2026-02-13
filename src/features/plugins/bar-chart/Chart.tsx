import React from "react";

interface Props {
  chartData: any[];
  color: string;
}

const BarChartChart = ({ chartData, color }: Props) => {
  return (
    <div>
      <h3>BarChart Chart</h3>
      <pre>{JSON.stringify(chartData, null, 2)}</pre>
    </div>
  );
};

export default BarChartChart;
