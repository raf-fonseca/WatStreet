// 2 dropdowns 1 model and another stocks. Based on what stock you pick, update the chart of prices.
"use client";
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
        color: "hsl(var(--chart-1))",
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
            { date: "1", price: 150 },
            { date: "101", price: 152 },
            { date: "2024", price: 148 },
            { date: "2025", price: 153 },
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
                    {data.timeSeriesData[selectedStock].map(
                        (entry: any, index: any) => (
                            <div key={index} className="flex flex-row gap-3">
                                <div className="">{entry.date}</div>
                                <div className="">${entry.price}</div>
                            </div>
                        )
                    )}
                    <div className="w-[60%]">
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
                                        }}
                                    >
                                        <CartesianGrid vertical={false} />
                                        <XAxis
                                            dataKey="date"
                                            tickLine={false}
                                            axisLine={false}
                                            tickMargin={8}
                                            tickFormatter={(value) =>
                                                value.slice(0, 3)
                                            }
                                        />
                                        <YAxis
                                            dataKey="price"
                                            tickLine={false}
                                            axisLine={false}
                                            tickMargin={2}
                                            orientation="right"
                                            domain={["dataMin", "dataMax"]}

                                            // tickFormatter={(value) =>
                                            //     value.slice(0, 3)
                                            // }
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
                                                    offset="95%"
                                                    stopColor="var(--color-desktop)"
                                                    stopOpacity={0.8}
                                                />
                                                <stop
                                                    offset="5%"
                                                    stopColor="var(--color-desktop)"
                                                    stopOpacity={0.1}
                                                />
                                            </linearGradient>
                                        </defs>
                                        <Area
                                            dataKey="price"
                                            type="natural"
                                            fill="url(#fillDesktop)"
                                            fillOpacity={0.3}
                                            stroke="var(--color-desktop)"
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
