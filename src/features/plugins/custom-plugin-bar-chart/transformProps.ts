type DataRecord = Record<string, unknown>;

interface TransformPropsOptions {
  dataset: DataRecord[];
  controls: {
    dimension: string;
    measure: string;
    color: string;
    barThickness: number;
  };
}

export const transformProps = (options: TransformPropsOptions) => {
  const { dataset, controls } = options;
  const { dimension, measure, color, barThickness } = controls;

  // Check if the necessary controls are provided
  if (!dimension || !measure) {
    // Return a default or empty state if the required data columns are not selected
    console.warn("Dimension or measure not selected.");
    return {
      data: [],
      width: 730,
      height: 250,
      // You can add other default chart properties here
    };
  }

  console.log('Transforming data with controls:', controls);
  console.log('Using dataset:', dataset);

  const transformedData = dataset.map(row => ({
    name: row[dimension],
    value: row[measure],
  }));

  console.log('Transformed data:', transformedData);

  return {
    data: transformedData,
    width: 730, 
    height: 250,
    bar: {
      dataKey: 'value',
      fill: color,
      barSize: barThickness,
    },
    xAxis: {
      dataKey: 'name',
    },
    yAxis: {},
    tooltip: {},
    legend: {},
  };
};
