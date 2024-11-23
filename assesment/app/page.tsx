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
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
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
        null
    );
    const [modelToggle, setModelToggle] = useState(false);

    const handleStockSelect = (symbol: any) => {
        if (selectedStock === symbol) {
            setSelectedStock(null);
            return;
        }
        setSelectedStock(symbol);
    };
    const calculateYAxisDomain = () => {
        if (!selectedStock || data.timeSeriesData[selectedStock].length === 0) {
            return ["auto", "auto"];
        }
        const prices = data.timeSeriesData[selectedStock].map(
            (d: any) => d.price
        );
        const minPrice = Math.min(...prices);
        const maxPrice = Math.max(...prices);
        const range = maxPrice - minPrice;

        // 5% buffer
        const buffer = range * 0.05;

        const bufferedMin = minPrice - buffer;
        const bufferedMax = maxPrice + buffer;

        const finalMin = bufferedMin < 0 ? 0 : bufferedMin;
        const finalMax = bufferedMax;

        return [finalMin, finalMax];
    };

    return (
        <div className="flex flex-col">
            <div className="flex flex-row gap-3 justify-center py-6">
                <div className="px-1 py-1 rounded-xl border-[1px] border-color-white ">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost">
                                <div className="text-md font-semibold">
                                    Model
                                </div>
                                <ChevronDown />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            {data.models.map((model) => (
                                <DropdownMenuItem key={model.id}>
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
                    <div className="lg:px-64  sm:px-16 p-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>{selectedStock}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ChartContainer config={chartConfig}>
                                    <AreaChart
                                        accessibilityLayer
                                        data={
                                            data.timeSeriesData[selectedStock]
                                        }
                                        margin={{
                                            left: 12,
                                            right: 12,
                                            bottom: 12,
                                        }}
                                    >
                                        <CartesianGrid vertical={false} />
                                        <XAxis
                                            dataKey="date"
                                            tickLine={false}
                                            axisLine={false}
                                            tickMargin={8}
                                            tickFormatter={(value) =>
                                                format(parseISO(value), "MMM d")
                                            } // "Jul 1"
                                        />
                                        <YAxis
                                            dataKey="price"
                                            tickLine={false}
                                            axisLine={false}
                                            tickMargin={2}
                                            orientation="right"
                                            domain={calculateYAxisDomain()}
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
                                            content={<ChartTooltipContent />}
                                        />
                                        <defs>
                                            <linearGradient
                                                id="fillDesktop"
                                                x1="0"
                                                y1="0"
                                                x2="0"
                                                y2="1"
                                            >
                                                <stop
                                                    offset="0%"
                                                    stopColor="var(--color-desktop)"
                                                    stopOpacity={0.1}
                                                />
                                                <stop
                                                    offset="100%"
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
                                </ChartContainer>
                            </CardContent>
                            <CardFooter className="flex-col items-start gap-2 text-sm">
                                <div className="flex gap-2 font-medium leading-none">
                                    Trending up by 5.2% this month{" "}
                                    <TrendingUp className="h-4 w-4" />
                                </div>
                                <div className="leading-none text-muted-foreground">
                                    Showing total visitors for the last 6 months
                                </div>
                            </CardFooter>
                        </Card>
                    </div>
                </>
            )}
        </div>
    );
}
