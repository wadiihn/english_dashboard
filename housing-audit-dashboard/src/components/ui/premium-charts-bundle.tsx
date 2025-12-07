"use client"

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Cell, PieChart, Pie, ScatterChart, Scatter, ZAxis, Legend } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// --- SHARED COMPONENTS ---
const GlassTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; color?: string; fill?: string; name?: string }> | null; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl border border-white/20 bg-white/80 backdrop-blur-xl p-4 shadow-xl dark:bg-black/80 dark:border-white/10">
        <p className="mb-1 text-sm font-medium text-slate-500">{label || payload[0].name}</p>
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full" style={{ backgroundColor: payload[0].color || payload[0].fill }} />
          <p className="text-xl font-bold text-slate-900 dark:text-white">
            {typeof payload[0].value === 'number' ? payload[0].value.toLocaleString() : payload[0].value}
          </p>
        </div>
      </div>
    )
  }
  return null
}

// --- 1. PIPELINE STATUS (Pie Chart) ---
const pipelineData = [
  { name: "Delivered", value: 684000, color: "#10b981" }, // Emerald
  { name: "Construction", value: 247345, color: "#eab308" }, // Yellow
  { name: "Planned", value: 68655, color: "#94a3b8" },   // Slate
]

export function PipelineChart() {
  return (
    <Card className="border-none shadow-none bg-transparent">
      <CardHeader className="pl-0 pt-0"><CardTitle>Pipeline Status</CardTitle></CardHeader>
      <CardContent className="pl-0">
        <div className="h-[300px] w-full rounded-2xl border border-slate-200 bg-white/50 p-4 shadow-sm backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/50">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pipelineData}
                cx="50%" cy="50%"
                innerRadius={60} outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {pipelineData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                ))}
              </Pie>
              <Tooltip content={<GlassTooltip />} cursor={false} />
              <Legend verticalAlign="bottom" height={36} iconType="circle" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

// --- 2. FUNDING MIX (Stacked Bar) ---
const fundingData = [
  { name: "Unit Cost", Subsidy: 16000, DownPayment: 43000, Mortgage: 126000 }
]

export function FundingMixChart() {
  return (
    <Card className="border-none shadow-none bg-transparent">
      <CardHeader className="pl-0 pt-0"><CardTitle>Unit Funding Structure</CardTitle></CardHeader>
      <CardContent className="pl-0">
        <div className="h-[300px] w-full rounded-2xl border border-slate-200 bg-white/50 p-4 shadow-sm backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/50">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={fundingData} layout="vertical">
              <CartesianGrid horizontal={false} strokeDasharray="3 3" strokeOpacity={0.5} />
              <XAxis type="number" hide />
              <YAxis dataKey="name" type="category" hide />
              <Tooltip content={<GlassTooltip />} cursor={{fill: 'transparent'}} />
              <Legend iconType="circle" />
              <Bar dataKey="Subsidy" stackId="a" fill="#10b981" radius={[4, 0, 0, 4]} barSize={60} />
              <Bar dataKey="DownPayment" stackId="a" fill="#3b82f6" barSize={60} />
              <Bar dataKey="Mortgage" stackId="a" fill="#8b5cf6" radius={[0, 4, 4, 0]} barSize={60} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

// --- 3. PAYMENT COMPARISON (Bar Chart) ---
const paymentData = [
  { name: "Market Rate", value: 3200, color: "#ef4444" }, // Red
  { name: "Social Program", value: 800, color: "#10b981" }, // Green
]

export function PaymentComparisonChart() {
  return (
    <Card className="border-none shadow-none bg-transparent">
      <CardHeader className="pl-0 pt-0"><CardTitle>Monthly Burden (EGP)</CardTitle></CardHeader>
      <CardContent className="pl-0">
        <div className="h-[300px] w-full rounded-2xl border border-slate-200 bg-white/50 p-4 shadow-sm backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/50">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={paymentData}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" strokeOpacity={0.5} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12, fontWeight: 600}} />
              <Tooltip content={<GlassTooltip />} cursor={{fill: 'transparent'}} />
              <Bar dataKey="value" radius={[8, 8, 0, 0]} barSize={60}>
                {paymentData.map((entry, index) => (
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

// --- 4. RISK ANALYSIS (Scatter) ---
const riskData = Array.from({ length: 50 }, () => ({
  x: Math.floor(Math.random() * 5000) + 15000, // Subsidy
  y: Math.floor(Math.random() * 20000) + 110000, // Mortgage
  z: Math.floor(Math.random() * 10000) + 40000, // DownPayment (Size)
}))

export function RiskAnalysisChart() {
  return (
    <Card className="border-none shadow-none bg-transparent">
      <CardHeader className="pl-0 pt-0"><CardTitle>Risk Cube (Subsidy vs Mortgage)</CardTitle></CardHeader>
      <CardContent className="pl-0">
        <div className="h-[300px] w-full rounded-2xl border border-slate-200 bg-white/50 p-4 shadow-sm backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/50">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.5} />
              <XAxis type="number" dataKey="x" name="Subsidy" unit=" EGP" tickLine={false} axisLine={false} tick={{fill: '#64748b', fontSize: 10}} />
              <YAxis type="number" dataKey="y" name="Mortgage" unit=" EGP" tickLine={false} axisLine={false} tick={{fill: '#64748b', fontSize: 10}} />
              <ZAxis type="number" dataKey="z" range={[50, 400]} name="Down Payment" />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} content={({ active, payload }: { active?: boolean; payload?: Array<{ value?: number }> }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="rounded-xl border border-white/20 bg-white/80 backdrop-blur-xl p-3 shadow-xl text-xs">
                      <p className="font-bold text-slate-700">Unit Analysis</p>
                      <p>Subsidy: {payload[0]?.value} EGP</p>
                      <p>Mortgage: {payload[1]?.value} EGP</p>
                    </div>
                  )
                }
                return null
              }} />
              <Scatter name="Units" data={riskData} fill="#3b82f6" fillOpacity={0.6} />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
