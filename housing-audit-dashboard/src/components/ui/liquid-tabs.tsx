"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface TabProps {
  options: string[]
  selected: string
  setSelected: (text: string) => void
}

export function LiquidTabs({ options, selected, setSelected }: TabProps) {
  return (
    <div className="relative flex w-fit p-1.5 rounded-full bg-slate-200/50 dark:bg-slate-900/50 backdrop-blur-md border border-white/20 shadow-inner" suppressHydrationWarning>
      {options.map((option) => {
        const isActive = selected === option;
        return (
          <button
            key={option}
            onClick={() => setSelected(option)}
            className={cn(
              "relative px-6 py-2.5 text-sm font-bold capitalize z-10 transition-colors duration-500",
              isActive 
                ? "text-slate-900 dark:text-white" 
                : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
            )}
          >
            <span className="relative z-10">{option}</span>
            
            {/* The Liquid Blob */}
            {isActive && (
              <motion.div
                layoutId="liquid-blob"
                transition={{ 
                  type: "spring", 
                  stiffness: 400, 
                  damping: 30, // Controls the "bounciness" of the liquid
                  mass: 1.2    // Makes it feel "heavy" like glass
                }}
                className="absolute inset-0 z-0 rounded-full"
                suppressHydrationWarning
              >
                {/* The Glass Material Layers */}
                <div className="absolute inset-0 bg-white dark:bg-white/10 rounded-full shadow-[0_2px_10px_rgba(0,0,0,0.1)]" suppressHydrationWarning />
                
                {/* Top Highlight (Reflection) */}
                <div className="absolute top-0 left-4 right-4 h-px bg-white/60 blur-[1px]" suppressHydrationWarning />
                
                {/* Bottom Highlight (Rim Light) */}
                <div className="absolute bottom-0 left-4 right-4 h-0.5 bg-black/5 blur-[2px] dark:bg-white/20" suppressHydrationWarning />
              </motion.div>
            )}
          </button>
        )
      })}
    </div>
  )
}
