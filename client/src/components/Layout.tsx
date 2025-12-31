import { Navigation } from "./Navigation";
import { ParticleBackground } from "./ParticleBackground";
import { motion } from "framer-motion";
import React from "react";

export function Layout({ children }: { children: React.ReactNode }) {
  // Custom cursor
  const cursorRef = React.useRef<HTMLDivElement>(null);
  const cursorDotRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current && cursorDotRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX - 16}px, ${e.clientY - 16}px, 0)`;
        cursorDotRef.current.style.transform = `translate3d(${e.clientX - 2}px, ${e.clientY - 2}px, 0)`;
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/30">
      <ParticleBackground />
      <Navigation />
      
      {/* Custom Cursor Elements */}
      <div 
        ref={cursorRef} 
        className="fixed top-0 left-0 w-8 h-8 border border-primary rounded-full pointer-events-none z-[100] transition-transform duration-100 mix-blend-difference hidden md:block" 
      />
      <div 
        ref={cursorDotRef} 
        className="fixed top-0 left-0 w-1 h-1 bg-primary rounded-full pointer-events-none z-[100] hidden md:block" 
      />

      <motion.main 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="pl-20 md:pl-24 min-h-screen relative z-10"
      >
        <div className="container mx-auto px-6 py-12 max-w-7xl">
          {children}
        </div>
      </motion.main>

      {/* Decorative Overlays */}
      <div className="fixed inset-0 pointer-events-none z-50 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay"></div>
      <div className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50 z-50"></div>
    </div>
  );
}
