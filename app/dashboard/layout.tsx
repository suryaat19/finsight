"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import ThemeToggle from "@/components/theme-toggle";
import {
    LayoutDashboard,
    ArrowRightLeft,
    PieChart,
    Settings,
    Bell,
    User,
    LogOut,
    HelpCircle,
    UserCog
} from "lucide-react";
import { Zeyada } from "next/font/google";

const zeyada = Zeyada({ subsets: ["latin"], weight: "400" })

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const router = useRouter();
    const [mounted, setMounted] = useState(false);

    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const profileRef = useRef<HTMLDivElement>(null);
    const [user, setUser] = useState({ firstName: "Guest", lastName: "", email: "guest@example.com" });

    useEffect(() => {
        setMounted(true);

        const handleClickOutside = (event: MouseEvent) => {
            if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
                setIsProfileOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = () => {
        sessionStorage.removeItem("currentUser");
        router.push("/");
    };

    const initials = `${user.firstName.charAt(0)}${user.lastName ? user.lastName.charAt(0) : ''}`.toUpperCase();

    const navLinks = [
        { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
        { name: "Transactions", href: "/dashboard/transactions", icon: ArrowRightLeft },
        { name: "Analytics", href: "/dashboard/analytics", icon: PieChart },
        { name: "Settings", href: "/dashboard/settings", icon: Settings },
    ];

    return (
        <div className="flex h-screen w-full overflow-hidden transition-colors duration-300">

            <div className="flex-1 flex flex-col min-w-0 overflow-hidden z-10 p-4">

                <header className="md:flex hidden items-center justify-between px-6 lg:px-8 shrink-0 z-20 transition-all duration-300">

                    <div className="shrink-0">
                        <p className={zeyada.className + " text-[48px] leading-none font-bold text-black dark:text-white tracking-tight select-none mt-2"}>
                            finsight
                        </p>
                    </div>

                    <div className="flex items-center gap-2 bg-[#F3E8FD] dark:bg-blue-500/20 rounded-full p-2">
                        {navLinks.map((link) => {
                            const Icon = link.icon;
                            const isActive = pathname === link.href;

                            return (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${isActive
                                        ? "bg-[#A142F4] text-white shadow-sm"
                                        : "text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-700 hover:shadow-sm"
                                        }`}
                                >
                                    <Icon size={16} className={`${isActive ? "text-white" : "text-slate-500 dark:text-slate-400"}`} />
                                    <span className="hidden md:block">{link.name}</span>
                                </Link>
                            );
                        })}
                    </div>

                    <div className="flex items-center gap-3 bg-[#F3E8FD] dark:bg-blue-500/20 rounded-full px-3">
                        <ThemeToggle />

                        <button className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors relative border border-transparent">
                            <Bell size={18} className="text-slate-700 dark:text-slate-300" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white dark:border-slate-800"></span>
                        </button>

                        <div className="relative" ref={profileRef}>
                            <button
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                                className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center cursor-pointer hover:ring-2 hover:ring-indigo-500/50 transition-all shadow-sm border border-indigo-200 dark:border-indigo-800"
                            >
                                <span className="font-bold text-sm text-indigo-600 dark:text-indigo-400">
                                    A
                                </span>
                            </button>

                            <div
                                className={`absolute right-0 mt-3 w-56 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl transition-all duration-200 origin-top-right z-50 ${isProfileOpen ? "scale-100 opacity-100 visible" : "scale-95 opacity-0 invisible"
                                    }`}
                            >
                                <div className="p-3 border-b border-slate-100 dark:border-slate-800">
                                    <p className="text-sm font-semibold text-slate-800 dark:text-white">Adaline Lively</p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate">adalineal@gmail.com</p>
                                </div>
                                <div className="p-2 flex flex-col gap-1">
                                    <Link href="/dashboard/profile" className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                                        <User size={16} /> My Profile
                                    </Link>
                                    <Link href="/dashboard/settings" className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                                        <UserCog size={16} /> Account Settings
                                    </Link>
                                    <Link href="/help" className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                                        <HelpCircle size={16} /> Help & Support
                                    </Link>
                                </div>
                                <div className="p-2 border-t border-slate-100 dark:border-slate-800">
                                    <button className="flex w-full items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors">
                                        <LogOut size={16} /> Log Out
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
                <header className="flex flex-col md:hidden items-center justify-between px-2 gap-4 w-full shrink-0 z-20 transition-all duration-300">
                    <div className="flex justify-between gap-2 w-full">
                        <div className="shrink-0">
                            <p className={zeyada.className + " text-[48px] leading-none font-bold text-black dark:text-white tracking-tight select-none mt-2"}>
                                finsight
                            </p>
                        </div>
                        <div className="flex items-center gap-3 bg-[#F3E8FD] dark:bg-blue-500/20 rounded-full px-3">
                            <ThemeToggle />

                            <button className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors relative border border-transparent">
                                <Bell size={18} className="text-slate-700 dark:text-slate-300" />
                                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white dark:border-slate-800"></span>
                            </button>

                            <div className="relative" ref={profileRef}>
                                <button
                                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                                    className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center cursor-pointer hover:ring-2 hover:ring-indigo-500/50 transition-all shadow-sm border border-indigo-200 dark:border-indigo-800"
                                >
                                    <span className="font-bold text-sm text-indigo-600 dark:text-indigo-400">
                                        A
                                    </span>
                                </button>

                                <div
                                    className={`absolute right-0 mt-3 w-56 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl transition-all duration-200 origin-top-right z-50 ${isProfileOpen ? "scale-100 opacity-100 visible" : "scale-95 opacity-0 invisible"
                                        }`}
                                >
                                    <div className="p-3 border-b border-slate-100 dark:border-slate-800">
                                        <p className="text-sm font-semibold text-slate-800 dark:text-white">Adaline Lively</p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate">adalineal@gmail.com</p>
                                    </div>
                                    <div className="p-2 flex flex-col gap-1">
                                        <Link href="/dashboard/profile" className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                                            <User size={16} /> My Profile
                                        </Link>
                                        <Link href="/dashboard/settings" className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                                            <UserCog size={16} /> Account Settings
                                        </Link>
                                        <Link href="/help" className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                                            <HelpCircle size={16} /> Help & Support
                                        </Link>
                                    </div>
                                    <div className="p-2 border-t border-slate-100 dark:border-slate-800">
                                        <button className="flex w-full items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors">
                                            <LogOut size={16} /> Log Out
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 bg-[#F3E8FD] dark:bg-blue-500/20 rounded-full p-2">
                        {navLinks.map((link) => {
                            const Icon = link.icon;
                            const isActive = pathname === link.href;

                            return (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${isActive
                                        ? "bg-[#A142F4] text-white shadow-sm"
                                        : "text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-700 hover:shadow-sm"
                                        }`}
                                >
                                    <Icon size={16} className={`${isActive ? "text-white" : "text-slate-500 dark:text-slate-400"}`} />
                                    <span className="hidden md:block">{link.name}</span>
                                </Link>
                            );
                        })}
                    </div>


                </header>

                <main className="flex-1 overflow-y-auto">
                    {children}
                </main>

            </div>
        </div>
    );
}