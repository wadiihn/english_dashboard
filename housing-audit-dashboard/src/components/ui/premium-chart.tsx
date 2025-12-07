"use client"

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Cell } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Mock Data (Replace with your 'auditData' props later)
const data = [
  { name: "Cairo", value: 4500, color: "#3b82f6" }, // Blue
  { name: "Giza", value: 3200, color: "#8b5cf6" },  // Purple
  { name: "Delta", value: 2100, color: "#10b981" }, // Emerald
  { name: "Upper", value: 1800, color: "#f59e0b" }, // Amber
]

// 1. Custom "Apple-Style" Glass Tooltip
const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number }> | null; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl border border-white/20 bg-white/60 backdrop-blur-xl p-4 shadow-xl dark:bg-black/60 dark:border-white/10">
        <p className="mb-1 text-sm font-medium text-slate-500 dark:text-slate-400">{label}</p>
        <p className="text-2xl font-bold text-slate-900 dark:text-white">
          {payload[0].value.toLocaleString()} <span className="text-xs font-normal text-slate-500">units</span>
        </p>
      </div>
    )
  }
  return null
}

export function PremiumChart() {
  return (
    <Card className="border-none shadow-none bg-transparent">
      <CardHeader className="pl-0 pt-0">
        <CardTitle className="text-lg font-semibold text-slate-800 dark:text-slate-100">
          Regional Distribution
        </CardTitle>
      </CardHeader>
      <CardContent className="pl-0">
        <div className="h-[350px] w-full rounded-2xl border border-slate-200 bg-white/50 p-6 shadow-sm backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/50">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              {/* 2. Clean Grid Lines */}
              <CartesianGrid 
                vertical={false} 
                strokeDasharray="3 3" 
                stroke="#e2e8f0" 
                strokeOpacity={0.6} 
              />
              
              {/* 3. Styled Axes */}
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tickMargin={15}
                tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#64748b', fontSize: 12 }}
                tickFormatter={(value) => `${value / 1000}k`}
              />
              
              {/* 4. The Glass Tooltip */}
              <Tooltip 
                content={<CustomTooltip />} 
                cursor={{ fill: 'transparent' }} 
              />
              
              {/* 5. Gradient Bars with Radius */}
              <Bar 
                dataKey="value" 
                radius={[8, 8, 0, 0]} 
                barSize={50}
                animationDuration={1500}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
