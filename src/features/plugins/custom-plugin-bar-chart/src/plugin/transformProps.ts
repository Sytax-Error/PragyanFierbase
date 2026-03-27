import type { BarChartProps, TransformPropsOptions } from "../types";

export const transformProps = (options: TransformPropsOptions): BarChartProps => {
    const { dataset, controls } = options;
    const { dimension, measure, headerText, hideHeader } = controls;
    const data = dataset.map((record) => {
        return {
            name: record[dimension] as string,
            value: record[measure],
        }
    })
    return {
        data,
        headerText,
        hideHeader,
    }
}