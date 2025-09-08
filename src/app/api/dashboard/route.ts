
import dbConnect from '@/lib/dbConnect';
import OrderModel from '@/models/Order';
import { NextResponse } from 'next/server';

const MONTHS = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

const CATEGORY_COLORS = [
    '#3b82f6', '#f59e0b', '#10b981', '#8b5cf6', '#ef4444', '#14b8a6',
];

export async function GET() {
    try {
        dbConnect();
        const orders = await OrderModel.find({});

        const totalSales = orders.reduce((sum, o) => sum + (o.paidAmount ?? 0), 0);
        const totalOrders = orders.length;
        const totalCustomers = new Set(orders.map(o => o.email)).size;
        const avgOrderValue = totalSales / (totalOrders || 1);

        // Monthly data
        const monthlyMap = Array(12).fill(null).map((_, idx) => ({
            month: MONTHS[idx],
            sales: 0,
            orders: 0,
            customers: new Set<string>(),
        }));

        orders.forEach(order => {
            const date = new Date(order.createdAt);
            const monthIndex = date.getMonth();
            monthlyMap[monthIndex].sales += order.paidAmount ?? 0;
            monthlyMap[monthIndex].orders += 1;
            monthlyMap[monthIndex].customers.add(order.email);
        });

        const monthlyData = monthlyMap.map(entry => ({
            month: entry.month,
            sales: entry.sales,
            orders: entry.orders,
            customers: entry.customers.size,
        }));

        // Yearly data + growth
        const yearlySales: { [year: string]: number; } = {};
        orders.forEach(order => {
            const year = new Date(order.createdAt).getFullYear();
            yearlySales[year] = (yearlySales[year] || 0) + (order.paidAmount ?? 0);
        });

        const sortedYears = Object.keys(yearlySales).sort((a, b) => Number(a) - Number(b));
        const yearlyData = sortedYears.map((year, i) => {
            const sales = yearlySales[year];
            // Use previous year if available, otherwise use sales for growth calculation
            const prevYear = sortedYears[i - 1];
            const prev = prevYear !== undefined ? yearlySales[prevYear] : sales;
            const growth = prev !== 0 ? ((sales - prev) / prev) * 100 : 0;
            return { year, sales, growth: +growth.toFixed(1) };
        });

        const previousMonthIndex = new Date().getMonth() - 1;
        const previousMonthSales = previousMonthIndex >= 0 ? monthlyMap[previousMonthIndex].sales : 0;

        // Top products
        const productMap = new Map();
        orders.forEach(order => {
            order.products.forEach(product => {
                const key = product.name;
                if (!productMap.has(key)) {
                    productMap.set(key, { name: key, sales: 0, revenue: 0 });
                }
                const item = productMap.get(key);
                if (item) {
                    item.sales += product.cartQuantity ?? 0;
                    item.revenue += (product.cartQuantity ?? 0) * (product.price ?? 0);
                }
            });
        });

        const topProducts = Array.from(productMap.values())
            .sort((a, b) => b.sales - a.sales)
            .slice(0, 5);

        // Category sales
        const categoryMap = new Map();
        orders.forEach(order => {
            order.products.forEach(product => {
                const cat = product.type || 'Other';
                const revenue = (product.cartQuantity ?? 0) * (product.price ?? 0);
                categoryMap.set(cat, (categoryMap.get(cat) || 0) + revenue);
            });
        });

        const categoryData = Array.from(categoryMap.entries()).map(([name, value], i) => ({
            name,
            value,
            color: CATEGORY_COLORS[i % CATEGORY_COLORS.length],
        }));

        // Recent orders
        const recentOrders = orders
            .sort((a, b) => {
                const aDate = a.createdAt instanceof Date ? a.createdAt.getTime() : new Date(a.createdAt).getTime();
                const bDate = b.createdAt instanceof Date ? b.createdAt.getTime() : new Date(b.createdAt).getTime();
                return bDate - aDate;
            })
            .slice(0, 5)
            .map(o => ({
                id: o.orderId,
                customer: o.name,
                amount: o.paidAmount,
                status: o.status,
                date: new Date(o.createdAt).toISOString().split('T')[0],
            }));

        return NextResponse.json({
            totalSales,
            previousMonthSales,
            totalOrders,
            totalCustomers,
            avgOrderValue,
            monthlyData,
            yearlyData,
            topProducts,
            categoryData,
            recentOrders,
        });

    } catch (err) {
        console.error('[Dashboard API]', err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
