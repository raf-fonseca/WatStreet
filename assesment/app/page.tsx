"use client";
import { format, parseISO } from "date-fns";
import { useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    XAxis,
    YAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { chartConfig, data } from "./constants";

type StockSymbol = keyof typeof data.timeSeriesData; // StockSymbol is a type that can only be apart of timeSeriesData and has a data and price

export default function Home() {
    const [selectedStock, setSelectedStock] = useState<StockSymbol | null>(
        "AAPL"
    );
    const [selectedModel, setSelectedModel] = useState<string | null>(null);

    const handleStockSelect = (symbol: any) => {
        setSelectedStock(symbol);
    };

    const handleModelSelected = (model: any) => {
        setSelectedModel(model);
    };

    return (
        <div className="flex flex-col items-center">
            <div className="w-full max-w-4xl flex justify-between items-center py-6 px-4">
                <Link href="https://watstreet.netlify.app/">
                    <Image
                        src="/logo.jpeg"
                        width={100}
                        height={100}
                        alt="Wat street logo"
                        className="hover:cursor-pointer"
                    />
                </Link>
                <div className="flex px-1 py-1 rounded-xl border-[1px] border-color-white ">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="">
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
                                    key={stock.symbol}
                                    onClick={() =>
                                        handleStockSelect(
                                            stock.symbol as StockSymbol
                                        )
                                    }
                                >
                                    {stock.symbol}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            {selectedStock && (
                <div className="w-full max-w-4xl flex justify-center px-4">
                    <Card className="w-full">
                        <CardHeader>
                            <CardTitle>{selectedStock}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ChartContainer config={chartConfig}>
                                <ResponsiveContainer width="100%" height={400}>
                                    <AreaChart
                                        accessibilityLayer
                                        data={
                                            data.timeSeriesData[selectedStock]
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
                                                format(parseISO(value), "MMM d")
                                            }
                                        />
                                        <YAxis
                                            dataKey="price"
                                            tickLine={false}
                                            axisLine={false}
                                            tickMargin={8}
                                            orientation="right"
                                            domain={[
                                                (min: any) => min - min * 0.05,
                                                (max: any) => max + max * 0.05,
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
                                            content={<ChartTooltipContent />}
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
            )}
        </div>
    );
}
