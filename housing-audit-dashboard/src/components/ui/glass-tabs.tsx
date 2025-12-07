"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface TabProps {
  options: string[]
  selected: string
  setSelected: (text: string) => void
}

export function GlassTabs({ options, selected, setSelected }: TabProps) {
  return (
    <div className="relative flex w-fit p-1 rounded-full" suppressHydrationWarning>
      {/* The Liquid Glass Background Layer */}
      <div className={cn(
        "absolute inset-0 rounded-full",
        "bg-white/30 dark:bg-black/30", // Translucent base
        "backdrop-blur-xl", // The heavy blur
        "border border-white/20 dark:border-white/10", // Subtle glass edge
        "shadow-[0_8px_32px_0_rgba(31,38,135,0.07)]" // Diffuse shadow
      )} suppressHydrationWarning />

      {/* The Tab Buttons */}
      {options.map((option) => (
        <button
          key={option}
          onClick={() => setSelected(option)}
          className={cn(
            "relative px-6 py-2 text-sm font-medium capitalize z-10 transition-colors duration-300",
            selected === option 
              ? "text-slate-800 dark:text-white" 
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
          )}
        >
          <span className="relative z-10">{option}</span>
          
          {/* The Active "Pill" - also glassy but more opaque */}
          {selected === option && (
            <motion.span
              layoutId="glass-active"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className={cn(
                "absolute inset-0 z-0 rounded-full",
                "bg-white/40 dark:bg-white/10", // Lighter/Subtle highlight
                "shadow-sm border border-white/50" // Highlighting edge
              )}
            />
          )}
        </button>
      ))}
    </div>
  )
}
