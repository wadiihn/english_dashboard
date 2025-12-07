"use client";

import * as React from 'react';
import { LineChart, Line, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string;
  sub: string;
  icon: React.ComponentType<{ className?: string }>;
  chartColor?: string; // Hex color for the line
  trend?: "up" | "down" | "neutral";
}

// Helper to generate deterministic sparkline data based on a seed
function mulberry32(seed: number) {
  return function() {
    let t = seed += 0x6D2B79F5;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const generateSparkData = (seed: number) => {
  const rnd = mulberry32(seed);
  return Array.from({ length: 10 }, (_, i) => ({ name: i, value: Math.floor(rnd() * 100) + 20 }));
};

interface TooltipProps {
  active?: boolean;
  payload?: Array<{ value?: number }>;
}

const CustomTooltip = ({ active, payload }: TooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-slate-200 bg-white p-2 text-xs shadow-md">
        <p className="text-slate-700 font-bold">{payload[0].value}</p>
      </div>
    );
  }
  return null;
};

export function StatCard({ title, value, sub, icon: Icon, chartColor = "#10b981", trend = "up" }: StatCardProps) {
  // Use a deterministic seed derived from the title so the sparkline is stable
  const seed = title.split("").reduce((s, c) => s * 31 + c.charCodeAt(0), 0) >>> 0;
  const data = generateSparkData(seed);

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
      <CardContent className="p-6" suppressHydrationWarning>
        <div className="flex items-center justify-between mb-4" suppressHydrationWarning>
          <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider">{title}</h3>
          <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full group-hover:bg-slate-200 transition-colors" suppressHydrationWarning>
            <Icon className="h-4 w-4 text-slate-700 dark:text-slate-300" />
          </div>
        </div>
        
        <div className="flex items-end justify-between h-16" suppressHydrationWarning>
          <div className="flex flex-col justify-between h-full" suppressHydrationWarning>
            <p className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">{value}</p>
            <p className={`text-xs font-semibold px-2 py-0.5 rounded-full w-fit ${
              trend === "up" ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-600"
            }`} suppressHydrationWarning>
              {sub}
            </p>
          </div>
          
          <div className="h-14 w-24 pb-1" suppressHydrationWarning>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <Tooltip content={<CustomTooltip />} cursor={false} />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={chartColor}
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
