"use client";

import { useMemo } from "react";
import { useFinanceStore } from "@/store/useFinanceStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { TrendingDown, TrendingUp, Wallet, PieChart as PieChartIcon } from "lucide-react";

const COLORS = ['#8b5cf6', '#c4b5fd', '#38bdf8', '#f472b6', '#facc15', '#2dd4bf'];

export default function AnalyticsPage() {
    const { transactions, getTotalIncome, getTotalExpense } = useFinanceStore();

    const summaryData = [
        { name: "This Month", Income: getTotalIncome(), Expense: getTotalExpense() }
    ];

    const categoryData = useMemo(() => {
        const expenses = transactions.filter(t => t.type === 'EXPENSE');
        const grouped = expenses.reduce((acc, tx) => {
            acc[tx.category] = (acc[tx.category] || 0) + tx.amount;
            return acc;
        }, {} as Record<string, number>);
        
        return Object.entries(grouped)
            .map(([name, value]) => ({ name, value }))
            .sort((a, b) => b.value - a.value); // Sort highest expense first
    }, [transactions]);

    const walletData = useMemo(() => {
        const expenses = transactions.filter(t => t.type === 'EXPENSE');
        const grouped = expenses.reduce((acc, tx) => {
            acc[tx.method] = (acc[tx.method] || 0) + tx.amount;
            return acc;
        }, {} as Record<string, number>);
        
        return Object.entries(grouped).map(([name, value]) => ({ name, value }));
    }, [transactions]);

    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">
            <div className="mb-8">
                <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Analytics & Reports</h2>
                <p className="text-slate-500 text-sm mt-1">Deep dive into your spending habits and cash flow.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card className="rounded-3xl border-none shadow-sm bg-linear-to-br from-green-50 to-emerald-100 dark:from-green-500/10 dark:to-emerald-500/10">
                    <CardContent className="p-6 flex items-center justify-between">
                        <div>
                            <p className="text-sm font-semibold text-green-600 dark:text-green-500 uppercase tracking-wider mb-1">Total Income</p>
                            <h3 className="text-3xl font-bold text-slate-900 dark:text-white">${getTotalIncome().toLocaleString()}</h3>
                        </div>
                        <div className="h-12 w-12 bg-green-200 dark:bg-green-500/20 rounded-full flex items-center justify-center">
                            <TrendingUp className="text-green-600 dark:text-green-400" size={24} />
                        </div>
                    </CardContent>
                </Card>
                <Card className="rounded-3xl border-none shadow-sm bg-linear-to-br from-red-50 to-rose-100 dark:from-red-500/10 dark:to-rose-500/10">
                    <CardContent className="p-6 flex items-center justify-between">
                        <div>
                            <p className="text-sm font-semibold text-red-600 dark:text-red-500 uppercase tracking-wider mb-1">Total Expenses</p>
                            <h3 className="text-3xl font-bold text-slate-900 dark:text-white">${getTotalExpense().toLocaleString()}</h3>
                        </div>
                        <div className="h-12 w-12 bg-red-200 dark:bg-red-500/20 rounded-full flex items-center justify-center">
                            <TrendingDown className="text-red-600 dark:text-red-400" size={24} />
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
                
                <Card className="rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-none bg-white dark:bg-slate-900/50">
                    <CardHeader className="flex flex-row items-center gap-2">
                        <Wallet className="text-indigo-500" size={20} />
                        <CardTitle className="text-lg">Cash Flow</CardTitle>
                    </CardHeader>
                    <CardContent className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={summaryData} barGap={12}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8' }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8' }} dx={-10} />
                                <Tooltip cursor={{fill: 'transparent'}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
                                <Bar dataKey="Income" fill="#22c55e" radius={[6, 6, 0, 0]} barSize={40} />
                                <Bar dataKey="Expense" fill="#ef4444" radius={[6, 6, 0, 0]} barSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card className="rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-none bg-white dark:bg-slate-900/50">
                    <CardHeader className="flex flex-row items-center gap-2">
                        <PieChartIcon className="text-indigo-500" size={20} />
                        <CardTitle className="text-lg">Expenses by Category</CardTitle>
                    </CardHeader>
                    <CardContent className="h-80 flex flex-col items-center justify-center">
                        {categoryData.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie data={categoryData} innerRadius={80} outerRadius={110} paddingAngle={5} dataKey="value" stroke="none">
                                        {categoryData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} formatter={(value) => `$${value}`} />
                                    <Legend verticalAlign="bottom" height={36} iconType="circle" />
                                </PieChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="text-slate-500 text-sm flex h-full items-center">No expenses recorded yet.</div>
                        )}
                    </CardContent>
                </Card>

            </div>
        </div>
    );
}