"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import {
  Sun, Moon, ArrowRight,
  Sparkles, Globe, MousePointerClick, PenTool, Zap
} from "lucide-react";
import { useEffect, useState } from "react";

export default function LandingPage() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const serviceTags = [
    {
      name: "branding",
      icon: Sparkles,
      colors: "bg-[#e8f0fe] text-[#4285f4] border-[#d2e3fc] dark:bg-blue-500/20 dark:text-blue-400 dark:border-blue-500/30",
      rotation: "-rotate-2"
    },
    {
      name: "website",
      icon: Globe,
      colors: "bg-[#e6f4ea] text-[#34a853] border-[#ceead6] dark:bg-green-500/20 dark:text-green-400 dark:border-green-500/30",
      rotation: "rotate-3"
    },
    {
      name: "interface",
      icon: MousePointerClick,
      colors: "bg-[#e0f2f1] text-[#009688] border-[#b2dfdb] dark:bg-teal-500/20 dark:text-teal-400 dark:border-teal-500/30",
      rotation: "-rotate-1"
    },
    {
      name: "illustration",
      icon: PenTool,
      colors: "bg-[#fef7e0] text-[#fbbc04] border-[#fde293] dark:bg-yellow-500/20 dark:text-yellow-400 dark:border-yellow-500/30",
      rotation: "rotate-2"
    },
    {
      name: "animation",
      icon: Zap,
      colors: "bg-[#f3e8fd] text-[#a142f4] border-[#e1bee7] dark:bg-purple-500/20 dark:text-purple-400 dark:border-purple-500/30",
      rotation: "-rotate-3"
    },
  ];

  return (
    <div className="min-h-screen flex flex-col overflow-hidden">
      <header className="px-6 py-4 flex items-center justify-between max-w-7xl w-full mx-auto relative z-10">
        <div className="flex items-center gap-2 font-baskervville italic font-bold text-2xl tracking-tighter">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-lg">
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
                <path d="M40-280q0-91 34.5-171T169-591q60-60 140-94.5T480-720q91 0 171 34.5T791-591q60 60 94.5 140T920-280h-80q0-149-105.5-254.5T480-640q-149 0-254.5 105.5T120-280H40Zm160 0q0-116 82-198t198-82q116 0 198 82t82 198h-80q0-83-58.5-141.5T480-480q-83 0-141.5 58.5T280-280h-80Z" />
              </svg>
            </span>
          </div>
          finsight
        </div>

        <div className="flex items-center gap-4">
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle Dark Mode"
            >
              {theme === "dark" ? <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M440-760v-160h80v160h-80Zm266 110-55-55 112-115 56 57-113 113Zm54 210v-80h160v80H760ZM440-40v-160h80v160h-80ZM254-652 140-763l57-56 113 113-56 54Zm508 512L651-255l54-54 114 110-57 59ZM40-440v-80h160v80H40Zm157 300-56-57 112-112 29 27 29 28-114 114Zm113-170q-70-70-70-170t70-170q70-70 170-70t170 70q70 70 70 170t-70 170q-70 70-170 70t-170-70Zm283-57q47-47 47-113t-47-113q-47-47-113-47t-113 47q-47 47-47 113t47 113q47 47 113 47t113-47ZM480-480Z" /></svg> : <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M484-80q-84 0-157.5-32t-128-86.5Q144-253 112-326.5T80-484q0-146 93-257.5T410-880q-18 99 11 193.5T521-521q71 71 165.5 100T880-410q-26 144-138 237T484-80Zm0-80q88 0 163-44t118-121q-86-8-163-43.5T464-465q-61-61-97-138t-43-163q-77 43-120.5 118.5T160-484q0 135 94.5 229.5T484-160Zm-20-305Z" /></svg>}
            </button>
          )}

          <Link
            href="/dashboard"
            className="flex gap-2 px-4 py-2 border-2 font-bold text-xl rounded-md shadow-sm transition-transform hover:scale-101 hover:z-10 cursor-pointer bg-[#e6f4ea] text-[#34a853] border-[#ceead6] dark:bg-green-500/20 dark:text-green-400 dark:border-green-500/30"
          >
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#34a853">
              <path d="M516-82q-9 2-18 2h-18q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480v18q0 9-2 18l-78-24v-12q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93h12l24 78Zm305 22L650-231 600-80 480-480l400 120-151 50 171 171-79 79Z" />
            </svg>
            <span>Dashboard</span>
          </Link>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 mt-16 relative z-10">

        <div className="flex flex-wrap justify-center gap-4 max-w-3xl mb-12 select-none">
          {serviceTags.map((tag) => {
            const Icon = tag.icon;
            return (
              <div
                key={tag.name}
                className={`flex items-center gap-2 px-6 py-3 rounded-full border-2 font-bold text-lg tracking-wide shadow-sm transition-transform hover:scale-110 hover:z-10 cursor-pointer ${tag.colors} ${tag.rotation}`}
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
          <Link
            href="/dashboard"
            className="px-8 py-4 text-base font-semibold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20"
          >
            Get Started <ArrowRight size={20} />
          </Link>
        </div>
      </main>


      {/* <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-400/10 dark:bg-indigo-900/20 blur-3xl">finsight</div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-400/10 dark:bg-purple-900/20 blur-3xl">finsight</div>
      </div> */}
    </div>
  );
}