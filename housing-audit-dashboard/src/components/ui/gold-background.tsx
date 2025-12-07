"use client"

import { cn } from "@/lib/utils"

export function GoldBackground({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-slate-950" suppressHydrationWarning>
      {/* --- THE FLOWING LIQUID LAYER --- */}
      <div className="absolute inset-0 w-full h-full" suppressHydrationWarning>
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden filter blur-[80px] opacity-60" suppressHydrationWarning>
          
          {/* Blob 1: Deep Gold */}
          <div className="absolute top-[-10%] left-[-10%] w-[70vw] h-[70vw] bg-yellow-700/30 rounded-full mix-blend-multiply animate-first opacity-100" suppressHydrationWarning></div>
          
          {/* Blob 2: Bright Gold Highlight */}
          <div className="absolute top-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-yellow-500/20 rounded-full mix-blend-multiply animate-second opacity-100" suppressHydrationWarning></div>
          
          {/* Blob 3: Shadow/Black Current */}
          <div className="absolute -bottom-[20%] left-[20%] w-[60vw] h-[60vw] bg-black/80 rounded-full mix-blend-multiply animate-third opacity-100" suppressHydrationWarning></div>
          
          {/* Blob 4: Soft Cream/Gold Mist */}
          <div className="absolute bottom-[-10%] right-[10%] w-[50vw] h-[50vw] bg-amber-200/10 rounded-full mix-blend-multiply animate-fourth opacity-70" suppressHydrationWarning></div>
        
        </div>
        
        {/* Grain Texture Overlay (Optional - adds realism) */}
        <div className="absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none" suppressHydrationWarning
             style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}>
        </div>
      </div>

      {/* --- CONTENT LAYER --- */}
      <div className="relative z-10" suppressHydrationWarning>
        {children}
      </div>
    </div>
  )
}
