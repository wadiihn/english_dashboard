"use client"

import Image from "next/image"

export function CinematicBackground({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-slate-950">
      
      {/* 1. The Background Image Layer */}
      <div className="fixed inset-0 z-0">
        <div className="relative w-full h-full animate-ken-burns">
          <Image
            src="https://images.unsplash.com/photo-1634655377962-e6e7b446e7e9?q=80&w=2000&auto=format&fit=crop" 
            alt="Gold and Black Fluid Background"
            fill
            className="object-cover opacity-60"
            priority
          />
        </div>
        
        {/* 2. The Gradient Overlay (To ensure text readability) */}
        <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/80 to-slate-900/60" />
        
        {/* 3. A subtle mesh pattern on top (Optional texture) */}
        <div className="absolute inset-0 opacity-[0.15]" 
             style={{ backgroundImage: 'radial-gradient(#fbbf24 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
        </div>
      </div>

      {/* 4. The Content Layer */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}
