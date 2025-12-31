import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import React from "react";

interface CyberButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
}

export function CyberButton({ className, variant = "primary", children, ...props }: CyberButtonProps) {
  const variants = {
    primary: "bg-primary/20 text-primary border-primary hover:bg-primary hover:text-background",
    secondary: "bg-secondary/20 text-secondary border-secondary hover:bg-secondary hover:text-background",
    outline: "bg-transparent text-foreground border-white/20 hover:border-white hover:bg-white/10",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "relative px-6 py-3 border font-display tracking-widest uppercase font-bold text-sm transition-all duration-300 group overflow-hidden",
        variants[variant],
        className
      )}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
      
      {/* Glitch Effect Element */}
      <span className="absolute inset-0 bg-white/20 skew-x-12 -translate-x-full group-hover:animate-[shimmer_1s_infinite] pointer-events-none" />
      
      {/* Corner decorations */}
      <span className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-current opacity-50" />
      <span className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-current opacity-50" />
    </motion.button>
  );
}
