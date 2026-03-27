import type { BarChartProps } from "./types";
import styles from "./BarChart.module.css";

const BarChart = ({ data, headerText, hideHeader = false }: BarChartProps) => {
  return (
    <div className={styles.container}>
      {!hideHeader && headerText && <h3 className={styles.title}>{headerText}</h3>}
      <pre className={styles.dataPreview}>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default BarChart;
