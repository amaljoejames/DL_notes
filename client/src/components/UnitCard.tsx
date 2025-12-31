import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Link } from "wouter";
import { UnitWithTopics } from "@shared/schema";
import React, { useRef } from "react";
import { Layers, Database, Cpu, Network, Brain } from "lucide-react";

const ICONS = {
  1: Brain,
  2: Network,
  3: Cpu,
  4: Layers,
  5: Database,
} as const;

export function UnitCard({ unit, index }: { unit: UnitWithTopics; index: number }) {
  const ref = useRef<HTMLDivElement>(null);

  // 3D Tilt Effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-7deg", "7deg"]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXPos = e.clientX - rect.left;
    const mouseYPos = e.clientY - rect.top;
    const xPct = mouseXPos / width - 0.5;
    const yPct = mouseYPos / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const Icon = ICONS[unit.unitNumber as keyof typeof ICONS] || Brain;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      style={{
        perspective: 1000,
      }}
      className="h-full"
    >
      <Link href={`/units/${unit.id}`} className="block h-full cursor-none">
        <motion.div
          ref={ref}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          className="relative h-full w-full bg-black/40 border border-white/10 p-8 rounded-xl backdrop-blur-md group hover:border-primary/50 transition-colors duration-300"
        >
          {/* Neon Glow Background */}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div style={{ transform: "translateZ(50px)" }} className="relative z-10">
            <div className="flex items-start justify-between mb-6">
              <div className="p-3 rounded-lg bg-primary/10 border border-primary/20 text-primary group-hover:text-white group-hover:bg-primary group-hover:shadow-[0_0_20px_rgba(0,255,255,0.5)] transition-all duration-300">
                <Icon size={32} />
              </div>
              <span className="font-mono text-xs text-white/40 border border-white/10 px-2 py-1 rounded">
                UNIT_0{unit.unitNumber}
              </span>
            </div>

            <h3 className="text-2xl mb-3 text-white group-hover:text-primary transition-colors">
              {unit.title}
            </h3>
            
            <p className="text-muted-foreground line-clamp-3 mb-6 font-light">
              {unit.description}
            </p>

            <div className="flex items-center text-sm font-mono text-primary/70 group-hover:text-primary transition-colors">
              <span className="mr-2">&gt;</span>
              <span>ACCESS MODULE</span>
              <motion.div 
                className="ml-auto w-12 h-[1px] bg-primary/50" 
                whileHover={{ width: 64, backgroundColor: "hsl(var(--primary))" }}
              />
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}
