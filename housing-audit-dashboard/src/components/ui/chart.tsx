"use client"

import * as React from "react"
import * as RechartsPrimitive from "recharts"
import { cn } from "@/lib/utils"

const COLORS = [
  "#3b82f6",
  "#ef4444",
  "#10b981",
  "#f59e0b",
  "#8b5cf6",
  "#ec4899",
  "#14b8a6",
  "#f97316",
]

type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode
    icon?: React.ComponentType
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<string, string> }
  )
}

const ChartContext = React.createContext<{
  config: ChartConfig
} | null>(null)

function useChart() {
  const context = React.useContext(ChartContext)

  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />")
  }

  return context
}

const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    config: ChartConfig
    children: React.ComponentProps<
      typeof RechartsPrimitive.ResponsiveContainer
    >["children"]
  }
>(({ id, className, children, config, ...props }, ref) => {
  const uniqueId = React.useId()
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        ref={ref}
        className={cn(
          "flex aspect-video justify-center text-xs",
          "[&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-axis_line]:stroke-border/50 [&_.recharts-surface]:overflow-visible [&_.recharts-wrapper]:outline-none",
          className
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer>
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  )
})
ChartContainer.displayName = "ChartContainer"

const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const cssVariables: Record<string, string> = {}

  Object.entries(config).forEach(([key, itemConfig]) => {
    const color =
      itemConfig.theme?.light ||
      itemConfig.color

    if (color) {
      cssVariables[`--color-${key}`] = color
    }
  })

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `
        #${id} {
          ${Object.entries(cssVariables)
            .map(
              ([key, value]) => `${key}: ${value};`
            )
            .join("\n")}
        }
      `,
      }}
    />
  )
}

const ChartTooltip = RechartsPrimitive.Tooltip

const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    active?: boolean
    payload?: Array<{ dataKey: string; value: number | string; color?: string }>
    label?: string | number
    indicator?: "dot" | "line"
  }
>(({ active, payload, label, className, indicator = "dot", ...props }, ref) => {
  const { config } = useChart()

  if (!active || !payload || payload.length === 0) {
    return null
  }

  return (
    <div
      ref={ref}
      className={cn(
        "grid min-w-32 items-start gap-1.5 rounded-lg border border-border/50 bg-background/95 px-2.5 py-1.5 text-sm shadow-xl",
        className
      )}
      {...props}
    >
      {label && (
        <div className="text-xs text-muted-foreground">{label}</div>
      )}
      <div className="grid gap-1.5">
        {payload?.map(({ color, value, dataKey }, index: number) => {
          const key = `${dataKey}`
          const itemConfig = config[key]
          const displayValue =
            typeof value === "number"
              ? value.toLocaleString()
              : value

          return (
            <div
              key={`${dataKey}-${index}`}
              className="flex w-full items-center justify-between gap-8"
            >
              <div className="flex items-center gap-1.5">
                {indicator === "dot" && (
                  <div
                    className="h-2 w-2 shrink-0 rounded-full bg-(--color-bg)"
                    style={{
                      "--color-bg": color || `var(--color-${key})`,
                    } as React.CSSProperties}
                  />
                )}
                <span className="text-muted-foreground">
                  {itemConfig?.label || key}
                </span>
              </div>
              <span className="font-mono font-medium text-foreground">
                {displayValue}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
})
ChartTooltipContent.displayName = "ChartTooltipContent"

export {
  ChartContainer,
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
  ChartContext,
  useChart,
  COLORS,
  type ChartConfig,
}
