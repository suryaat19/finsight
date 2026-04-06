"use client";

import Link from "next/link";
import {
    ArrowRightLeft, BarChart3, Lightbulb, Wallet, FileText,
    Sparkles, TrendingUp, PieChart
} from "lucide-react";
import { useEffect, useState } from "react";
import ThemeToggle from "@/components/theme-toggle";
import { useRouter } from "next/navigation";
import { Zeyada } from "next/font/google";

const zeyada = Zeyada({ subsets: ["latin"], weight: "400" })

export default function SignupPage() {
    const [mounted, setMounted] = useState(false);
    
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    
    const router = useRouter();

    useEffect(() => setMounted(true), []);

    const handleSignup = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        setTimeout(() => {
            const existingUsers = JSON.parse(sessionStorage.getItem("mockUsers") || "[]");
            
            existingUsers.push({ firstName, lastName, email, password });
            sessionStorage.setItem("mockUsers", JSON.stringify(existingUsers));

            sessionStorage.setItem("currentUser", JSON.stringify({ firstName, lastName, email }));

            router.push("/auth/login");
            
        }, 800);
    };

    const serviceTags = [
        { name: "Transactions", icon: ArrowRightLeft, colors: "bg-[#e8f0fe] text-[#4285f4] border-[#d2e3fc] dark:bg-blue-500/20 dark:text-blue-400 dark:border-blue-500/30", rotation: "-rotate-2" },
        { name: "Analytics", icon: BarChart3, colors: "bg-[#e6f4ea] text-[#34a853] border-[#ceead6] dark:bg-green-500/20 dark:text-green-400 dark:border-green-500/30", rotation: "rotate-3" },
        { name: "Insights", icon: Lightbulb, colors: "bg-[#e0f2f1] text-[#009688] border-[#b2dfdb] dark:bg-teal-500/20 dark:text-teal-400 dark:border-teal-500/30", rotation: "-rotate-1" },
        { name: "Budgeting", icon: Wallet, colors: "bg-[#fef7e0] text-[#fbbc04] border-[#fde293] dark:bg-yellow-500/20 dark:text-yellow-400 dark:border-yellow-500/30", rotation: "rotate-2" },
        { name: "Reports", icon: FileText, colors: "bg-[#f3e8fd] text-[#a142f4] border-[#e1bee7] dark:bg-purple-500/20 dark:text-purple-400 dark:border-purple-500/30", rotation: "-rotate-3" },
    ];

    if (!mounted) return null;

    return (
        <div className="min-h-screen flex overflow-hidden">
            <div className="hidden md:flex md:flex-1/2 w-1/2">
                <div className="flex flex-col w-full">
                    <header className="px-6 py-4 flex items-center justify-between max-w-7xl w-full mx-auto relative z-10">
                        <p className={zeyada.className + " text-[48px] font-bold text-black dark:text-white tracking-tight select-none"}>
                            finsight
                        </p>
                        <ThemeToggle />
                    </header>
                    <div className="flex flex-wrap justify-center gap-4 max-w-3xl my-16 select-none">
                        {serviceTags.map((tag) => {
                            const Icon = tag.icon;
                            return (
                                <div key={tag.name} className={`flex items-center gap-2 px-4 py-2 rounded-full border-2 font-bold text-xl tracking-wide shadow-sm transition-transform hover:scale-110 hover:z-10 cursor-pointer ${tag.colors} ${tag.rotation}`}>
                                    <Icon size={22} strokeWidth={2.5} />
                                    <span>{tag.name}</span>
                                </div>
                            );
                        })}
                    </div>
                    <div className="flex items-center w-full justify-center mt-12 relative">
                        <div className="relative inline-block">
                            <p className={zeyada.className + " text-[120px] md:text-[200px] leading-none tracking-wider font-bold text-black dark:text-white select-none"}>
                                finsight
                            </p>
                            <Sparkles className="absolute top-[5%] left-[-8%] text-yellow-500 opacity-100 pointer-events-none" size={56} strokeWidth={1.5} />
                            <TrendingUp className="absolute bottom-[20%] left-[10%] text-green-500 opacity-100 -rotate-12 pointer-events-none" size={48} strokeWidth={2} />
                            <PieChart className="absolute top-[15%] right-[22%] text-blue-500 opacity-100 rotate-12 pointer-events-none" size={64} strokeWidth={1.5} />
                            <Wallet className="absolute bottom-[10%] right-[-5%] text-purple-500 opacity-100 rotate-6 pointer-events-none" size={50} strokeWidth={1.5} />
                            <Lightbulb className="absolute top-[45%] left-[40%] text-orange-400 opacity-100 pointer-events-none" size={36} strokeWidth={2} />
                        </div>
                    </div>
                </div>
            </div>

            <main className="flex flex-col w-full lg:w-1/2 items-center justify-center text-center m-2.5 rounded-lg bg-[#F3E8FD] dark:bg-blue-500/20 z-10">
                <header className="px-6 py-4 flex lg:hidden items-center justify-between w-full mx-auto z-10 absolute top-0">
                    <p className={zeyada.className + " text-[48px] font-bold text-white tracking-tight select-none"}>
                        finsight
                    </p>
                    <ThemeToggle />
                </header>

                <form 
                    onSubmit={handleSignup} 
                    className="flex flex-col gap-4 w-full max-w-sm p-6 rounded-lg bg-white/90 dark:bg-slate-900 backdrop-blur-sm shadow-md"
                >
                    <p className={zeyada.className + " text-[48px] font-bold text-black dark:text-white tracking-tight select-none"}>
                        finsight
                    </p>
                    <p className="text-lg text-gray-700 dark:text-gray-300 mb-2">Create your account to get started</p>
                    
                    <div className="flex gap-2 w-full">
                        <input 
                            type="text" 
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder="First Name" 
                            required 
                            className="w-1/2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-800 dark:border-slate-700" 
                        />
                        <input 
                            type="text" 
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder="Last Name" 
                            required 
                            className="w-1/2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-800 dark:border-slate-700" 
                        />
                    </div>

                    <input 
                        type="text" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email or Username" 
                        required 
                        className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-800 dark:border-slate-700" 
                    />
                    <input 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password" 
                        required 
                        className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-800 dark:border-slate-700" 
                    />
                    <button 
                        type="submit" 
                        disabled={loading}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50 h-10 flex items-center justify-center"
                    >
                        {loading ? "Creating Account..." : "Sign Up"}
                    </button>
                    
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                        Already have an account?{" "}
                        <Link href="/auth/login" className="text-blue-500 hover:underline">
                            Login
                        </Link>
                    </p>
                </form>
            </main>
        </div>
    );
}