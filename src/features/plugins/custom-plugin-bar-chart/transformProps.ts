export const transformProps = (data: unknown[], config: { color: string }) => {
  return {
    chartData: data,
    color: config.color,
  };
};
