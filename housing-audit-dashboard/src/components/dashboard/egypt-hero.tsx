'use client'

import Image from 'next/image'
import { Card } from "@/components/ui/card"
import { Spotlight } from "@/components/ui/spotlight"
 
export function EgyptHousingHero() {
  return (
    <Card className="w-full h-[400px] bg-slate-950 relative overflow-hidden border-slate-800" suppressHydrationWarning>
      {/* Golden Spotlight for Egypt Theme */}
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="#D4AF37"
      />
      
      <div className="flex h-full flex-col md:flex-row" suppressHydrationWarning>
        {/* Left content: Text */}
        <div className="flex-1 p-8 relative z-10 flex flex-col justify-center" suppressHydrationWarning>
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-linear-to-b from-neutral-50 to-neutral-400">
            Building For All <br/> Egyptians
          </h1>
          <p className="mt-4 text-neutral-300 max-w-lg text-sm leading-relaxed">
            From the Delta to Upper Egypt, experience the scale of the Social Housing Program through this interactive 3D Digital Twin.
          </p>
        </div>

        {/* Right content: Pyramid Image */}
        <div className="flex-1 relative min-h-[300px] flex items-center justify-center" suppressHydrationWarning>
          <div className="relative w-full h-full max-w-[500px] max-h-[300px]" suppressHydrationWarning>
            {/* Glowing effect behind the pyramid */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] bg-yellow-500/20 blur-[100px] rounded-full" suppressHydrationWarning />
            
            <Image 
              src="https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?q=80&w=2070&auto=format&fit=crop" 
              alt="Pyramids of Giza"
              width={500}
              height={300}
              className="object-cover rounded-xl shadow-2xl border border-white/10 relative z-10 w-full h-full"
              style={{
                maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)' 
              }}
            />
          </div>
        </div>
      </div>
    </Card>
  )
}
