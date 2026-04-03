"use client";

import Link from "next/link";
import {
  ArrowRightLeft, BarChart3, Lightbulb, Wallet, FileText,
  Sparkles, TrendingUp, PieChart,
} from "lucide-react";
import { useEffect, useState } from "react";
import ThemeToggle from "@/components/theme-toggle";
import { Zeyada } from "next/font/google";
const zeyada = Zeyada({ subsets: ["latin"], weight: "400" })

export default function LandingPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const serviceTags = [
    {
      name: "Transactions",
      icon: ArrowRightLeft,
      colors: "bg-[#e8f0fe] text-[#4285f4] border-[#d2e3fc] dark:bg-blue-500/20 dark:text-blue-400 dark:border-blue-500/30",
      rotation: "-rotate-2"
    },
    {
      name: "Analytics",
      icon: BarChart3,
      colors: "bg-[#e6f4ea] text-[#34a853] border-[#ceead6] dark:bg-green-500/20 dark:text-green-400 dark:border-green-500/30",
      rotation: "rotate-3"
    },
    {
      name: "Insights",
      icon: Lightbulb,
      colors: "bg-[#e0f2f1] text-[#009688] border-[#b2dfdb] dark:bg-teal-500/20 dark:text-teal-400 dark:border-teal-500/30",
      rotation: "-rotate-1"
    },
    {
      name: "Budgeting",
      icon: Wallet,
      colors: "bg-[#fef7e0] text-[#fbbc04] border-[#fde293] dark:bg-yellow-500/20 dark:text-yellow-400 dark:border-yellow-500/30",
      rotation: "rotate-2"
    },
    {
      name: "Reports",
      icon: FileText,
      colors: "bg-[#f3e8fd] text-[#a142f4] border-[#e1bee7] dark:bg-purple-500/20 dark:text-purple-400 dark:border-purple-500/30",
      rotation: "-rotate-3"
    },
  ];

  return (
    <div className="min-h-screen flex flex-col overflow-hidden">
      <header className="px-6 py-4 flex items-center justify-between max-w-7xl w-full mx-auto relative z-10">
        <p className={zeyada.className + " text-[48px] font-bold text-black dark:text-white tracking-tight select-none"}>
          finsight
        </p>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <button
            className="px-2 py-2 gap-2 w-full bg-[#E6F4EA] dark:bg-green-500/20 rounded-[16px] transition-transform duration-300 hover:scale-102 hover:shadow-lg active:scale-95 cursor-pointer border-none outline-none"
          >
            <span className="font-bold text-[#34A853] dark:text-green-400 text-xlS whitespace-nowrap">
              Dashboard
            </span>
          </button>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 mt-16 relative z-10">
        <div className="flex flex-wrap justify-center gap-4 max-w-3xl mb-12 select-none">
          {serviceTags.map((tag) => {
            const Icon = tag.icon;
            return (
              <div
                key={tag.name}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border-2 font-bold text-xl tracking-wide shadow-sm transition-transform hover:scale-110 hover:z-10 cursor-pointer ${tag.colors} ${tag.rotation}`}
              >
                <Icon size={22} strokeWidth={2.5} />
                <span>{tag.name}</span>
              </div>
            );
          })}
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight max-w-4xl mb-6">
          Manage everything with <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-500 to-purple-500">absolute clarity.</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mb-10 mx-auto">
          Finsight provides a seamless, beautiful interface to track your expenses, analyze spending trends, and take control of your financial future. No clutter, just insights.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/auth/signup" className="group">
            <button
              className="group flex items-center gap-[-10px] justify-start w-full bg-[#F3E8FD] dark:bg-blue-500/20 rounded-[16px] 
              transition-transform duration-300 hover:scale-102 hover:shadow-sm active:scale-95 cursor-pointer border-none outline-none"
            >
              <div className="relative w-10 h-10 shrink-0 flex items-center justify-center">
                <div
                  className="absolute inset-0 rounded-full dark:hidden opacity-80 group-hover:scale-110 transition-transform duration-500"
                  style={{ background: "radial-gradient(50% 50% at 50% 50%, #A142F4 0%, #F3E8FD 100%)" }}
                />
                <div
                  className="absolute inset-0 rounded-full opacity-80 hidden dark:block group-hover:scale-110 transition-transform duration-500"
                  style={{ background: "radial-gradient(50% 50% at 50% 50%, #60a5fa 0%, transparent 70%)" }}
                />
              </div>
              <span className="font-bold text-2xl leading-10 text-indigo-500 dark:text-blue-400 tracking-tight whitespace-nowrap">
                Get Started
              </span>
              <div className="relative w-10 h-10 shrink-0 flex items-center justify-center">
                <div
                  className="absolute inset-0 rounded-full dark:hidden opacity-80 group-hover:scale-110 transition-transform duration-500"
                  style={{ background: "radial-gradient(50% 50% at 50% 50%, #A142F4 0%, #F3E8FD 100%)" }}
                />
                <div
                  className="absolute inset-0 rounded-full opacity-80 hidden dark:block group-hover:scale-110 transition-transform duration-500"
                  style={{ background: "radial-gradient(50% 50% at 50% 50%, #60a5fa 0%, transparent 70%)" }}
                />
              </div>
            </button>
          </Link>
        </div>
      </main>

      <footer className="py-6 flex flex-col justify-around items-center h-full bg-[#F3E8FD] dark:bg-blue-500/20 relative z-10 mb-2.5 mx-2.5 mt-12 rounded-lg overflow-hidden">

        <div className="grid md:grid-cols-3 grid-cols-1 gap-4 w-full z-20 pl-8">
          <div className="flex flex-col items-start gap-2 mb-4 md:mb-0">
            <p className={zeyada.className + " text-[48px] font-bold text-black dark:text-white tracking-tight select-none"}>
              finsight
            </p>
            <span className="text-xs text-black dark:text-white">© 2024 FinSight. All rights reserved.</span>
          </div>

          <div className="flex flex-col items-center md:items-start gap-2 mb-4 md:mb-0">
            <span className="font-medium text-lg shadow-sm bg-white text-black rounded-t-xl rounded-br-xl px-4 py-2">Office</span>
            <p className="text-xl text-black dark:text-white font-bold">papaverhof 21<br />1032 LX amsterdam</p>

          </div>

          <div className="flex flex-col items-center md:items-start gap-3">
            <span className="font-medium text-lg shadow-sm bg-white text-black rounded-t-xl rounded-br-xl px-4 py-2">
              Contact
            </span>
            <p className="text-xl text-black dark:text-white font-bold">send us a message at info@finsight.com</p>

            <div className="flex gap-4 text-sm text-slate-500 dark:text-slate-400">
              <Link href="mailto:surya.thota45@gmail.com" target="_blank" className="p-2 rounded-md text-gray-500" title="Email">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail size-5">
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </svg>
              </Link>
              <Link href="https://www.github.com/suryaat19" target="_blank" className="p-2 rounded-md text-gray-500" title="GitHub">
                <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#currentColor" className="size-5">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
              </Link>
              <Link href="https://www.linkedin.com/in/surya-thota21" target="_blank" className="p-2 rounded-md text-gray-500" title="LinkedIn">
                <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="size-5">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        <div className="flex items-center w-full justify-center mt-16 relative">
          <div className="relative inline-block">
            <p className={zeyada.className + " text-[120px] md:text-[200px] leading-none  tracking-wider font-bold text-black dark:text-white select-none"}>
              finsight
            </p>
            <Sparkles
              className="absolute top-[5%] left-[-8%] text-yellow-500 opacity-100 pointer-events-none"
              size={56}
              strokeWidth={1.5}
            />
            <TrendingUp
              className="absolute bottom-[20%] left-[10%] text-green-500 opacity-100 -rotate-12 pointer-events-none"
              size={48}
              strokeWidth={2}
            />
            <PieChart
              className="absolute top-[15%] right-[22%] text-blue-500 opacity-100 rotate-12 pointer-events-none"
              size={64}
              strokeWidth={1.5}
            />
            <Wallet
              className="absolute bottom-[10%] right-[-5%] text-purple-500 opacity-100 rotate-6 pointer-events-none"
              size={50}
              strokeWidth={1.5}
            />
            <Lightbulb
              className="absolute top-[45%] left-[40%] text-orange-400 opacity-100  pointer-events-none"
              size={36}
              strokeWidth={2}
            />
          </div>
        </div>
      </footer>
    </div>
  );
}