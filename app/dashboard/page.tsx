"use client";

import { useEffect, useState } from "react";
import { useFinanceStore, TransactionType, WalletType } from "@/store/useFinanceStore";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
//import { Label } from "@/components/ui/label";

import {
    ArrowUpRight, ArrowDownRight, Plus, Calendar, Target,
    Video, ShoppingCart, Coffee, CreditCard, Briefcase, Smartphone, Banknote,
    TrendingUp, TrendingDown, Wallet as WalletIcon
} from "lucide-react";

const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
        case 'subscription': return { icon: Video, color: "text-red-500", bg: "bg-red-100 dark:bg-red-500/20" };
        case 'shopping': return { icon: ShoppingCart, color: "text-slate-500", bg: "bg-slate-100 dark:bg-slate-500/20" };
        case 'cafe & restaurants': case 'food': return { icon: Coffee, color: "text-pink-500", bg: "bg-pink-100 dark:bg-pink-500/20" };
        case 'income': case 'salary': return { icon: Briefcase, color: "text-green-500", bg: "bg-green-100 dark:bg-green-500/20" };
        default: return { icon: CreditCard, color: "text-indigo-500", bg: "bg-indigo-100 dark:bg-indigo-500/20" };
    }
};

export default function DashboardPage() {
    const { transactions, wallets, goals, getTotalIncome, getTotalExpense, getBalance, addTransaction, addWallet, addGoal, addMoneyToGoal } = useFinanceStore();

    const [txOpen, setTxOpen] = useState(false);
    const [walletOpen, setWalletOpen] = useState(false);
    const [goalOpen, setGoalOpen] = useState(false);
    const [fundOpen, setFundOpen] = useState<string | null>(null);

    const [newTx, setNewTx] = useState({ name: "", amount: "", category: "", type: "EXPENSE" as TransactionType, walletId: "w1" });
    const [newWallet, setNewWallet] = useState({ name: "", type: "CARD" as WalletType, balance: "", accountNumber: "" });
    const [newGoal, setNewGoal] = useState({ name: "", targetAmount: "" });
    const [fundAmount, setFundAmount] = useState("");


    const [userName, setUserName] = useState("Guest");

    useEffect(() => {
        const currentUser = JSON.parse(sessionStorage.getItem("currentUser") || "{}");
        if (currentUser.firstName) {
            setUserName(`${currentUser.firstName} ${currentUser.lastName}`);
        }
    }, []);

    const handleAddTx = (e: React.FormEvent) => {
        e.preventDefault();
        const dateObj = new Date();
        const formattedDate = `${dateObj.getDate()} ${dateObj.toLocaleString('default', { month: 'short' })} ${dateObj.getHours()}:${String(dateObj.getMinutes()).padStart(2, '0')}`;
        const selectedWallet = wallets.find(w => w.id === newTx.walletId);
        addTransaction({ date: formattedDate, amount: Number(newTx.amount), name: newTx.name, method: selectedWallet?.name || "Unknown", category: newTx.category || "General", type: newTx.type, walletId: newTx.walletId });
        setTxOpen(false); setNewTx({ name: "", amount: "", category: "", type: "EXPENSE", walletId: "w1" });
    };

    const handleAddWallet = (e: React.FormEvent) => {
        e.preventDefault();
        addWallet({ name: newWallet.name, type: newWallet.type, balance: Number(newWallet.balance), accountNumber: newWallet.accountNumber, colorFrom: "from-blue-500", colorTo: "to-indigo-600" });
        setWalletOpen(false); setNewWallet({ name: "", type: "CARD", balance: "", accountNumber: "" });
    };

    const handleAddGoal = (e: React.FormEvent) => {
        e.preventDefault();
        addGoal({ name: newGoal.name, targetAmount: Number(newGoal.targetAmount), currentAmount: 0 });
        setGoalOpen(false); setNewGoal({ name: "", targetAmount: "" });
    };

    const handleFundGoal = (e: React.FormEvent, goalId: string) => {
        e.preventDefault();
        addMoneyToGoal(goalId, Number(fundAmount));
        setFundOpen(null); setFundAmount("");
    };

    return (
        <div className="flex-1 space-y-8 p-4 md:p-8 pt-6 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Welcome back, {userName}!</h2>
                </div>
                <div className="flex items-center space-x-3">
                    <Dialog open={txOpen} onOpenChange={setTxOpen}>
                        <DialogTrigger asChild><Button className="rounded-full bg-indigo-500 hover:bg-indigo-600 text-white shadow-md"><Plus className="mr-2 h-4 w-4" /> Add Transaction</Button></DialogTrigger>
                        <DialogContent>
                            <form onSubmit={handleAddTx}>
                                <DialogHeader><DialogTitle>New Transaction</DialogTitle></DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <Input value={newTx.name} onChange={(e) => setNewTx({ ...newTx, name: e.target.value })} required placeholder="Merchant/Name" />
                                    <Input type="number" value={newTx.amount} onChange={(e) => setNewTx({ ...newTx, amount: e.target.value })} required placeholder="Amount ($)" />
                                    <Input value={newTx.category} onChange={(e) => setNewTx({ ...newTx, category: e.target.value })} required placeholder="Category" />
                                    <Select value={newTx.type} onValueChange={(val: any) => setNewTx({ ...newTx, type: val })}>
                                        <SelectTrigger><SelectValue /></SelectTrigger>
                                        <SelectContent><SelectItem value="EXPENSE">Expense</SelectItem><SelectItem value="INCOME">Income</SelectItem></SelectContent>
                                    </Select>
                                    <Select value={newTx.walletId} onValueChange={(val: any) => setNewTx({ ...newTx, walletId: val })}>
                                        <SelectTrigger><SelectValue /></SelectTrigger>
                                        <SelectContent>{wallets.map(w => <SelectItem key={w.id} value={w.id}>{w.name}</SelectItem>)}</SelectContent>
                                    </Select>
                                </div>
                                <Button type="submit" className="w-full bg-indigo-500 hover:bg-indigo-600 text-white">Save Transaction</Button>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            <div>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-lg">My Cards & Wallets</h3>
                    <Dialog open={walletOpen} onOpenChange={setWalletOpen}>
                        <DialogTrigger asChild><Button variant="ghost" size="sm" className="text-indigo-500"><Plus className="h-4 w-4 mr-1" /> Add Card</Button></DialogTrigger>
                        <DialogContent>
                            <form onSubmit={handleAddWallet}>
                                <DialogHeader><DialogTitle>Add Payment Method</DialogTitle></DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <Input value={newWallet.name} onChange={(e) => setNewWallet({ ...newWallet, name: e.target.value })} required placeholder="Name (e.g. Chase Visa)" />
                                    <Select value={newWallet.type} onValueChange={(val: any) => setNewWallet({ ...newWallet, type: val })}>
                                        <SelectTrigger><SelectValue /></SelectTrigger>
                                        <SelectContent><SelectItem value="CARD">Credit/Debit Card</SelectItem><SelectItem value="UPI">UPI</SelectItem><SelectItem value="CASH">Cash</SelectItem></SelectContent>
                                    </Select>
                                    <Input type="number" value={newWallet.balance} onChange={(e) => setNewWallet({ ...newWallet, balance: e.target.value })} required placeholder="Current Balance" />
                                    <Input value={newWallet.accountNumber} onChange={(e) => setNewWallet({ ...newWallet, accountNumber: e.target.value })} placeholder="Last 4 digits or UPI ID (Optional)" />
                                </div>
                                <Button type="submit" className="w-full bg-indigo-500 hover:bg-indigo-600 text-white">Add Wallet</Button>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                    {wallets.map((w) => (
                        <div key={w.id} className={`p-5 rounded-2xl bg-linear-to-br ${w.colorFrom} ${w.colorTo} text-white shadow-lg relative overflow-hidden transition-transform hover:-translate-y-1`}>
                            <div className="absolute top-[-20%] right-[-10%] w-32 h-32 rounded-full bg-white/10 blur-2xl"></div>
                            <div className="absolute bottom-[-20%] left-[-10%] w-24 h-24 rounded-full bg-white/10 blur-xl"></div>
                            <div className="flex justify-between items-start relative z-10">
                                <div><p className="text-white/70 text-xs font-semibold uppercase tracking-wider">{w.type}</p><h3 className="font-bold text-lg mt-0.5">{w.name}</h3></div>
                                <div className="p-2 bg-white/20 rounded-xl backdrop-blur-md">{w.type === 'CARD' ? <CreditCard size={20} /> : w.type === 'UPI' ? <Smartphone size={20} /> : <Banknote size={20} />}</div>
                            </div>
                            <div className="mt-6 relative z-10">
                                <p className="text-3xl font-bold tracking-tight">${w.balance.toLocaleString()}</p>
                                {w.accountNumber && <p className="text-white/70 text-sm font-mono mt-1 opacity-80">{w.accountNumber}</p>}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                <Card className="rounded-3xl border-none shadow-[0_8px_30px_rgb(0,0,0,0.06)] bg-linear-to-br from-indigo-600 to-purple-700 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
                    <CardHeader className="pb-2 relative z-10">
                        <div className="flex justify-between items-center">
                            <CardTitle className="text-sm font-medium text-white/80 uppercase tracking-wider">Total balance</CardTitle>
                            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm"><WalletIcon size={18} className="text-white" /></div>
                        </div>
                    </CardHeader>
                    <CardContent className="relative z-10">
                        <div className="text-4xl font-bold mb-1">${getBalance().toLocaleString()}</div>
                        <p className="text-white/70 text-xs mt-2">Across all wallets</p>
                    </CardContent>
                </Card>

                <Card className="rounded-3xl border-none shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:bg-slate-900/50">
                    <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                            <CardTitle className="text-sm font-medium text-slate-500 uppercase tracking-wider">Monthly Income</CardTitle>
                            <div className="p-2 bg-green-100 dark:bg-green-500/20 rounded-lg"><TrendingUp size={18} className="text-green-600 dark:text-green-400" /></div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-slate-900 dark:text-white mb-2">${getTotalIncome().toLocaleString()}</div>
                        <div className="flex items-center text-xs">
                            <span className="flex items-center text-green-600 bg-green-50 dark:bg-green-500/10 px-2 py-1 rounded-md font-medium"><ArrowUpRight className="h-3 w-3 mr-1" /> +12.5%</span>
                            <span className="text-slate-400 ml-2">vs last month</span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="rounded-3xl border-none shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:bg-slate-900/50">
                    <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                            <CardTitle className="text-sm font-medium text-slate-500 uppercase tracking-wider">Monthly Expense</CardTitle>
                            <div className="p-2 bg-red-100 dark:bg-red-500/20 rounded-lg"><TrendingDown size={18} className="text-red-600 dark:text-red-400" /></div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-slate-900 dark:text-white mb-2">${getTotalExpense().toLocaleString()}</div>
                        <div className="flex items-center text-xs">
                            <span className="flex items-center text-red-500 bg-red-50 dark:bg-red-500/10 px-2 py-1 rounded-md font-medium"><ArrowDownRight className="h-3 w-3 mr-1" /> -4.2%</span>
                            <span className="text-slate-400 ml-2">vs last month</span>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
                <Card className="col-span-1 lg:col-span-2 rounded-3xl border-none shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:bg-slate-900/50">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-lg font-bold">Recent transactions</CardTitle>
                        <Button variant="ghost" size="sm" className="rounded-full text-indigo-500 text-xs h-8 hover:bg-indigo-50 dark:hover:bg-indigo-500/10">See all <ArrowUpRight className="ml-1 h-3 w-3" /></Button>
                    </CardHeader>
                    <CardContent>
                        <div className="rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800">
                            <Table>
                                <TableHeader className="bg-slate-50 dark:bg-slate-800/50">
                                    <TableRow className="border-none hover:bg-transparent">
                                        <TableHead className="text-xs font-semibold text-slate-500">DATE</TableHead>
                                        <TableHead className="text-xs font-semibold text-slate-500">DETAILS</TableHead>
                                        <TableHead className="text-xs font-semibold text-slate-500">METHOD</TableHead>
                                        <TableHead className="text-xs font-semibold text-slate-500 text-right">AMOUNT</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {transactions.slice(0, 5).map((tx) => {
                                        const { icon: Icon, color, bg } = getCategoryIcon(tx.category);
                                        return (
                                            <TableRow key={tx.id} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50/80 dark:hover:bg-slate-800/80 transition-colors">
                                                <TableCell className="font-medium text-xs text-slate-500 whitespace-nowrap">{tx.date}</TableCell>
                                                <TableCell>
                                                    <div className="flex items-center">
                                                        <div className={`w-9 h-9 rounded-xl ${bg} flex items-center justify-center mr-3 shadow-sm`}><Icon className={`h-4 w-4 ${color}`} /></div>
                                                        <div>
                                                            <p className="font-semibold text-sm text-slate-900 dark:text-white">{tx.name}</p>
                                                            <p className="text-xs text-slate-500">{tx.category}</p>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell><span className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-xs font-medium text-slate-600 dark:text-slate-300">{tx.method}</span></TableCell>
                                                <TableCell className={`font-bold text-right ${tx.type === 'EXPENSE' ? 'text-slate-900 dark:text-white' : 'text-green-500'}`}>
                                                    {tx.type === 'EXPENSE' ? '-' : '+'}${tx.amount.toLocaleString()}
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </div>
                        {transactions.length === 0 && <div className="py-8 text-center text-slate-500 text-sm">No transactions yet. Add some to see them here!</div>}
                    </CardContent>
                </Card>

                <Card className="col-span-1 rounded-3xl border-none shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:bg-slate-900/50">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-lg font-bold">Saving Goals</CardTitle>
                        <Dialog open={goalOpen} onOpenChange={setGoalOpen}>
                            <DialogTrigger asChild><Button variant="ghost" size="icon" className="text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 rounded-full"><Plus className="h-5 w-5" /></Button></DialogTrigger>
                            <DialogContent>
                                <form onSubmit={handleAddGoal}>
                                    <DialogHeader><DialogTitle>Create Goal</DialogTitle></DialogHeader>
                                    <div className="grid gap-4 py-4">
                                        <Input value={newGoal.name} onChange={(e) => setNewGoal({ ...newGoal, name: e.target.value })} required placeholder="Goal Name (e.g. Vacation)" />
                                        <Input type="number" value={newGoal.targetAmount} onChange={(e) => setNewGoal({ ...newGoal, targetAmount: e.target.value })} required placeholder="Target Amount ($)" />
                                    </div>
                                    <Button type="submit" className="w-full bg-indigo-500 hover:bg-indigo-600 text-white">Save Goal</Button>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </CardHeader>
                    <CardContent className="space-y-6 pt-4">
                        {goals.map(g => {
                            const percent = Math.min(100, Math.round((g.currentAmount / g.targetAmount) * 100));
                            return (
                                <div key={g.id} className="relative group p-4 rounded-2xl border border-slate-100 dark:border-slate-800 hover:shadow-md transition-shadow bg-white dark:bg-slate-900">
                                    <div className="flex justify-between mb-2">
                                        <span className="text-sm font-bold text-slate-800 dark:text-white">{g.name}</span>
                                        <span className="text-sm font-semibold text-slate-500">${g.currentAmount} / <span className="text-indigo-500">${g.targetAmount}</span></span>
                                    </div>
                                    <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden relative">
                                        <div className="h-full bg-linear-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-500" style={{ width: `${percent}%` }}></div>
                                    </div>

                                    {fundOpen === g.id ? (
                                        <form onSubmit={(e) => handleFundGoal(e, g.id)} className="mt-3 flex gap-2">
                                            <Input type="number" value={fundAmount} onChange={(e) => setFundAmount(e.target.value)} placeholder="Amount $" className="h-8 text-xs bg-slate-50 dark:bg-slate-800 border-none" required />
                                            <Button type="submit" size="sm" className="h-8 text-xs bg-indigo-500 hover:bg-indigo-600 text-white">Add</Button>
                                            <Button type="button" variant="ghost" size="sm" onClick={() => setFundOpen(null)} className="h-8 rounded-full">Cancel</Button>
                                        </form>
                                    ) : (
                                        <Button variant="outline" size="sm" onClick={() => setFundOpen(g.id)} className="w-full mt-3 text-xs h-8 border-dashed border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-indigo-500 hover:text-indigo-500 transition-colors">Deposit Funds</Button>
                                    )}
                                </div>
                            );
                        })}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}