"use client";
import Image from 'next/image';
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    { name: 'Jan', income: 4000, expense: 2400 },
    { name: 'Feb', income: 3000, expense: 1398 },
    { name: 'Mar', income: 2000, expense: 9800 },
    { name: 'Apr', income: 2780, expense: 3908 },
    { name: 'May', income: 1890, expense: 4800 },
    { name: 'Jun', income: 2390, expense: 3800 },
    { name: 'Jul', income: 3490, expense: 4300 },
    { name: 'Aug', income: 3490, expense: 4300 },
    { name: 'Sep', income: 3490, expense: 4300 },
    { name: 'Oct', income: 3490, expense: 4300 },
    { name: 'Nov', income: 3490, expense: 4300 },
    { name: 'Dec', income: 3490, expense: 4300 },
];

const FinanceChart = () => {
    return (
        <div className="bg-white rounded-lg p-4 h-[500px]"> {/* Set a fixed height */}
            {/* Header */}
            <div className="flex justify-between items-center">
                <h1 className="text-lg font-semibold">Finance</h1>
                <Image
                    src='/moreDark.png'
                    alt="More options"
                    width={20}
                    height={20}
                    priority
                />
            </div>

            {/* Chart */}
            <div className=" w-full h-full"> 
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        {/* Grid lines */}
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#DDD" />

                        {/* X-Axis */}
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tick={{ fill: "#6B7280" }}
                            tickLine={false}
                        />

                        {/* Y-Axis */}
                        <YAxis
                            axisLine={false}
                            tick={{ fill: "#6B7280" }}
                            tickLine={false}
                        />

                        {/* Tooltip */}
                        <Tooltip
                            contentStyle={{
                                borderRadius: "8px",
                                border: "1px solid #E5E7EB",
                                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                                backgroundColor: "#FFF",
                            }}
                        />
                        {/* Legend */}
                        <Legend
                            align="left"
                            verticalAlign="top"
                            wrapperStyle={{ paddingTop: "10px", paddingBottom: "20px" }}
                            iconType="circle"
                            iconSize={10}
                        />
                        <Line type="monotone" dataKey="expense" stroke="#C3EBFA" strokeWidth={5} />
                        <Line type="monotone" dataKey="income" stroke="#FAE27C" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default FinanceChart;