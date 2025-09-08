"use client";

import { ArrowDownRight, ArrowUpRight, DollarSign, Loader2, MoreHorizontal, Package, RefreshCw, ShoppingCart, TrendingUp, Users } from 'lucide-react';
import { useEffect, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from 'next/link';
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

// Types for API response
interface DashboardData {
    totalSales: number;
    previousMonthSales: number;
    totalOrders: number;
    totalCustomers: number;
    avgOrderValue: number;
    monthlyData: Array<{
        month: string;
        sales: number;
        orders: number;
        customers: number;
    }>;
    yearlyData: Array<{
        year: string;
        sales: number;
        growth: number;
    }>;
    topProducts: Array<{
        name: string;
        sales: number;
        revenue: number;
        growth: number;
    }>;
    recentOrders: Array<{
        id: string;
        customer: string;
        amount: number;
        status: string;
        date: string;
    }>;
    categoryData: Array<{
        name: string;
        value: number;
        color: string;
    }>;
}

export default function DashboardContent() {
    const [data, setData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [chartPeriod, setChartPeriod] = useState("monthly");
    const [refreshing, setRefreshing] = useState(false);

    const fetchDashboardData = async (showRefreshLoader = false) => {
        try {
            if (showRefreshLoader) {
                setRefreshing(true);
            } else {
                setLoading(true);
            }

            const response = await fetch('https://exclusive-mart.vercel.app/api/dashboard', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const apiData = await response.json();
            setData(apiData);
            setError(null);
        } catch (err) {
            console.error('Failed to fetch dashboard data:', err);
            setError(`Failed to load dashboard data: ${err instanceof Error ? err.message : 'Unknown error'}`);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchDashboardData();
    }, []);
    console.log('monthlyData:', data?.monthlyData);
    console.log('yearlyData:', data?.yearlyData);
    const handleRefresh = () => {
        fetchDashboardData(true);
    };

    if (loading && !data) {
        return (
            <div className="p-6 space-y-6">
                <div className="flex items-center justify-center h-64">
                    <div className="flex items-center space-x-2">
                        <Loader2 className="h-6 w-6 animate-spin" />
                        <span>Loading dashboard data...</span>
                    </div>
                </div>
            </div>
        );
    }

    if (error && !data) {
        return (
            <div className="p-6 space-y-6">
                <div className="flex items-center justify-center h-64">
                    <div className="text-center space-y-4">
                        <p className="text-lg font-medium text-red-600">Failed to load dashboard</p>
                        <p className="text-sm text-muted-foreground">{error}</p>
                        <Button onClick={() => fetchDashboardData()} variant="outline">
                            <RefreshCw className="h-4 w-4 mr-2" />
                            Try Again
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    if (!data) {
        return null;
    }

    const salesGrowth = data?.previousMonthSales && data?.previousMonthSales > 0
        ? (((data?.totalSales ?? 0) - (data?.previousMonthSales ?? 0)) / (data?.previousMonthSales ?? 1) * 100).toFixed(1)
        : "0.0";

    return (
        <div className="p-6 space-y-6">
            {error && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <p className="text-sm text-yellow-800">{error}</p>
                </div>
            )}

            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <div className="flex items-center space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleRefresh}
                        disabled={refreshing}
                    >
                        <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
                        Refresh
                    </Button>

                </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
                        <DollarSign className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${data?.totalSales?.toLocaleString?.() ?? '0'}</div>
                        <div className="flex items-center text-xs text-muted-foreground">
                            {parseFloat(salesGrowth) >= 0 ? (
                                <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
                            ) : (
                                <ArrowDownRight className="h-3 w-3 text-red-500 mr-1" />
                            )}
                            {parseFloat(salesGrowth) >= 0 ? '+' : ''}{salesGrowth}% from last month
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Orders</CardTitle>
                        <ShoppingCart className="h-4 w-4 text-red-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{data?.totalOrders?.toLocaleString?.() ?? '0'}</div>
                        <div className="flex items-center text-xs text-muted-foreground">
                            <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
                            This month
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Customers</CardTitle>
                        <Users className="h-4 w-4 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{data?.totalCustomers?.toLocaleString?.() ?? '0'}</div>
                        <div className="flex items-center text-xs text-muted-foreground">
                            <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
                            Active customers
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Avg. Order Value</CardTitle>
                        <TrendingUp className="h-4 w-4 text-purple-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${data?.avgOrderValue?.toFixed?.(2) ?? '0.00'}</div>
                        <div className="flex items-center text-xs text-muted-foreground">
                            <Package className="h-3 w-3 mr-1" />
                            Per order
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 gap-6">
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle>Sales Overview</CardTitle>
                                <CardDescription>Monthly and yearly sales performance</CardDescription>
                            </div>
                            <Tabs value={chartPeriod} onValueChange={setChartPeriod}>
                                <TabsList>
                                    <TabsTrigger value="monthly">Monthly</TabsTrigger>
                                    <TabsTrigger value="yearly">Yearly</TabsTrigger>
                                </TabsList>
                            </Tabs>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="h-80">
                            {chartPeriod === "monthly" ? (
                                <ChartContainer
                                    config={{
                                        sales: {
                                            label: "Sales ($)",
                                            color: "#e11d48",
                                        },
                                    }}
                                    className="h-full w-full"
                                >
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={data?.monthlyData ?? []}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="month" />
                                            <YAxis />
                                            <ChartTooltip
                                                content={<ChartTooltipContent />}
                                                formatter={(value) => [`$${Number(value)?.toLocaleString()}`, "Sales"]}
                                            />
                                            <Area
                                                type="monotone"
                                                dataKey="sales"
                                                stroke="#e11d48"
                                                fill="#e11d48"
                                                fillOpacity={0.3}
                                            />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </ChartContainer>
                            ) : (
                                <ChartContainer
                                    config={{
                                        sales: {
                                            label: "Sales ($)",
                                            color: "#e11d48",
                                        },
                                    }}
                                    className="h-full w-full"
                                >
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={data?.yearlyData ?? []}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="year" />
                                            <YAxis />
                                            <ChartTooltip
                                                content={<ChartTooltipContent />}
                                                formatter={(value) => [`$${Number(value)?.toLocaleString()}`, "Sales"]}
                                            />
                                            <Bar dataKey="sales" fill="#e11d48" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </ChartContainer>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Additional Charts and Tables */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Sales by Category</CardTitle>
                        <CardDescription>Revenue distribution across categories</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-64">
                            <ChartContainer
                                config={{
                                    value: {
                                        label: "Percentage",
                                    },
                                }}
                                className="h-full w-full"
                            >
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={data.categoryData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={40}
                                            outerRadius={80}
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {data.categoryData?.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <ChartTooltip
                                            content={<ChartTooltipContent />}
                                            formatter={(value) => [`${value}%`, "Share"]}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                            </ChartContainer>
                        </div>
                        <div className="mt-4 space-y-2">
                            {(data?.categoryData?.length ?? 0) > 0 && data?.categoryData?.map((item, index) => (
                                <div key={index} className="flex items-center justify-between text-sm">
                                    <div className="flex items-center">
                                        <div
                                            className="w-3 h-3 rounded-full mr-2"
                                            style={{ backgroundColor: item.color }}
                                        />
                                        {item.name}
                                    </div>
                                    <span className="font-medium">{item.value}%</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card className="lg:col-span-2">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle>Top Products</CardTitle>
                                <CardDescription>Best performing products this month</CardDescription>
                            </div>
                            <Link href={'/admin/products'}>
                                <Button variant="outline" size="sm">View All</Button>
                            </Link>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {(data?.topProducts?.length ?? 0) > 0 && data?.topProducts?.map((product, index) => (
                                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                                    <div className="flex-1">
                                        <h4 className="font-medium">{product.name}</h4>
                                        <p className="text-sm text-muted-foreground">
                                            {product.sales?.toLocaleString?.() ?? '0'} units sold • ${product.revenue?.toLocaleString?.() ?? '0'} revenue
                                        </p>
                                    </div>

                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Orders */}
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>Recent Orders</CardTitle>
                            <CardDescription>Latest customer orders and their status</CardDescription>
                        </div>
                        <Link href={'/admin/orders'}>
                            <Button variant="outline" size="sm">View All Orders</Button>
                        </Link>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Order ID</TableHead>
                                <TableHead>Customer</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {(data?.recentOrders?.length ?? 0) > 0 && data?.recentOrders?.map((order) => (
                                <TableRow key={order.id}>
                                    <TableCell className="font-medium">{order.id ?? ''}</TableCell>
                                    <TableCell>{order.customer ?? ''}</TableCell>
                                    <TableCell>${order.amount?.toFixed?.(2) ?? '0.00'}</TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={
                                                order.status === "completed" ? "default" :
                                                    order.status === "processing" ? "secondary" :
                                                        order.status === "shipped" ? "outline" : "destructive"
                                            }
                                        >
                                            {order.status ?? ''}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{order.date ?? ''}</TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="sm">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem>View Order</DropdownMenuItem>
                                                <DropdownMenuItem>Update Status</DropdownMenuItem>
                                                <DropdownMenuItem>Send Invoice</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
