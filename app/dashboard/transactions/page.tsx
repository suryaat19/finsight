"use client";

import { useState } from "react";
import { useFinanceStore } from "@/store/useFinanceStore";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Search, Video, ShoppingCart, Coffee, CreditCard, Briefcase } from "lucide-react";

const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
        case 'subscription': return { icon: Video, color: "text-red-500", bg: "bg-red-100 dark:bg-red-500/20" };
        case 'shopping': return { icon: ShoppingCart, color: "text-slate-500", bg: "bg-slate-100 dark:bg-slate-500/20" };
        case 'cafe & restaurants': case 'food': return { icon: Coffee, color: "text-pink-500", bg: "bg-pink-100 dark:bg-pink-500/20" };
        case 'income': case 'salary': return { icon: Briefcase, color: "text-green-500", bg: "bg-green-100 dark:bg-green-500/20" };
        default: return { icon: CreditCard, color: "text-indigo-500", bg: "bg-indigo-100 dark:bg-indigo-500/20" };
    }
};

export default function TransactionsPage() {
    const { transactions } = useFinanceStore();
    const [search, setSearch] = useState("");

    const filtered = transactions.filter(t => 
        t.name.toLowerCase().includes(search.toLowerCase()) || 
        t.category.toLowerCase().includes(search.toLowerCase()) ||
        t.method.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">
            
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Transaction History</h2>
                    <p className="text-slate-500 text-sm mt-1">Review and search all your past financial activity.</p>
                </div>
                <div className="relative w-full sm:w-72">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input 
                        placeholder="Search by name, category..." 
                        value={search} 
                        onChange={(e) => setSearch(e.target.value)} 
                        className="pl-10 rounded-full bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm" 
                    />
                </div>
            </div>

            <Card className="rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-none bg-white dark:bg-slate-900/50 overflow-hidden">
                <CardContent className="p-0">
                    <Table>
                        <TableHeader className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                            <TableRow className="hover:bg-transparent">
                                <TableHead className="py-4 pl-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Date</TableHead>
                                <TableHead className="py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Details</TableHead>
                                <TableHead className="py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Payment Method</TableHead>
                                <TableHead className="py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Type</TableHead>
                                <TableHead className="py-4 pr-6 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Amount</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filtered.length > 0 ? (
                                filtered.map(tx => {
                                    const { icon: Icon, color, bg } = getCategoryIcon(tx.category);
                                    return (
                                        <TableRow key={tx.id} className="border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50/80 dark:hover:bg-slate-800/80 transition-colors">
                                            <TableCell className="pl-6 font-medium text-sm text-slate-500 whitespace-nowrap">{tx.date}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center py-2">
                                                    <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center mr-4 shadow-sm`}><Icon className={`h-5 w-5 ${color}`} /></div>
                                                    <div>
                                                        <p className="font-bold text-sm text-slate-900 dark:text-white">{tx.name}</p>
                                                        <p className="text-xs text-slate-500 mt-0.5">{tx.category}</p>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <span className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300">
                                                    {tx.method}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${tx.type === 'INCOME' ? 'bg-green-50 border-green-200 text-green-600 dark:bg-green-500/10 dark:border-green-500/20 dark:text-green-400' : 'bg-slate-50 border-slate-200 text-slate-600 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400'}`}>
                                                    {tx.type}
                                                </span>
                                            </TableCell>
                                            <TableCell className={`pr-6 text-right font-bold text-base ${tx.type === 'EXPENSE' ? 'text-slate-900 dark:text-white' : 'text-green-500'}`}>
                                                {tx.type === 'EXPENSE' ? '-' : '+'}${tx.amount.toLocaleString()}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} className="h-48 text-center text-slate-500">
                                        No transactions found matching "{search}"
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}