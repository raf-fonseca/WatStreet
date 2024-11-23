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
    return (
        <div className="flex flex-col">
            <div className="flex flex-row gap-3 justify-center py-4">
                <DropdownMenu>
                    <DropdownMenuTrigger>Select Model</DropdownMenuTrigger>
                    <DropdownMenuContent>
                        {data.models.map((model) => (
                            <DropdownMenuLabel key={model.id}>
                                {model.name}
                            </DropdownMenuLabel>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                    <DropdownMenuTrigger>Stocks</DropdownMenuTrigger>
                    <DropdownMenuContent>
                        {data.stocks.map((stock) => (
                            <DropdownMenuLabel
                                onClick={() =>
                                    handleStockSelect(
                                        stock.symbol as StockSymbol
                                    )
                                }
                                key={stock.symbol}
                            >
                                {stock.symbol}
                            </DropdownMenuLabel>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
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
                </>
            )}
        </div>
    );
}
