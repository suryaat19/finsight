"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative flex items-center justify-center w-12 h-12 hover:scale-105"
    >
      <span
        className={`absolute transition-all duration-300 ${
          isDark ? "opacity-0 rotate-90 scale-0" : "opacity-100 rotate-0 scale-100"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#000000"
        >
          <path d="M444-768v-144h72v144h-72Zm265 112-54-52 104-102 52 50-102 104Zm59 212v-72h144v72H768ZM444-48v-144h72v144h-72ZM251-658 147-760l54-50 101 101-51 51Zm509 511L659-252l50-50 104 100-53 55ZM48-444v-72h144v72H48Zm152 297-51-53 102-100 25 24 24 25-100 104Zm110-163q-70-70-70-170t70-170q70-70 170-70t170 70q70 70 70 170t-70 170q-70 70-170 70t-170-70Zm289-51q49-49 49-119t-49-119q-49-49-119-49t-119 49q-49 49-49 119t49 119q49 49 119 49t119-49ZM480-480Z" />
        </svg>
      </span>

      <span
        className={`absolute transition-all duration-300 ${
          isDark ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-0"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#ffffff"
        >
          <path d="M483.11-96q-80.49 0-150.92-30.66-70.42-30.66-122.65-82.88-52.22-52.23-82.88-122.65Q96-402.62 96-483.11 96-623 184-730.5T412-864q-17 99 11.5 188T521-518q67 67 158 95t185 11q-24 138-132.5 227T483.11-96Zm-.11-72q88 0 164-45t115-122q-83-5-158.5-39.5T469-468q-60-60-94-135t-40-159q-77 41-122 116.18-45 75.19-45 162.82 0 131.25 91.88 223.12Q351.75-168 483-168Zm-14-300Z" />
        </svg>
      </span>
    </button>
  );
}