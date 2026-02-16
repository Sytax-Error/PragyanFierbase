export const transformProps = (data: Record<string, unknown>[], config: Record<string, unknown>) => {
  return {
    chartData: data,
    color: config.color,
  };
};
