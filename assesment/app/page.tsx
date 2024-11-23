// 2 dropdowns 1 model and another stocks. Based on what stock you pick, update the chart of prices.
"use client";
import { format, parseISO } from "date-fns";
import { useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TrendingUp } from "lucide-react";
import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    XAxis,
    YAxis,
} from "recharts";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "#c28b02",
    },
    mobile: {
        label: "Mobile",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig;

import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

const data = {
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

type StockSymbol = keyof typeof data.timeSeriesData; // StockSymbol is a type that can only be apart of timeSeriesData and has a data and price

export default function Home() {
    const [stockToggle, setStockToggle] = useState(false);
    const [selectedStock, setSelectedStock] = useState<StockSymbol | null>(
        "AAPL"
    );
    const [modelToggle, setModelToggle] = useState(false);
    const [selectedModel, setSelectedModel] = useState<string | null>(null); // State for selected model

    const handleStockSelect = (symbol: any) => {
        setSelectedStock(symbol);
    };

    const handleModelSelected = (model: any) => {
        setSelectedModel(model);
    };

    return (
        <div className="flex flex-col">
            <div className="flex flex-row gap-3 justify-center py-6">
                <div className="px-1 py-1 rounded-xl border-[1px] border-color-white ">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost">
                                <div className="text-md font-semibold">
                                    {selectedModel || "Model"}
                                </div>
                                <ChevronDown />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            {data.models.map((model) => (
                                <DropdownMenuItem
                                    key={model.id}
                                    onClick={() =>
                                        handleModelSelected(model.name)
                                    }
                                >
                                    {model.name}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost">
                                <div className="text-md font-semibold">
                                    Stock
                                </div>
                                <ChevronDown />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            {data.stocks.map((stock) => (
                                <DropdownMenuItem
                                    onClick={() =>
                                        handleStockSelect(
                                            stock.symbol as StockSymbol
                                        )
                                    }
                                    key={stock.symbol}
                                >
                                    {stock.symbol}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            {selectedStock && (
                <>
                    <div className="flex justify-center md:px-12 sm:px-8 px-4">
                        <Card className="w-full max-w-4xl">
                            <CardHeader>
                                <CardTitle>{selectedStock}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ChartContainer config={chartConfig}>
                                    <ResponsiveContainer
                                        width="100%"
                                        height={400}
                                    >
                                        <AreaChart
                                            accessibilityLayer
                                            data={
                                                data.timeSeriesData[
                                                    selectedStock
                                                ]
                                            }
                                            margin={{
                                                top: 20,
                                                bottom: 20,
                                                left: 20,
                                                right: 20,
                                            }}
                                        >
                                            <CartesianGrid vertical={false} />
                                            <XAxis
                                                dataKey="date"
                                                tickLine={false}
                                                axisLine={false}
                                                tickMargin={2}
                                                tickFormatter={(value) =>
                                                    format(
                                                        parseISO(value),
                                                        "MMM d"
                                                    )
                                                }
                                            />
                                            <YAxis
                                                dataKey="price"
                                                tickLine={false}
                                                axisLine={false}
                                                tickMargin={8}
                                                orientation="right"
                                                domain={[
                                                    (min: any) =>
                                                        min - min * 0.05,
                                                    (max: any) =>
                                                        max + max * 0.05,
                                                ]}
                                                scale="linear"
                                                tickFormatter={(value) =>
                                                    selectedStock === "GOOGL"
                                                        ? `$${(
                                                              value / 1000
                                                          ).toFixed(1)}k`
                                                        : `$${value}`
                                                }
                                            />
                                            <ChartTooltip
                                                cursor={false}
                                                content={
                                                    <ChartTooltipContent />
                                                }
                                            />
                                            <defs>
                                                <linearGradient
                                                    id="fillDesktop"
                                                    x1="0"
                                                    y1="0"
                                                    x2="0"
                                                    y2="0.5"
                                                >
                                                    <stop
                                                        offset="0%"
                                                        stopColor="var(--color-desktop)"
                                                        stopOpacity={0.5}
                                                    />
                                                    <stop
                                                        offset="10%"
                                                        stopColor="var(--color-desktop)"
                                                        stopOpacity={0.05}
                                                    />
                                                </linearGradient>
                                            </defs>
                                            <Area
                                                dataKey="price"
                                                type="natural"
                                                fill="url(#fillDesktop)"
                                                fillOpacity={0.6}
                                                stroke="var(--color-desktop)"
                                                strokeWidth={2}
                                                stackId="a"
                                            />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </ChartContainer>
                            </CardContent>
                        </Card>
                    </div>
                </>
            )}
        </div>
    );
}
