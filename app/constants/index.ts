import { ChartConfig } from "@/components/ui/chart";

export const data = {
    models: [
        { id: 1, name: "Model A" },
        { id: 2, name: "Model B" },
        { id: 3, name: "Model C" },
    ],
    stocks: [
        { symbol: "AAPL", name: "Apple Inc." },
        { symbol: "GOOGL", name: "Alphabet Inc." },
        { symbol: "MSFT", name: "Microsoft Corp." },
    ],
    timeSeriesData: {
        AAPL: [
            { date: "2024-07-01", price: 150 },
            { date: "2024-07-02", price: 152 },
            { date: "2024-07-03", price: 148 },
            { date: "2024-07-04", price: 153 },
        ],
        GOOGL: [
            { date: "2024-07-01", price: 2800 },
            { date: "2024-07-02", price: 2820 },
            { date: "2024-07-03", price: 2790 },
            { date: "2024-07-04", price: 2830 },
        ],
        MSFT: [
            { date: "2024-07-01", price: 300 },
            { date: "2024-07-02", price: 305 },
            { date: "2024-07-03", price: 302 },
            { date: "2024-07-04", price: 310 },
        ],
    },
};

export const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "#c28b02",
    },
    mobile: {
        label: "Mobile",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig;
