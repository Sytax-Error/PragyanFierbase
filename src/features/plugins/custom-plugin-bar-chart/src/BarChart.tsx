import type { BarChartProps } from "./types";

const BarChart = ({ data,headerText }: BarChartProps) => {
  return (
    <div>
      <h3>{headerText}</h3>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default BarChart;
