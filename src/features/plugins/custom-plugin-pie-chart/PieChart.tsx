import React from "react";

interface Props {
  chartData: any[];
  color: string;
}

const PieChart = ({ chartData, color }: Props) => {
  return (
    <div>
      <h3>Pie Chart</h3>
      <pre>{JSON.stringify(chartData, null, 2)}</pre>
    </div>
  );
};

export default PieChart;
