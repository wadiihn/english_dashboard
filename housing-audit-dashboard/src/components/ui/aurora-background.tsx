"use client";

import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

export const AuroraBackground = ({ children, className }: { children: ReactNode; className?: string }) => {
  return (
    // 1. Changed base to White
    <div className="relative w-full min-h-screen bg-white text-slate-900 transition-bg">
      
      {/* 2. The Moving Gradient Layer */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={cn(
            "absolute -inset-2.5 opacity-100 aurora-bg pointer-events-none will-change-transform",
            className
          )}
        ></div>
      </div>

      {/* 3. Content Layer */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};
