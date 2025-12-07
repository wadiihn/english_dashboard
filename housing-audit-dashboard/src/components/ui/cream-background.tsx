"use client"

export function CreamBackground({ children }: { children: React.ReactNode }) {
  return (
    // Base Color: Warm Cream (#FDFBF7)
    <div className="relative min-h-screen w-full bg-[#FDFBF7] text-slate-900" suppressHydrationWarning>
      
      {/* 1. The Pattern Layer */}
      <div className="absolute inset-0 z-0 opacity-[0.4]"
           style={{ 
             backgroundImage: 'radial-gradient(#A8A29E 1px, transparent 1px)', 
             backgroundSize: '24px 24px' 
           }}
           suppressHydrationWarning>
      </div>

      {/* 2. A Subtle Vignette (Darkens edges slightly to focus center) */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.03)_100%)] pointer-events-none" suppressHydrationWarning />

      {/* 3. The Content Layer */}
      <div className="relative z-10" suppressHydrationWarning>
        {children}
      </div>
    </div>
  )
}
