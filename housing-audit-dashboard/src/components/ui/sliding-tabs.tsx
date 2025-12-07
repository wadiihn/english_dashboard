"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface SlidingTabsProps {
  options: Array<{
    label: string
    badge?: string | number
  }>
  selected: string
  setSelected: (label: string) => void
  className?: string
}

export function SlidingTabs({ 
  options, 
  selected, 
  setSelected,
  className 
}: SlidingTabsProps) {
  return (
    <div className={cn(
      "flex w-fit rounded-full bg-slate-100 dark:bg-slate-800 p-1",
      className
    )}>
      {options.map((option) => (
        <button
          key={option.label}
          onClick={() => setSelected(option.label)}
          className={cn(
            "relative px-4 py-2 text-sm font-semibold capitalize z-10",
            "transition-colors duration-200 flex items-center gap-2",
            selected === option.label 
              ? "text-slate-900 dark:text-slate-100" 
              : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
          )}
        >
          <span className="relative z-10">{option.label}</span>
          {option.badge && (
            <span className="relative z-10 inline-flex items-center justify-center px-2 py-0.5 text-xs font-semibold rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200">
              {option.badge}
            </span>
          )}
          {selected === option.label && (
            <motion.span
              layoutId="active-tab"
              transition={{ type: "spring", duration: 0.5 }}
              className="absolute inset-0 z-0 rounded-full bg-white dark:bg-slate-600 shadow-sm"
            />
          )}
        </button>
      ))}
    </div>
  )
}
