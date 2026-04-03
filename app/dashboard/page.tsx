// app/dashboard/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ArrowUpRight,
  ArrowDownRight,
  LayoutGrid,
  Plus,
  Calendar,
  Video,
  ShoppingCart,
  Coffee,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// --- MOCK DATA ---
const barData = [
  { name: "Jan", Income: 12000, Expense: 8000 },
  { name: "Feb", Income: 15000, Expense: 9000 },
  { name: "Mar", Income: 10000, Expense: 11000 },
  { name: "Apr", Income: 16000, Expense: 10000 },
  { name: "May", Income: 14000, Expense: 10500 },
  { name: "Jun", Income: 8000, Expense: 7500 },
  { name: "Jul", Income: 9000, Expense: 8000 },
];

const pieData = [
  { name: "Cafe & Restaurants", value: 400, color: "#8b5cf6" }, // Purple
  { name: "Entertainment", value: 300, color: "#c4b5fd" }, // Light Purple
  { name: "Investments", value: 800, color: "#e2e8f0" }, // Gray
];

const recentTransactions = [
  {
    id: "1",
    date: "25 Jul 12:30",
    amount: "- $10",
    name: "YouTube",
    method: "VISA **3254",
    category: "Subscription",
    icon: Video,
    color: "text-red-500",
    bg: "bg-red-100 dark:bg-red-500/20",
  },
  {
    id: "2",
    date: "26 Jul 15:00",
    amount: "- $150",
    name: "Reserved",
    method: "Mastercard **2154",
    category: "Shopping",
    icon: ShoppingCart,
    color: "text-slate-500",
    bg: "bg-slate-100 dark:bg-slate-500/20",
  },
  {
    id: "3",
    date: "27 Jul 9:00",
    amount: "- $80",
    name: "Yaposhka",
    method: "Mastercard **2154",
    category: "Cafe & Restaurants",
    icon: Coffee,
    color: "text-pink-500",
    bg: "bg-pink-100 dark:bg-pink-500/20",
  },
];

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-8 p-4 md:p-8 pt-6 max-w-7xl mx-auto">
      
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Welcome back, Adaline!
          </h2>
          <p className="text-slate-500 mt-1">It is the best time to manage your finances</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="rounded-full shadow-sm">
            <Calendar className="mr-2 h-4 w-4" /> This month
          </Button>
          <Button variant="outline" className="rounded-full shadow-sm hidden sm:flex">
            <LayoutGrid className="mr-2 h-4 w-4" /> Manage widgets
          </Button>
          <Button className="rounded-full shadow-sm bg-indigo-500 hover:bg-indigo-600 text-white">
            <Plus className="mr-2 h-4 w-4" /> Add new widget
          </Button>
        </div>
      </div>

      {/* SUMMARY CARDS ROW */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Card 1 */}
        <Card className="rounded-3xl border-none shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:bg-slate-900/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-semibold text-slate-600 dark:text-slate-400">Total balance</CardTitle>
            <div className="h-8 w-8 rounded-full border flex items-center justify-center cursor-pointer hover:bg-slate-50 transition-colors">
              <ArrowUpRight className="h-4 w-4 text-slate-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900 dark:text-white mb-2">$15,700<span className="text-slate-300 dark:text-slate-600">.00</span></div>
            <div className="flex items-center text-xs">
              <span className="flex items-center text-green-600 bg-green-100 dark:bg-green-500/20 px-2 py-1 rounded-full font-medium">
                <ArrowUpRight className="h-3 w-3 mr-1" /> 12.1%
              </span>
              <span className="text-slate-400 ml-2">vs last month</span>
            </div>
          </CardContent>
        </Card>

        {/* Card 2 */}
        <Card className="rounded-3xl border-none shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:bg-slate-900/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-semibold text-slate-600 dark:text-slate-400">Income</CardTitle>
            <div className="h-8 w-8 rounded-full border flex items-center justify-center cursor-pointer hover:bg-slate-50 transition-colors">
              <ArrowUpRight className="h-4 w-4 text-slate-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900 dark:text-white mb-2">$8,500<span className="text-slate-300 dark:text-slate-600">.00</span></div>
            <div className="flex items-center text-xs">
              <span className="flex items-center text-green-600 bg-green-100 dark:bg-green-500/20 px-2 py-1 rounded-full font-medium">
                <ArrowUpRight className="h-3 w-3 mr-1" /> 6.3%
              </span>
              <span className="text-slate-400 ml-2">vs last month</span>
            </div>
          </CardContent>
        </Card>

        {/* Card 3 */}
        <Card className="rounded-3xl border-none shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:bg-slate-900/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-semibold text-slate-600 dark:text-slate-400">Expense</CardTitle>
            <div className="h-8 w-8 rounded-full border flex items-center justify-center cursor-pointer hover:bg-slate-50 transition-colors">
              <ArrowUpRight className="h-4 w-4 text-slate-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900 dark:text-white mb-2">$6,222<span className="text-slate-300 dark:text-slate-600">.00</span></div>
            <div className="flex items-center text-xs">
              <span className="flex items-center text-red-500 bg-red-100 dark:bg-red-500/20 px-2 py-1 rounded-full font-medium">
                <ArrowDownRight className="h-3 w-3 mr-1" /> 2.4%
              </span>
              <span className="text-slate-400 ml-2">vs last month</span>
            </div>
          </CardContent>
        </Card>

        {/* Card 4 */}
        <Card className="rounded-3xl border-none shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:bg-slate-900/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-semibold text-slate-600 dark:text-slate-400">Total savings</CardTitle>
            <div className="h-8 w-8 rounded-full border flex items-center justify-center cursor-pointer hover:bg-slate-50 transition-colors">
              <ArrowUpRight className="h-4 w-4 text-slate-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900 dark:text-white mb-2">$32,913<span className="text-slate-300 dark:text-slate-600">.00</span></div>
            <div className="flex items-center text-xs">
              <span className="flex items-center text-green-600 bg-green-100 dark:bg-green-500/20 px-2 py-1 rounded-full font-medium">
                <ArrowUpRight className="h-3 w-3 mr-1" /> 12.1%
              </span>
              <span className="text-slate-400 ml-2">vs last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* MIDDLE SECTION: CHARTS */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
        {/* Main Bar Chart */}
        <Card className="col-span-1 lg:col-span-2 rounded-3xl border-none shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:bg-slate-900/50">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-bold">Money flow</CardTitle>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center"><div className="w-2 h-2 rounded-full bg-indigo-500 mr-2"></div>Income</div>
              <div className="flex items-center"><div className="w-2 h-2 rounded-full bg-indigo-300 mr-2"></div>Expense</div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData} barGap={8}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} tickFormatter={(value) => `$${value/1000}k`} dx={-10} />
                  <Tooltip 
                    cursor={{fill: 'transparent'}}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar dataKey="Income" fill="#8b5cf6" radius={[4, 4, 0, 0]} barSize={16} />
                  <Bar dataKey="Expense" fill="#c4b5fd" radius={[4, 4, 0, 0]} barSize={16} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Budget Donut Chart */}
        <Card className="col-span-1 rounded-3xl border-none shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:bg-slate-900/50">
          <CardHeader className="flex flex-row items-center justify-between pb-0">
            <CardTitle className="text-lg font-bold">Budget</CardTitle>
            <div className="h-8 w-8 rounded-full border flex items-center justify-center cursor-pointer hover:bg-slate-50 transition-colors">
              <ArrowUpRight className="h-4 w-4 text-slate-400" />
            </div>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center h-[280px]">
            <div className="relative h-[160px] w-[160px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-[10px] font-medium text-slate-400">Total for month</span>
                <span className="text-lg font-bold text-slate-900 dark:text-white">$5,950<span className="text-slate-300">.00</span></span>
              </div>
            </div>
            
            {/* Custom Legend */}
            <div className="w-full mt-4 space-y-2">
              {pieData.map((item, index) => (
                <div key={index} className="flex items-center text-sm">
                  <div className="w-2 h-2 rounded-full mr-3" style={{backgroundColor: item.color}}></div>
                  <span className="text-slate-600 dark:text-slate-400">{item.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* BOTTOM ROW: TABLES & PROGRESS */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
        {/* Recent Transactions Table */}
        <Card className="col-span-1 lg:col-span-2 rounded-3xl border-none shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:bg-slate-900/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-bold">Recent transactions</CardTitle>
            <div className="flex space-x-2">
               <Button variant="outline" size="sm" className="rounded-full text-xs h-8">See all <ArrowUpRight className="ml-1 h-3 w-3"/></Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-none hover:bg-transparent">
                  <TableHead className="text-xs font-semibold text-indigo-400 bg-indigo-50/50 dark:bg-indigo-900/20 rounded-l-full">DATE</TableHead>
                  <TableHead className="text-xs font-semibold text-indigo-400 bg-indigo-50/50 dark:bg-indigo-900/20">AMOUNT</TableHead>
                  <TableHead className="text-xs font-semibold text-indigo-400 bg-indigo-50/50 dark:bg-indigo-900/20">PAYMENT NAME</TableHead>
                  <TableHead className="text-xs font-semibold text-indigo-400 bg-indigo-50/50 dark:bg-indigo-900/20">METHOD</TableHead>
                  <TableHead className="text-xs font-semibold text-indigo-400 bg-indigo-50/50 dark:bg-indigo-900/20 rounded-r-full">CATEGORY</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentTransactions.map((tx) => (
                  <TableRow key={tx.id} className="border-b border-slate-50 dark:border-slate-800 hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                    <TableCell className="font-medium text-xs text-slate-500 py-4">{tx.date}</TableCell>
                    <TableCell className="font-bold text-slate-900 dark:text-white">{tx.amount}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <div className={`w-8 h-8 rounded-full ${tx.bg} flex items-center justify-center mr-3`}>
                          <tx.icon className={`h-4 w-4 ${tx.color}`} />
                        </div>
                        <span className="font-semibold text-slate-700 dark:text-slate-300">{tx.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-slate-500">{tx.method}</TableCell>
                    <TableCell className="text-sm text-slate-500">{tx.category}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Saving Goals */}
        <Card className="col-span-1 rounded-3xl border-none shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:bg-slate-900/50">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <CardTitle className="text-lg font-bold">Saving goals</CardTitle>
            <div className="h-8 w-8 rounded-full border flex items-center justify-center cursor-pointer hover:bg-slate-50 transition-colors">
              <ArrowUpRight className="h-4 w-4 text-slate-400" />
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex justify-between items-end mb-2">
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">MacBook Pro</span>
                <span className="text-sm font-bold text-indigo-500">$1,650</span>
              </div>
              <div className="relative w-full h-4 bg-indigo-100 dark:bg-indigo-900/30 rounded-full overflow-hidden">
                 <div className="absolute top-0 left-0 h-full bg-indigo-500 rounded-full" style={{ width: '25%' }}></div>
                 <span className="absolute left-2 top-0 h-full flex items-center text-[10px] font-bold text-white">25%</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-end mb-2">
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">New car</span>
                <span className="text-sm font-bold text-indigo-500">$60,000</span>
              </div>
              <div className="relative w-full h-4 bg-indigo-100 dark:bg-indigo-900/30 rounded-full overflow-hidden">
                 <div className="absolute top-0 left-0 h-full bg-indigo-500 rounded-full" style={{ width: '42%' }}></div>
                 <span className="absolute left-2 top-0 h-full flex items-center text-[10px] font-bold text-white">42%</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-end mb-2">
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">New house</span>
                <span className="text-sm font-bold text-indigo-500">$150,000</span>
              </div>
              <div className="relative w-full h-4 bg-indigo-100 dark:bg-indigo-900/30 rounded-full overflow-hidden">
                 <div className="absolute top-0 left-0 h-full bg-indigo-500 rounded-full" style={{ width: '3%' }}></div>
                 <span className="absolute left-1 top-0 h-full flex items-center text-[10px] font-bold text-white">3%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}