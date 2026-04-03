"use client"

import clsx from "clsx"
import { AnimatePresence, motion } from "motion/react"
import { Zeyada } from "next/font/google"

const zeyada = Zeyada({ subsets: ["latin"], weight: "400" })

interface GradualSpacingTextProps {
  text?: string
  className?: string
}

export const Entrytext: React.FC<GradualSpacingTextProps> = ({
  text = "",
  className = "",
}) => {
  const gradual = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  }

  return (
    <div className={clsx("flex justify-center space-x-1", className)}>
      <AnimatePresence>
        {text.split("").map((char, i) => (
          <motion.h1
            key={i}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={gradual}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className={clsx(
              zeyada.className,
              "text-center drop-shadow-sm",
              "text-4xl md:text-5xl lg:text-6xl xl:text-7xl"
            )}
          >
            {char === " " ? <span>&nbsp;</span> : char}
          </motion.h1>
        ))}
      </AnimatePresence>
    </div>
  )
}