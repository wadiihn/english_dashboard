"use client"

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"

interface GaugeProps {
  value: number
  max: number
  label: string
  subLabel: string
  color: string
}

export function GaugeChart({ value, max, label, color }: Omit<GaugeProps, 'subLabel'>) {
  // Data for the gauge: [Active Portion, Remaining Portion]
  // We ensure the remaining portion is never negative
  const safeValue = Math.min(value, max);
  const data = [
    { name: "Value", value: safeValue },
    { name: "Remaining", value: max - safeValue }
  ];

  return (
    <div className="relative flex flex-col items-center justify-center h-[200px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="80%"
            startAngle={180}
            endAngle={0}
            innerRadius="60%"
            outerRadius="100%"
            paddingAngle={0}
            dataKey="value"
            stroke="none"
          >
            {/* Active Slice */}
            <Cell fill={color} />
            {/* Background Slice (Gray) */}
            <Cell fill="#e2e8f0" /> 
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      {/* Center Text Overlay - Lifted Up */}
      <div className="absolute bottom-[25%] left-0 right-0 flex flex-col items-center">
        <span className="text-4xl font-bold text-slate-900 dark:text-white">
          {value.toFixed(1)}%
        </span>
        <span className="text-sm text-slate-500 font-medium uppercase tracking-wide">
          {label}
        </span>
        <span className="text-xs text-slate-400 mt-1">
          Goal: {max}%
        </span>
      </div>
    </div>
  )
}
