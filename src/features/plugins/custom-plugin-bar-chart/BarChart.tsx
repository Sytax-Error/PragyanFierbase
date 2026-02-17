import React from "react";

interface Props {
  chartData: unknown[];
  color: string;
  barThickness: number;
}

const BarChart = ({ chartData, color, barThickness }: Props) => {
  return (
    <div>
      <h3>BarChart Chart</h3>
      <p>Color: {color}</p>
      <p>Bar Thickness: {barThickness}</p>
      <pre>{JSON.stringify(chartData, null, 2)}</pre>
    </div>
  );
};

export default BarChart;
